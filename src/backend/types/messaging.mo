// Domain-specific types for the secure messaging system
import Storage "mo:caffeineai-object-storage/Storage";

module {
  /// File attachment metadata — file content stored via object-storage extension
  public type FileAttachment = {
    fileName : Text;
    fileType : Text;
    fileSize : Nat;
    storageId : Text;
    blob : Storage.ExternalBlob;
  };

  /// A secure message with one-time access and expiration controls
  public type SecureMessage = {
    id : Text;
    senderId : Principal;
    recipientId : Principal;
    /// AES-encrypted content (encrypted on frontend before sending)
    encryptedContent : Text;
    /// Encrypted content key for RSA key exchange
    contentKey : Text;
    /// Unique secure access token for one-time link generation
    accessToken : Text;
    /// Expiration time as nanosecond timestamp
    expiresAt : Int;
    /// Time when message was first viewed (null if not yet viewed)
    viewedAt : ?Int;
    /// Whether the message has been accessed (one-time flag)
    isViewed : Bool;
    /// Whether the message has passed its expiration time
    isExpired : Bool;
    /// Optional file attachment
    fileAttachment : ?FileAttachment;
    /// Creation timestamp
    createdAt : Int;
    /// Whether recipient has been notified
    notified : Bool;
  };

  /// Lightweight summary of a message (for inbox/sent list views)
  public type MessageSummary = {
    id : Text;
    senderId : Principal;
    recipientId : Principal;
    accessToken : Text;
    expiresAt : Int;
    viewedAt : ?Int;
    isViewed : Bool;
    isExpired : Bool;
    hasAttachment : Bool;
    createdAt : Int;
  };

  /// Full message view returned on one-time access
  public type MessageView = {
    id : Text;
    senderId : Principal;
    encryptedContent : Text;
    contentKey : Text;
    fileAttachment : ?FileAttachment;
    accessedAt : Int;
  };

  /// Access log entry tracking every access attempt
  public type AccessLog = {
    id : Text;
    messageId : Text;
    accessorId : Principal;
    timestamp : Int;
    deviceFingerprint : Text;
    /// "view" | "attempt" | "blocked"
    action : Text;
  };

  /// Behavior profile for anomaly detection and access control
  public type BehaviorProfile = {
    userId : Principal;
    accessAttempts : Nat;
    flaggedAttempts : Nat;
    lastAccessTime : Int;
    deviceFingerprints : [Text];
    isFlagged : Bool;
    flagReason : ?Text;
  };

  /// In-app notification for message recipients
  public type Notification = {
    id : Text;
    recipientId : Principal;
    messageId : Text;
    message : Text;
    isRead : Bool;
    createdAt : Int;
  };
};
