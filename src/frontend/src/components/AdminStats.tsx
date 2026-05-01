/**
 * AdminStats — summary stat cards shown at the top of the Admin Dashboard.
 * Displays total messages, active messages, total access attempts, flagged users.
 */

import type { AccessLog, BehaviorProfile, MessageSummary } from "@/types";
import { Activity, AlertTriangle, FileText, ShieldAlert } from "lucide-react";

interface AdminStatsProps {
  messages: MessageSummary[];
  accessLogs: AccessLog[];
  flaggedUsers: BehaviorProfile[];
  isLoading: boolean;
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent: "primary" | "accent" | "destructive" | "warning";
  isLoading: boolean;
}

const ACCENT_MAP = {
  primary: "border-primary/30 bg-primary/5 text-primary",
  accent: "border-accent/30 bg-accent/5 text-accent",
  destructive: "border-destructive/30 bg-destructive/5 text-destructive",
  warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
};

function StatCard({ label, value, icon, accent, isLoading }: StatCardProps) {
  return (
    <div
      className={`rounded-sm border bg-card p-4 flex items-center gap-4 ${ACCENT_MAP[accent].split(" ").slice(0, 2).join(" ")}`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-sm border ${ACCENT_MAP[accent]}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider truncate">
          {label}
        </p>
        {isLoading ? (
          <div className="h-6 w-16 bg-muted animate-pulse rounded-sm mt-1" />
        ) : (
          <p className="text-2xl font-display font-semibold text-foreground tabular-nums">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

export function AdminStats({
  messages,
  accessLogs,
  flaggedUsers,
  isLoading,
}: AdminStatsProps) {
  const activeMessages = messages.filter(
    (m) => !m.isExpired && !m.isViewed,
  ).length;
  const totalAttempts = accessLogs.length;
  const flaggedCount = flaggedUsers.filter((u) => u.isFlagged).length;

  return (
    <div
      data-ocid="admin.stats.section"
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
    >
      <StatCard
        label="Total Messages"
        value={messages.length}
        icon={<FileText className="w-4 h-4" />}
        accent="primary"
        isLoading={isLoading}
      />
      <StatCard
        label="Active Messages"
        value={activeMessages}
        icon={<Activity className="w-4 h-4" />}
        accent="accent"
        isLoading={isLoading}
      />
      <StatCard
        label="Access Attempts"
        value={totalAttempts}
        icon={<ShieldAlert className="w-4 h-4" />}
        accent="warning"
        isLoading={isLoading}
      />
      <StatCard
        label="Flagged Users"
        value={flaggedCount}
        icon={<AlertTriangle className="w-4 h-4" />}
        accent="destructive"
        isLoading={isLoading}
      />
    </div>
  );
}
