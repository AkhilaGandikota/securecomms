/**
 * EncryptionIndicator — animated status showing AES-256 encryption progress.
 * States: idle | encrypting | encrypted | error
 */

import { cn } from "@/lib/utils";
import { CheckCircle2, Lock, ShieldAlert, ShieldCheck } from "lucide-react";

export type EncryptionStatus = "idle" | "encrypting" | "encrypted" | "error";

interface EncryptionIndicatorProps {
  status: EncryptionStatus;
  className?: string;
}

const statusConfig = {
  idle: {
    icon: Lock,
    label: "AES-256 Encryption Ready",
    description: "Your message will be encrypted before transmission",
    color: "text-muted-foreground",
    bg: "bg-muted/40 border-border",
    dot: "bg-muted-foreground",
  },
  encrypting: {
    icon: ShieldCheck,
    label: "Encrypting…",
    description: "Generating AES-256-GCM key and encrypting content",
    color: "text-primary",
    bg: "bg-primary/5 border-primary/30",
    dot: "bg-primary animate-pulse",
  },
  encrypted: {
    icon: CheckCircle2,
    label: "Encrypted ✓",
    description: "Message secured with AES-256-GCM + RSA key exchange",
    color: "text-accent",
    bg: "bg-accent/5 border-accent/30",
    dot: "bg-accent",
  },
  error: {
    icon: ShieldAlert,
    label: "Encryption Failed",
    description: "Could not encrypt message — please try again",
    color: "text-destructive",
    bg: "bg-destructive/5 border-destructive/30",
    dot: "bg-destructive",
  },
} as const;

export function EncryptionIndicator({
  status,
  className,
}: EncryptionIndicatorProps) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;

  return (
    <div
      data-ocid="encryption.loading_state"
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-sm border transition-smooth",
        cfg.bg,
        className,
      )}
    >
      {/* Animated dot */}
      <span className={cn("w-2 h-2 rounded-full shrink-0", cfg.dot)} />

      {/* Icon */}
      <Icon className={cn("w-4 h-4 shrink-0", cfg.color)} />

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-semibold font-mono", cfg.color)}>
          {cfg.label}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {cfg.description}
        </p>
      </div>

      {/* Spinner for encrypting state */}
      {status === "encrypting" && (
        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin shrink-0" />
      )}
    </div>
  );
}
