// Common cross-cutting types shared across all domains
module {
  /// Unique identifier type used throughout the system
  public type Id = Text;

  /// Unix timestamp in nanoseconds (from Time.now())
  public type Timestamp = Int;

  /// Result type alias for convenience
  public type Result<T, E> = { #ok : T; #err : E };
};
