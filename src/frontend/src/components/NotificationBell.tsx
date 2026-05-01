/**
 * NotificationBell — displays unread notification count badge.
 * Clicking opens a notification dropdown panel.
 */

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useMarkNotificationRead,
  useNotifications,
} from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/types";
import { Bell } from "lucide-react";
import { useState } from "react";

export function NotificationBell() {
  const { data: notifications = [], unreadCount } = useNotifications();
  const markRead = useMarkNotificationRead();
  const [open, setOpen] = useState(false);

  const handleMarkRead = (notifId: string) => {
    markRead.mutate(notifId);
  };

  const handleMarkAllRead = () => {
    const unread = notifications.filter((n) => !n.isRead);
    for (const n of unread) {
      markRead.mutate(n.id);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-ocid="notifications.open_modal_button"
          aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ""}`}
          className={cn(
            "relative flex items-center justify-center w-9 h-9 rounded-sm",
            "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            "transition-smooth focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-1",
          )}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span
              aria-hidden
              className={cn(
                "absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px]",
                "bg-destructive text-destructive-foreground text-[10px]",
                "font-mono font-bold rounded-full flex items-center justify-center px-1",
                "transition-smooth",
              )}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        data-ocid="notifications.popover"
        align="end"
        className="w-80 p-0 bg-popover border-border"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">
            Notifications
          </span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              disabled={markRead.isPending}
              className="text-xs text-primary h-auto py-1 px-2"
            >
              Mark all read
            </Button>
          )}
        </div>

        {/* Notification list */}
        <ScrollArea className="max-h-80">
          {notifications.length === 0 ? (
            <div
              data-ocid="notifications.empty_state"
              className="flex flex-col items-center justify-center py-10 px-4 text-center"
            >
              <Bell className="w-8 h-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {notifications.map((notif, idx) => (
                <li
                  key={notif.id}
                  data-ocid={`notifications.item.${idx + 1}`}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3 transition-smooth",
                    !notif.isRead
                      ? "bg-primary/5 hover:bg-primary/10"
                      : "hover:bg-muted/30",
                  )}
                >
                  {/* Unread dot */}
                  <div
                    className={cn(
                      "mt-1.5 w-2 h-2 rounded-full flex-shrink-0",
                      !notif.isRead ? "bg-primary" : "bg-transparent",
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug break-words">
                      {notif.message}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      {formatRelativeTime(notif.createdAt)}
                    </p>
                  </div>
                  {!notif.isRead && (
                    <button
                      type="button"
                      onClick={() => handleMarkRead(notif.id)}
                      aria-label="Mark as read"
                      className="text-xs text-primary hover:text-primary/70 transition-smooth flex-shrink-0"
                    >
                      ✓
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
