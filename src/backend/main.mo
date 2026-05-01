// Composition root for the Intelligent Secure Communication System.
// Wires together all stable state and includes all mixins.
// NO public methods are implemented here — all logic is in mixins.
import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Types "types/messaging";
import MessagingApiMixin "mixins/messaging-api";

actor {
  // ─── Authorization state (Internet Identity / RBAC) ──────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ─── Object-storage infrastructure (file uploads) ────────────────────────────
  include MixinObjectStorage();

  // ─── Messaging state ──────────────────────────────────────────────────────────

  /// Primary index: accessToken -> SecureMessage (fast token lookup)
  let messagesByToken = Map.empty<Text, Types.SecureMessage>();

  /// Secondary index: messageId -> SecureMessage
  let messagesById = Map.empty<Text, Types.SecureMessage>();

  /// Append-only access log for audit trail and behavior analysis
  let accessLogs = List.empty<Types.AccessLog>();

  /// Behavior profiles keyed by user Principal
  let behaviorProfiles = Map.empty<Principal, Types.BehaviorProfile>();

  /// Notification inbox for all users
  let notifications = List.empty<Types.Notification>();

  /// Monotonic counter for generating unique IDs and tokens
  let idCounter = { var value : Nat = 0 };

  // ─── Include messaging mixin ──────────────────────────────────────────────────
  include MessagingApiMixin(
    accessControlState,
    messagesByToken,
    messagesById,
    accessLogs,
    behaviorProfiles,
    notifications,
    idCounter,
  );
};
