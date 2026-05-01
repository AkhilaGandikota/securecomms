/**
 * StatsBar — horizontal metrics bar showing message and notification counts.
 * Used at the top of the Dashboard page.
 */

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Activity, Bell, Send, ShieldCheck } from "lucide-react";

interface StatItem {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  highlight?: boolean;
  danger?: boolean;
}

interface StatsBarProps {
  totalSent: number;
  totalReceived: number;
  pendingNotifications: number;
  activeMessages: number;
  isLoading?: boolean;
  className?: string;
}

export function StatsBar({
  totalSent,
  totalReceived,
  pendingNotifications,
  activeMessages,
  isLoading,
  className,
}: StatsBarProps) {
  const stats: StatItem[] = [
    {
      label: "Messages Sent",
      value: totalSent,
      icon: <Send className="w-4 h-4" />,
    },
    {
      label: "Messages Received",
      value: totalReceived,
      icon: <Activity className="w-4 h-4" />,
    },
    {
      label: "Active Now",
      value: activeMessages,
      icon: <ShieldCheck className="w-4 h-4" />,
      highlight: activeMessages > 0,
    },
    {
      label: "Unread Alerts",
      value: pendingNotifications,
      icon: <Bell className="w-4 h-4" />,
      danger: pendingNotifications > 0,
    },
  ];

  return (
    <div
      data-ocid="dashboard.stats_bar"
      className={cn("grid grid-cols-2 md:grid-cols-4 gap-3", className)}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col gap-2 px-4 py-3 rounded-sm border transition-smooth",
            stat.danger
              ? "border-destructive/30 bg-destructive/5"
              : stat.highlight
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-card",
          )}
        >
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-xs font-mono uppercase tracking-wider",
                stat.danger
                  ? "text-destructive"
                  : stat.highlight
                    ? "text-primary"
                    : "text-muted-foreground",
              )}
            >
              {stat.label}
            </span>
            <span
              className={cn(
                stat.danger
                  ? "text-destructive"
                  : stat.highlight
                    ? "text-primary"
                    : "text-muted-foreground",
              )}
            >
              {stat.icon}
            </span>
          </div>
          {isLoading ? (
            <Skeleton className="h-7 w-12" />
          ) : (
            <span
              className={cn(
                "text-2xl font-display font-semibold",
                stat.danger
                  ? "text-destructive"
                  : stat.highlight
                    ? "text-primary"
                    : "text-foreground",
              )}
            >
              {stat.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
