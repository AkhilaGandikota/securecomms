/**
 * StatusBadge — displays message status with appropriate color coding.
 * Uses the left-border state system and badge-security utility from index.css.
 */

import { cn } from "@/lib/utils";
import type { MessageStatus } from "@/types";

interface StatusBadgeProps {
  status: MessageStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  MessageStatus,
  { label: string; className: string }
> = {
  active: {
    label: "ACTIVE",
    className: "bg-primary/10 text-primary border border-primary/30",
  },
  viewed: {
    label: "VIEWED",
    className:
      "bg-secondary/10 text-secondary-foreground border border-secondary/30",
  },
  expired: {
    label: "EXPIRED",
    className: "bg-muted/50 text-muted-foreground border border-border",
  },
  flagged: {
    label: "FLAGGED",
    className:
      "bg-destructive/10 text-destructive border border-destructive/30",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-xs font-mono rounded-sm tracking-wider",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

/** Role badge for user/admin display */
interface RoleBadgeProps {
  role: "admin" | "user" | "guest";
  className?: string;
}

const ROLE_CONFIG: Record<
  RoleBadgeProps["role"],
  { label: string; className: string }
> = {
  admin: {
    label: "ADMIN",
    className: "bg-accent/10 text-accent border border-accent/30",
  },
  user: {
    label: "USER",
    className: "bg-primary/10 text-primary border border-primary/30",
  },
  guest: {
    label: "GUEST",
    className: "bg-muted/50 text-muted-foreground border border-border",
  },
};

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const config = ROLE_CONFIG[role];

  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-xs font-mono rounded-sm tracking-wider",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
