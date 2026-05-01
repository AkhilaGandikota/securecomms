/**
 * Shared frontend types — mirrors backend types from backend.ts.
 * Import backend types directly from '@/backend' when you need the raw
 * backend-generated interfaces. These are convenience aliases and UI-only types.
 */

import type {
  AccessLog,
  BehaviorProfile,
  FileAttachment,
  MessageSummary,
  MessageView,
  Notification,
  Result,
  Result_1,
  Result_2,
  Result_3,
  Result_4,
  Result_5,
  Result_6,
  UserRole,
} from "@/backend";

// Re-export backend types for convenience
export type {
  AccessLog,
  BehaviorProfile,
  FileAttachment,
  MessageSummary,
  MessageView,
  Notification,
  Result,
  Result_1,
  Result_2,
  Result_3,
  Result_4,
  Result_5,
  Result_6,
  UserRole,
};

/** Message status derived from MessageSummary fields */
export type MessageStatus = "active" | "viewed" | "expired" | "flagged";

/** Derives the display status from a message summary */
export function getMessageStatus(msg: MessageSummary): MessageStatus {
  if (msg.isExpired) return "expired";
  if (msg.isViewed) return "viewed";
  return "active";
}

/** Sidebar navigation item definition */
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  adminOnly?: boolean;
}

/** Generic async operation state */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Device fingerprint data collected client-side */
export interface DeviceFingerprint {
  userAgent: string;
  language: string;
  timezone: string;
  screenRes: string;
  hash: string;
}

/** Generates a deterministic device fingerprint from browser properties */
export function generateDeviceFingerprint(): string {
  const components = [
    navigator.userAgent,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    `${window.screen.width}x${window.screen.height}`,
    navigator.hardwareConcurrency?.toString() ?? "unknown",
  ];
  // Simple hash function
  let hash = 0;
  const str = components.join("|");
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `fp_${Math.abs(hash).toString(16).padStart(8, "0")}`;
}

/** Formats a nanosecond bigint timestamp to human-readable string */
export function formatTimestamp(nanos: bigint): string {
  const ms = Number(nanos / 1_000_000n);
  return new Date(ms).toLocaleString();
}

/** Formats a nanosecond bigint timestamp to relative time (e.g. "2h ago") */
export function formatRelativeTime(nanos: bigint): string {
  const ms = Number(nanos / 1_000_000n);
  const now = Date.now();
  const diff = now - ms;

  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

/** Truncates a principal string for display */
export function truncatePrincipal(principal: string, chars = 8): string {
  if (principal.length <= chars * 2 + 3) return principal;
  return `${principal.slice(0, chars)}...${principal.slice(-chars)}`;
}
