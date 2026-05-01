/**
 * MessageCard — displays a single message summary with status border coding,
 * sender/recipient info, timestamps, and contextual actions.
 */

import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MessageStatus, MessageSummary } from "@/types";
import {
  formatRelativeTime,
  formatTimestamp,
  getMessageStatus,
  truncatePrincipal,
} from "@/types";
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  Lock,
  Paperclip,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/** Border color mapping per status */
const BORDER_CLASSES: Record<MessageStatus, string> = {
  active: "border-l-primary",
  viewed: "border-l-muted-foreground",
  expired: "border-l-muted-foreground/40",
  flagged: "border-l-destructive",
};

/** Subtle bg tint per status */
const BG_TINT: Record<MessageStatus, string> = {
  active: "bg-primary/5",
  viewed: "bg-muted/20",
  expired: "bg-muted/10 opacity-70",
  flagged: "bg-destructive/5",
};

interface MessageCardBaseProps {
  message: MessageSummary;
  index: number;
  className?: string;
}

interface InboxCardProps extends MessageCardBaseProps {
  variant: "inbox";
}

interface SentCardProps extends MessageCardBaseProps {
  variant: "sent";
}

type MessageCardProps = InboxCardProps | SentCardProps;

export function MessageCard(props: MessageCardProps) {
  const { message, index, className, variant } = props;
  const [copied, setCopied] = useState(false);

  const status = getMessageStatus(message);
  const borderClass = BORDER_CLASSES[status];
  const bgTint = BG_TINT[status];

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/message/${message.accessToken}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Secure link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const principalDisplay =
    variant === "inbox"
      ? truncatePrincipal(message.senderId.toString())
      : truncatePrincipal(message.recipientId.toString());

  const principalLabel = variant === "inbox" ? "From" : "To";

  return (
    <article
      data-ocid={`message.item.${index}`}
      className={cn(
        "relative flex flex-col gap-3 px-4 py-3 rounded-sm border border-border border-l-4",
        "transition-smooth hover:border-border/80 hover:shadow-sm",
        borderClass,
        bgTint,
        className,
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="flex flex-col gap-1 min-w-0">
          {/* Principal label */}
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground">
              {principalLabel}:
            </span>
            <span className="text-xs font-mono text-foreground/80 truncate">
              {principalDisplay}
            </span>
            {message.hasAttachment && (
              <Paperclip className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            )}
          </div>
          {/* Message ID */}
          <p className="text-sm text-foreground font-medium truncate">
            {variant === "inbox" ? "Encrypted Message" : "Secure Message Sent"}
            {" — "}
            <span className="font-mono text-xs text-muted-foreground">
              {message.id.slice(0, 16)}…
            </span>
          </p>
        </div>

        {/* Status badge */}
        <StatusBadge status={status} className="flex-shrink-0 mt-0.5" />
      </div>

      {/* Timestamp row */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <span
          className="flex items-center gap-1"
          title={formatTimestamp(message.createdAt)}
        >
          <Clock className="w-3 h-3" />
          {formatRelativeTime(message.createdAt)}
        </span>
        <span className="flex items-center gap-1">
          <span className="opacity-50">·</span>
          <span>
            Expires{" "}
            <span className={cn(status === "expired" && "text-destructive")}>
              {formatRelativeTime(message.expiresAt)}
            </span>
          </span>
        </span>
        {message.viewedAt !== undefined && (
          <span className="flex items-center gap-1 ml-auto">
            <Check className="w-3 h-3 text-primary" />
            <span>Viewed {formatRelativeTime(message.viewedAt)}</span>
          </span>
        )}
      </div>

      {/* Action row */}
      <div className="flex items-center gap-2">
        {variant === "inbox" && status === "active" && (
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs px-3 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-smooth"
            asChild
            data-ocid={`message.open_button.${index}`}
          >
            <a
              href={`/message/${message.accessToken}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-3 h-3 mr-1.5" />
              Open
            </a>
          </Button>
        )}

        {variant === "sent" && (
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "h-7 text-xs px-3 transition-smooth",
              copied
                ? "border-primary/40 text-primary bg-primary/10"
                : "border-border text-muted-foreground hover:text-foreground hover:border-border/80",
            )}
            onClick={handleCopyLink}
            data-ocid={`message.copy_link_button.${index}`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1.5" />
                Copy Link
              </>
            )}
          </Button>
        )}

        {status === "flagged" && (
          <span className="ml-auto text-xs text-destructive font-mono flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
            ANOMALY DETECTED
          </span>
        )}
      </div>
    </article>
  );
}
