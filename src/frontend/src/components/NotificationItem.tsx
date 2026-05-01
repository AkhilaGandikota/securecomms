/**
 * NotificationItem — renders a single notification entry with
 * read/unread state, mark-as-read action, and message link.
 */

import { Button } from "@/components/ui/button";
import { useMarkNotificationRead } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";
import { formatRelativeTime } from "@/types";
import { Bell, BellOff, ExternalLink, ShieldAlert } from "lucide-react";

interface NotificationItemProps {
  notification: Notification;
  index: number;
}

export function NotificationItem({
  notification,
  index,
}: NotificationItemProps) {
  const markRead = useMarkNotificationRead();

  const handleMarkRead = () => {
    if (!notification.isRead) {
      markRead.mutate(notification.id);
    }
  };

  const isSecurityAlert =
    notification.message.toLowerCase().includes("flag") ||
    notification.message.toLowerCase().includes("suspicious") ||
    notification.message.toLowerCase().includes("anomaly") ||
    notification.message.toLowerCase().includes("blocked");

  return (
    <article
      data-ocid={`notification.item.${index}`}
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-sm border transition-smooth",
        notification.isRead
          ? "border-border bg-card/30 opacity-70"
          : "border-primary/20 bg-primary/5",
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-sm mt-0.5",
          isSecurityAlert
            ? "bg-destructive/10 text-destructive"
            : notification.isRead
              ? "bg-muted/50 text-muted-foreground"
              : "bg-primary/10 text-primary",
        )}
      >
        {isSecurityAlert ? (
          <ShieldAlert className="w-4 h-4" />
        ) : notification.isRead ? (
          <BellOff className="w-4 h-4" />
        ) : (
          <Bell className="w-4 h-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <p
          className={cn(
            "text-sm leading-snug",
            notification.isRead ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {notification.message}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatRelativeTime(notification.createdAt)}</span>
          {notification.messageId && (
            <>
              <span className="opacity-40">·</span>
              <span className="font-mono">
                {notification.messageId.slice(0, 12)}…
              </span>
            </>
          )}
          {!notification.isRead && (
            <span className="ml-auto flex items-center gap-1 text-primary">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              NEW
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {notification.messageId && (
          <Button
            size="icon"
            variant="ghost"
            className="w-7 h-7 text-muted-foreground hover:text-foreground"
            asChild
            data-ocid={`notification.view_message_button.${index}`}
          >
            <a
              href={`/message/${notification.messageId}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View related message"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        )}
        {!notification.isRead && (
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs px-2 text-muted-foreground hover:text-primary transition-smooth"
            onClick={handleMarkRead}
            disabled={markRead.isPending}
            data-ocid={`notification.mark_read_button.${index}`}
          >
            Mark read
          </Button>
        )}
      </div>
    </article>
  );
}
