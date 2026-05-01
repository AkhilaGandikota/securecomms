/**
 * DashboardPage — main hub with Inbox, Sent, and Notifications tabs.
 * Shows stats bar, auto-refreshes every 30s, and provides quick actions.
 */

import { Layout } from "@/components/Layout";
import { MessageCard } from "@/components/MessageCard";
import { NotificationItem } from "@/components/NotificationItem";
import { StatsBar } from "@/components/StatsBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInbox, useSentMessages } from "@/hooks/useMessages";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { getMessageStatus } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, Inbox, Plus, RefreshCw, Send, ShieldOff } from "lucide-react";
import { useCallback, useState } from "react";

type Tab = "inbox" | "sent" | "notifications";

// ─── Empty state component ────────────────────────────────────────────────────

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  ocid: string;
}

function EmptyState({
  icon,
  title,
  description,
  action,
  ocid,
}: EmptyStateProps) {
  return (
    <div
      data-ocid={ocid}
      className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-sm bg-muted/50 border border-border text-muted-foreground">
        {icon}
      </div>
      <div className="space-y-1.5 max-w-xs">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

// ─── Skeleton list ─────────────────────────────────────────────────────────────

function MessageListSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col gap-2 px-4 py-3 rounded-sm border border-border border-l-4 border-l-muted"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-5 w-16 rounded-sm" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-7 w-20 rounded-sm" />
        </div>
      ))}
    </div>
  );
}

// ─── Tab button ────────────────────────────────────────────────────────────────

interface TabButtonProps {
  tab: Tab;
  active: boolean;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  onClick: (tab: Tab) => void;
}

function TabButton({
  tab,
  active,
  label,
  icon,
  badge,
  onClick,
}: TabButtonProps) {
  return (
    <button
      type="button"
      data-ocid={`dashboard.${tab}.tab`}
      onClick={() => onClick(tab)}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-smooth border-b-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
      )}
    >
      {icon}
      {label}
      {badge !== undefined && badge > 0 && (
        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-mono bg-primary text-primary-foreground">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("inbox");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const inbox = useInbox();
  const sent = useSentMessages();
  const notifications = useNotifications();

  // Derived stats
  const inboxData = inbox.data ?? [];
  const sentData = sent.data ?? [];
  const notifData = notifications.data ?? [];

  const activeMessages = inboxData.filter(
    (m) => getMessageStatus(m) === "active",
  ).length;
  const unreadNotifs = notifData.filter((n) => !n.isRead).length;

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["inbox"] }),
      queryClient.invalidateQueries({ queryKey: ["sentMessages"] }),
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    ]);
    setTimeout(() => setIsRefreshing(false), 600);
  }, [queryClient]);

  const topBarActions = (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        className="h-8 text-xs gap-1.5 border-border text-muted-foreground hover:text-foreground transition-smooth"
        onClick={handleRefresh}
        disabled={isRefreshing}
        data-ocid="dashboard.refresh_button"
      >
        <RefreshCw
          className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin")}
        />
        Refresh
      </Button>
      <Button
        size="sm"
        className="h-8 text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
        asChild
        data-ocid="dashboard.send_new_message_button"
      >
        <a href="/send">
          <Plus className="w-3.5 h-3.5" />
          Send Message
        </a>
      </Button>
    </div>
  );

  const isLoading =
    inbox.isLoading || sent.isLoading || notifications.isLoading;

  return (
    <Layout title="Dashboard" topBarActions={topBarActions}>
      <div className="flex flex-col gap-6 p-5">
        {/* Stats bar */}
        <StatsBar
          totalSent={sentData.length}
          totalReceived={inboxData.length}
          pendingNotifications={unreadNotifs}
          activeMessages={activeMessages}
          isLoading={isLoading}
        />

        {/* Tab navigation */}
        <div
          data-ocid="dashboard.tabs"
          className="flex flex-col bg-card rounded-sm border border-border overflow-hidden"
        >
          {/* Tab bar */}
          <div className="flex items-center gap-0 border-b border-border px-2 bg-card">
            <TabButton
              tab="inbox"
              active={activeTab === "inbox"}
              label="Inbox"
              icon={<Inbox className="w-3.5 h-3.5" />}
              badge={activeMessages}
              onClick={setActiveTab}
            />
            <TabButton
              tab="sent"
              active={activeTab === "sent"}
              label="Sent"
              icon={<Send className="w-3.5 h-3.5" />}
              onClick={setActiveTab}
            />
            <TabButton
              tab="notifications"
              active={activeTab === "notifications"}
              label="Notifications"
              icon={<Bell className="w-3.5 h-3.5" />}
              badge={unreadNotifs}
              onClick={setActiveTab}
            />
          </div>

          {/* Tab content */}
          <div className="p-4">
            {/* ── Inbox tab ─────────────────────────────────────────────── */}
            {activeTab === "inbox" && (
              <div data-ocid="dashboard.inbox.panel">
                {inbox.isLoading ? (
                  <MessageListSkeleton />
                ) : inboxData.length === 0 ? (
                  <EmptyState
                    ocid="dashboard.inbox.empty_state"
                    icon={<Inbox className="w-7 h-7" />}
                    title="No messages received"
                    description="When someone sends you a secure message, it will appear here. Messages are one-time access only."
                    action={
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        asChild
                        data-ocid="dashboard.inbox.send_first_button"
                      >
                        <a href="/send">Send a message instead</a>
                      </Button>
                    }
                  />
                ) : (
                  <div className="space-y-2" data-ocid="dashboard.inbox.list">
                    {inboxData.map((msg, i) => (
                      <MessageCard
                        key={msg.id}
                        variant="inbox"
                        message={msg}
                        index={i + 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Sent tab ──────────────────────────────────────────────── */}
            {activeTab === "sent" && (
              <div data-ocid="dashboard.sent.panel">
                {sent.isLoading ? (
                  <MessageListSkeleton />
                ) : sentData.length === 0 ? (
                  <EmptyState
                    ocid="dashboard.sent.empty_state"
                    icon={<Send className="w-7 h-7" />}
                    title="No messages sent yet"
                    description="Send a secure, self-destructing message to any recipient. Only they can open it, once."
                    action={
                      <Button
                        size="sm"
                        className="text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                        asChild
                        data-ocid="dashboard.sent.send_first_button"
                      >
                        <a href="/send">
                          <Plus className="w-3.5 h-3.5 mr-1.5" />
                          Send New Message
                        </a>
                      </Button>
                    }
                  />
                ) : (
                  <div className="space-y-2" data-ocid="dashboard.sent.list">
                    {sentData.map((msg, i) => (
                      <MessageCard
                        key={msg.id}
                        variant="sent"
                        message={msg}
                        index={i + 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Notifications tab ─────────────────────────────────────── */}
            {activeTab === "notifications" && (
              <div data-ocid="dashboard.notifications.panel">
                {notifications.isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 px-4 py-3 rounded-sm border border-border"
                      >
                        <Skeleton className="w-8 h-8 rounded-sm flex-shrink-0" />
                        <div className="flex-1 space-y-1.5">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : notifData.length === 0 ? (
                  <EmptyState
                    ocid="dashboard.notifications.empty_state"
                    icon={<ShieldOff className="w-7 h-7" />}
                    title="No notifications"
                    description="You'll be notified when someone sends you a secure message or when suspicious activity is detected on your account."
                  />
                ) : (
                  <div
                    className="space-y-2"
                    data-ocid="dashboard.notifications.list"
                  >
                    {notifData.map((notif, i) => (
                      <NotificationItem
                        key={notif.id}
                        notification={notif}
                        index={i + 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
