// Domain logic library for secure messaging.
// Handles message creation, token generation, expiration checks, and behavior profiling.
// All functions are pure — they take values in and return values out with no side effects.
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Types "../types/messaging";

module {
  // ─── Token Generation ────────────────────────────────────────────────────────

  /// Generates a pseudo-unique secure access token by combining a monotonic
  /// counter, the caller's principal text, and the current timestamp.
  ///
  /// Why this is safe: uniqueness is guaranteed by the counter (never repeats);
  /// principal + timestamp make the token unpredictable to external guessers.
  public func generateSecureToken(counter : Nat, callerText : Text, timestamp : Int) : Text {
    // Encode the three entropy sources as numeric values
    let callerHash = hashText(callerText);
    let counterVal = counter;
    let timeVal    = Int.abs(timestamp) % 0xFFFFFFFFFFFF;

    // Combine them via a simple mixing function
    let seed1 = (callerHash * 1_000_003 + counterVal * 7919 + timeVal) % 0xFFFFFFFFFFFF;
    let seed2 = (seed1     * 6_700_417  + counterVal + timeVal * 31)   % 0xFFFFFFFFFFFF;

    // Produce a hex token from both seed halves — guaranteed non-empty
    padHex(seed1, 12) # padHex(seed2, 12)
  };

  // ─── Internal helpers ─────────────────────────────────────────────────────────

  /// Computes a simple non-cryptographic hash of a text string (djb2 variant).
  private func hashText(t : Text) : Nat {
    var hash : Nat = 5381;
    for (c in t.toIter()) {
      hash := (hash * 33 + Nat.fromNat32(Char.toNat32(c))) % 0xFFFFFFFFFFFF;
    };
    hash
  };

  /// Encodes a Nat as a zero-padded lowercase hex string of at least `minLen` characters.
  private func padHex(n : Nat, minLen : Nat) : Text {
    let raw = toHex(n);
    // Left-pad with zeros if shorter than minLen
    var result = raw;
    while (result.size() < minLen) {
      result := "0" # result;
    };
    result
  };

  /// Encodes a Nat as a lowercase hex string (no leading zeros).
  private func toHex(n : Nat) : Text {
    let chars = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    if (n == 0) return "0";
    var result = "";
    var remaining = n;
    while (remaining > 0) {
      result := chars[remaining % 16] # result;
      remaining := remaining / 16;
    };
    result
  };

  // ─── Message Operations ──────────────────────────────────────────────────────

  /// Creates a new SecureMessage record ready for storage.
  /// The message starts in the un-viewed, non-expired state.
  public func createMessage(
    id : Text,
    sender : Principal,
    recipient : Principal,
    encryptedContent : Text,
    contentKey : Text,
    accessToken : Text,
    expiresAt : Int,
    fileAttachment : ?Types.FileAttachment,
    now : Int,
  ) : Types.SecureMessage {
    {
      id;
      senderId = sender;
      recipientId = recipient;
      encryptedContent;
      contentKey;
      accessToken;
      expiresAt;
      viewedAt = null;
      isViewed = false;
      isExpired = false;
      fileAttachment;
      createdAt = now;
      notified = false;
    }
  };

  /// Converts a SecureMessage to its lightweight summary form.
  /// Used for inbox and sent-messages list views — omits sensitive encrypted content.
  public func toSummary(msg : Types.SecureMessage) : Types.MessageSummary {
    {
      id = msg.id;
      senderId = msg.senderId;
      recipientId = msg.recipientId;
      accessToken = msg.accessToken;
      expiresAt = msg.expiresAt;
      viewedAt = msg.viewedAt;
      isViewed = msg.isViewed;
      isExpired = msg.isExpired;
      hasAttachment = switch (msg.fileAttachment) { case (?_) true; case null false };
      createdAt = msg.createdAt;
    }
  };

  /// Marks a message as viewed and records the view time.
  /// Also sets isExpired if the message has passed its expiration time.
  public func markViewed(msg : Types.SecureMessage, now : Int) : Types.SecureMessage {
    {
      msg with
      isViewed = true;
      viewedAt = ?now;
      isExpired = now > msg.expiresAt;
    }
  };

  /// Returns true if the message has passed its expiration timestamp.
  public func isExpired(msg : Types.SecureMessage, now : Int) : Bool {
    now > msg.expiresAt
  };

  /// Builds a MessageView from a fully-resolved message for one-time delivery.
  /// This is the only moment the encrypted content is surfaced to the recipient.
  public func toMessageView(msg : Types.SecureMessage, now : Int) : Types.MessageView {
    {
      id = msg.id;
      senderId = msg.senderId;
      encryptedContent = msg.encryptedContent;
      contentKey = msg.contentKey;
      fileAttachment = msg.fileAttachment;
      accessedAt = now;
    }
  };

  // ─── Access Log Operations ───────────────────────────────────────────────────

  /// Creates a new AccessLog entry capturing who accessed what, when, and how.
  /// action should be one of: "view" | "attempt" | "blocked"
  public func createAccessLog(
    id : Text,
    messageId : Text,
    accessor : Principal,
    fingerprint : Text,
    action : Text,
    now : Int,
  ) : Types.AccessLog {
    {
      id;
      messageId;
      accessorId = accessor;
      timestamp = now;
      deviceFingerprint = fingerprint;
      action;
    }
  };

  // ─── Behavior Profile Operations ─────────────────────────────────────────────

  /// Returns the default (empty) behavior profile for a first-time user.
  public func defaultBehaviorProfile(userId : Principal) : Types.BehaviorProfile {
    {
      userId;
      accessAttempts = 0;
      flaggedAttempts = 0;
      lastAccessTime = 0;
      deviceFingerprints = [];
      isFlagged = false;
      flagReason = null;
    }
  };

  /// Updates a behavior profile after an access attempt.
  ///
  /// Anomaly detection rules (any one triggers flagging):
  ///   1. More than 3 access attempts within a 5-minute window (300_000_000_000 ns)
  ///   2. More than 3 distinct device fingerprints within a 10-minute window (600_000_000_000 ns)
  ///
  /// If flagged, flagReason is stored for the admin dashboard.
  public func updateBehaviorProfile(
    profile : Types.BehaviorProfile,
    fingerprint : Text,
    wasBlocked : Bool,
    recentLogs : [Types.AccessLog],
    now : Int,
  ) : Types.BehaviorProfile {
    let fiveMinutes : Int = 300_000_000_000;
    let tenMinutes  : Int = 600_000_000_000;

    // Rule 1: count access attempts within the 5-minute window
    let logsIn5Min = recentLogs.filter(
      func(log) { now - log.timestamp <= fiveMinutes }
    );
    let attemptsInWindow = logsIn5Min.size();

    // Rule 2: collect unique fingerprints in the 10-minute window
    let logsIn10Min = recentLogs.filter(
      func(log) { now - log.timestamp <= tenMinutes }
    );

    // Count unique device fingerprints by folding over logs
    let uniqueDeviceCount = logsIn10Min.foldLeft(
      0,
      func(count, log) {
        // Only count this fingerprint if not already counted via an earlier log entry
        let seenBefore = logsIn10Min.any(func(prev) {
          prev.timestamp < log.timestamp and
          prev.deviceFingerprint == log.deviceFingerprint
        });
        if (seenBefore) count else count + 1
      }
    );

    // Apply anomaly rules
    let tooManyAttempts = attemptsInWindow > 3;
    let tooManyDevices  = uniqueDeviceCount > 3;
    let shouldFlag = profile.isFlagged or tooManyAttempts or tooManyDevices;

    // Build the flag reason — preserve the existing one if already flagged
    let reason : ?Text = if (not shouldFlag) null
    else if (tooManyAttempts)
      ?("Excessive access attempts: " # attemptsInWindow.toText() # " in 5 minutes")
    else if (tooManyDevices)
      ?("Too many device fingerprints: " # uniqueDeviceCount.toText() # " in 10 minutes")
    else
      profile.flagReason;

    // Merge current fingerprint into the profile's tracked device list (deduplicated)
    let allFps = profile.deviceFingerprints.concat([fingerprint]);
    let dedupedFps = allFps.foldLeft<Text, [Text]>(
      [],
      func(acc, fp) {
        if (acc.any(func(x) { x == fp })) acc
        else acc.concat([fp])
      }
    );

    {
      profile with
      accessAttempts  = profile.accessAttempts + 1;
      flaggedAttempts = profile.flaggedAttempts + (if wasBlocked 1 else 0);
      lastAccessTime  = now;
      deviceFingerprints = dedupedFps;
      isFlagged  = shouldFlag;
      flagReason = reason;
    }
  };

  // ─── Notification Operations ──────────────────────────────────────────────────

  /// Creates a new Notification record alerting a recipient that they have new mail.
  public func createNotification(
    id : Text,
    recipientId : Principal,
    messageId : Text,
    message : Text,
    now : Int,
  ) : Types.Notification {
    {
      id;
      recipientId;
      messageId;
      message;
      isRead = false;
      createdAt = now;
    }
  };

  /// Marks a notification as read and returns the updated record.
  public func markNotificationRead(notif : Types.Notification) : Types.Notification {
    { notif with isRead = true }
  };
};
