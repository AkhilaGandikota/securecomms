// Public API mixin for the secure messaging domain.
// Exposes all message, notification, access-log, and behavior-profile endpoints.
// Auth guards are applied to every public function via AccessControl.
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/messaging";
import CommonTypes "../types/common";
import MessagingLib "../lib/messaging";

mixin (
  accessControlState : AccessControl.AccessControlState,
  /// Map from accessToken -> SecureMessage (primary index for O(log n) token lookup)
  messagesByToken : Map.Map<Text, Types.SecureMessage>,
  /// Map from messageId -> SecureMessage (secondary index)
  messagesById : Map.Map<Text, Types.SecureMessage>,
  /// All access logs (append-only audit trail)
  accessLogs : List.List<Types.AccessLog>,
  /// Map from userId -> BehaviorProfile
  behaviorProfiles : Map.Map<Principal, Types.BehaviorProfile>,
  /// All notifications
  notifications : List.List<Types.Notification>,
  /// Monotonic counter for generating unique IDs — wrapped in a record for mutability
  idCounter : { var value : Nat },
) {
  // ─── Private helpers ──────────────────────────────────────────────────────────

  /// Returns the next unique ID string and increments the counter.
  private func nextId() : Text {
    idCounter.value += 1;
    idCounter.value.toText()
  };

  /// Retrieves (or creates) the behavior profile for a given principal.
  private func getOrCreateProfile(userId : Principal) : Types.BehaviorProfile {
    switch (behaviorProfiles.get(userId)) {
      case (?p) p;
      case null MessagingLib.defaultBehaviorProfile(userId);
    }
  };

  /// Collects all access logs for a specific accessor as an array (for anomaly detection).
  private func logsForUser(userId : Principal) : [Types.AccessLog] {
    accessLogs.values().filter(func(log) { Principal.equal(log.accessorId, userId) }).toArray()
  };

  // ─── Message Sending ──────────────────────────────────────────────────────────

  /// Sends an encrypted message to a recipient.
  /// - Caller must be authenticated (not anonymous).
  /// - Returns the unique access token the sender can share via external apps.
  /// - A notification is created immediately for the recipient.
  public shared ({ caller }) func sendMessage(
    recipientId : Principal,
    encryptedContent : Text,
    contentKey : Text,
    expiresInSeconds : Int,
    fileAttachment : ?Types.FileAttachment,
  ) : async CommonTypes.Result<Text, Text> {
    // Only authenticated users may send messages
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return #err("Unauthorized: You must be logged in to send messages");
    };

    // Cannot send to anonymous principal
    if (recipientId.isAnonymous()) {
      return #err("Invalid recipient: Cannot send to anonymous principal");
    };

    let now = Time.now();
    let id = nextId();
    // Increment counter again for the token seed to get a fresh value
    let tokenCounter = idCounter.value + 1;
    idCounter.value := tokenCounter;

    // Generate a unique, hard-to-guess token combining counter + caller + time
    let accessToken = MessagingLib.generateSecureToken(tokenCounter, caller.toText(), now);

    // Convert seconds to nanoseconds for the expiration timestamp
    let expiresAt = now + (expiresInSeconds * 1_000_000_000);

    let msg = MessagingLib.createMessage(
      id,
      caller,
      recipientId,
      encryptedContent,
      contentKey,
      accessToken,
      expiresAt,
      fileAttachment,
      now,
    );

    // Store in both indexes
    messagesByToken.add(accessToken, msg);
    messagesById.add(id, msg);

    // Create recipient notification
    let notifId = nextId();
    let notif = MessagingLib.createNotification(
      notifId,
      recipientId,
      id,
      "You have received a new secure message.",
      now,
    );
    notifications.add(notif);

    // Update the stored message to mark it as notified
    let notifiedMsg = { msg with notified = true };
    messagesByToken.add(accessToken, notifiedMsg);
    messagesById.add(id, notifiedMsg);

    #ok(accessToken)
  };

  // ─── Message Access ────────────────────────────────────────────────────────────

  /// One-time access to a message using its secure token.
  /// Security invariants enforced:
  ///   1. Caller must be authenticated.
  ///   2. Caller must be the designated recipient.
  ///   3. Message must not have been viewed already (one-time rule).
  ///   4. Message must not be expired.
  ///   5. Caller must not be behavior-flagged.
  /// On success: message is marked viewed and excluded from all future access.
  public shared ({ caller }) func accessMessage(
    accessToken : Text,
    deviceFingerprint : Text,
  ) : async CommonTypes.Result<Types.MessageView, Text> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return #err("Unauthorized: You must be logged in to access messages");
    };

    let now = Time.now();

    // Look up message by token
    let msg = switch (messagesByToken.get(accessToken)) {
      case null return #err("Message not found: Invalid or expired token");
      case (?m) m;
    };

    // Verify the caller is the intended recipient
    if (not Principal.equal(caller, msg.recipientId)) {
      let logId = nextId();
      let log = MessagingLib.createAccessLog(logId, msg.id, caller, deviceFingerprint, "blocked", now);
      accessLogs.add(log);
      let profile = getOrCreateProfile(caller);
      let updatedProfile = MessagingLib.updateBehaviorProfile(profile, deviceFingerprint, true, logsForUser(caller), now);
      behaviorProfiles.add(caller, updatedProfile);
      return #err("Unauthorized: You are not the intended recipient");
    };

    // Check behavior profile — block flagged users before any further processing
    let profile = getOrCreateProfile(caller);
    if (profile.isFlagged) {
      let logId = nextId();
      let log = MessagingLib.createAccessLog(logId, msg.id, caller, deviceFingerprint, "blocked", now);
      accessLogs.add(log);
      let updatedProfile = MessagingLib.updateBehaviorProfile(profile, deviceFingerprint, true, logsForUser(caller), now);
      behaviorProfiles.add(caller, updatedProfile);
      return #err("Access blocked: Suspicious behavior detected on your account");
    };

    // Enforce one-time access rule
    if (msg.isViewed) {
      let logId = nextId();
      let log = MessagingLib.createAccessLog(logId, msg.id, caller, deviceFingerprint, "attempt", now);
      accessLogs.add(log);
      return #err("Already viewed: This message has already been accessed");
    };

    // Enforce expiration
    if (MessagingLib.isExpired(msg, now)) {
      let logId = nextId();
      let log = MessagingLib.createAccessLog(logId, msg.id, caller, deviceFingerprint, "attempt", now);
      accessLogs.add(log);
      return #err("Expired: This message has passed its expiration time");
    };

    // All checks passed — mark the message as viewed (one-time consumption)
    let viewedMsg = MessagingLib.markViewed(msg, now);
    messagesByToken.add(accessToken, viewedMsg);
    messagesById.add(msg.id, viewedMsg);

    // Record the successful view in the access log
    let logId = nextId();
    let log = MessagingLib.createAccessLog(logId, msg.id, caller, deviceFingerprint, "view", now);
    accessLogs.add(log);

    // Update behavior profile (non-blocked successful access)
    let updatedProfile = MessagingLib.updateBehaviorProfile(profile, deviceFingerprint, false, logsForUser(caller), now);
    behaviorProfiles.add(caller, updatedProfile);

    #ok(MessagingLib.toMessageView(viewedMsg, now))
  };

  // ─── Inbox / Sent ─────────────────────────────────────────────────────────────

  /// Returns all messages received by the caller (inbox).
  /// Returns summaries only — encrypted content is not included.
  public query ({ caller }) func getMyInbox() : async [Types.MessageSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in to view your inbox");
    };
    let filtered = messagesById.values().filter(func(msg) {
      Principal.equal(msg.recipientId, caller)
    });
    filtered.map<Types.SecureMessage, Types.MessageSummary>(
      func(msg) { MessagingLib.toSummary(msg) }
    ).toArray()
  };

  /// Returns all messages sent by the caller (sent folder).
  public query ({ caller }) func getMySentMessages() : async [Types.MessageSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in to view sent messages");
    };
    let filtered = messagesById.values().filter(func(msg) {
      Principal.equal(msg.senderId, caller)
    });
    filtered.map<Types.SecureMessage, Types.MessageSummary>(
      func(msg) { MessagingLib.toSummary(msg) }
    ).toArray()
  };

  // ─── Notifications ────────────────────────────────────────────────────────────

  /// Returns all notifications for the caller.
  public query ({ caller }) func getMyNotifications() : async [Types.Notification] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in to view notifications");
    };
    notifications.values().filter(func(n) { Principal.equal(n.recipientId, caller) }).toArray()
  };

  /// Marks a specific notification as read.
  /// Only the notification's recipient may mark it read.
  public shared ({ caller }) func markNotificationRead(
    notifId : Text
  ) : async CommonTypes.Result<Bool, Text> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return #err("Unauthorized: You must be logged in");
    };

    var found = false;
    notifications.mapInPlace(func(n) {
      if (n.id == notifId) {
        if (not Principal.equal(n.recipientId, caller)) {
          Runtime.trap("Unauthorized: This notification does not belong to you");
        };
        found := true;
        MessagingLib.markNotificationRead(n)
      } else n
    });

    if (found) #ok(true)
    else #err("Notification not found")
  };

  // ─── Access Logs ──────────────────────────────────────────────────────────────

  /// Returns access logs for a specific message.
  /// Only the message sender or an admin may call this.
  public query ({ caller }) func getAccessLogs(
    messageId : Text
  ) : async CommonTypes.Result<[Types.AccessLog], Text> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return #err("Unauthorized: You must be logged in");
    };

    // Look up the message to verify ownership
    let msg = switch (messagesById.get(messageId)) {
      case null return #err("Message not found");
      case (?m) m;
    };

    // Only sender or admin can read access logs
    let isOwner = Principal.equal(msg.senderId, caller);
    let isAdminUser = AccessControl.isAdmin(accessControlState, caller);
    if (not isOwner and not isAdminUser) {
      return #err("Unauthorized: Only the sender or an admin can view access logs");
    };

    let logs = accessLogs.values().filter(func(log) { log.messageId == messageId }).toArray();
    #ok(logs)
  };

  // ─── Behavior Profile ─────────────────────────────────────────────────────────

  /// Returns the caller's own behavior profile (or default if none exists yet).
  public query ({ caller }) func getMyBehaviorProfile() : async CommonTypes.Result<Types.BehaviorProfile, Text> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return #err("Unauthorized: You must be logged in");
    };
    #ok(getOrCreateProfile(caller))
  };

  // ─── Admin Endpoints ──────────────────────────────────────────────────────────

  /// Admin: returns summaries of all messages in the system.
  public query ({ caller }) func adminGetAllMessages() : async CommonTypes.Result<[Types.MessageSummary], Text> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: Admin access required");
    };
    let summaries = messagesById.values().map(
      func(msg) { MessagingLib.toSummary(msg) }
    ).toArray();
    #ok(summaries)
  };

  /// Admin: returns all access logs in the system.
  public query ({ caller }) func adminGetAllAccessLogs() : async CommonTypes.Result<[Types.AccessLog], Text> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: Admin access required");
    };
    #ok(accessLogs.toArray())
  };

  /// Admin: returns all behavior profiles that have been flagged for suspicious activity.
  public query ({ caller }) func adminGetFlaggedUsers() : async CommonTypes.Result<[Types.BehaviorProfile], Text> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: Admin access required");
    };
    let flagged = behaviorProfiles.values().filter(func(p) { p.isFlagged }).toArray();
    #ok(flagged)
  };

  /// Admin: promotes a principal to the admin role.
  /// Uses the built-in AccessControl.assignRole which itself enforces admin-only.
  public shared ({ caller }) func adminSetAdminPrincipal(
    newAdmin : Principal
  ) : async CommonTypes.Result<Bool, Text> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: Only admins can promote users");
    };
    AccessControl.assignRole(accessControlState, caller, newAdmin, #admin);
    #ok(true)
  };

  // ─── Maintenance ─────────────────────────────────────────────────────────────

  /// Deletes all messages that have been viewed or have passed their expiration time.
  /// Returns the count of deleted messages.
  /// Any authenticated user may trigger this — it only removes messages that are
  /// no longer accessible anyway, so it is safe to expose broadly.
  public shared ({ caller }) func deleteExpiredMessages() : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in");
    };

    let now = Time.now();

    // Collect tokens to delete first (cannot mutate while iterating Map)
    let toDelete = List.empty<Text>();
    for ((token, msg) in messagesByToken.entries()) {
      if (msg.isViewed or MessagingLib.isExpired(msg, now)) {
        toDelete.add(token);
      };
    };

    let deletedCount = toDelete.size();

    // Remove from both indexes
    toDelete.forEach(func(token) {
      switch (messagesByToken.get(token)) {
        case (?msg) {
          messagesById.remove(msg.id);
          messagesByToken.remove(token);
        };
        case null {};
      };
    });

    deletedCount
  };
};
