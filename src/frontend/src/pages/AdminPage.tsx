/**
 * AdminPage — Admin-only dashboard at /admin.
 * Three tabs: All Messages, Access Logs, Flagged Users.
 * Summary stats, sortable/paginated tables, export to JSON, run cleanup.
 */

import { AdminStats } from "@/components/AdminStats";
import { type ColumnDef, DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAdminAccessLogs,
  useAdminFlaggedUsers,
  useAdminMessages,
  useDeleteExpiredMessages,
  useSetAdminPrincipal,
} from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { AccessLog, BehaviorProfile, MessageSummary } from "@/types";
import { formatTimestamp, getMessageStatus, truncatePrincipal } from "@/types";
import {
  AlertTriangle,
  CheckCircle,
  Download,
  Flag,
  RefreshCw,
  ShieldX,
  Trash2,
  UserCog,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Access Denied ────────────────────────────────────────────────────────────

function AccessDenied() {
  return (
    <Layout title="Access Denied">
      <div
        data-ocid="admin.access_denied.panel"
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-sm bg-destructive/10 border border-destructive/30">
          <ShieldX className="w-8 h-8 text-destructive" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-display font-semibold text-foreground">
            Access Denied
          </h1>
          <p className="text-muted-foreground text-sm max-w-sm">
            You don't have administrator privileges to view this page. Contact
            your system administrator for access.
          </p>
        </div>
      </div>
    </Layout>
  );
}

// ─── Action badge for access logs ────────────────────────────────────────────

function ActionBadge({ action }: { action: string }) {
  const lower = action.toLowerCase();
  const config =
    lower === "view" || lower === "viewed"
      ? { label: action, cls: "bg-accent/10 text-accent border-accent/30" }
      : lower === "attempt" || lower === "attempted"
        ? {
            label: action,
            cls: "bg-warning/10 text-warning border-warning/30",
          }
        : lower === "blocked" || lower === "block"
          ? {
              label: action,
              cls: "bg-destructive/10 text-destructive border-destructive/30",
            }
          : {
              label: action,
              cls: "bg-muted/50 text-muted-foreground border-border",
            };
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-xs font-mono rounded-sm border tracking-wider",
        config.cls,
      )}
    >
      {config.label.toUpperCase()}
    </span>
  );
}

// ─── Set Admin Panel ──────────────────────────────────────────────────────────

function SetAdminPanel() {
  const [newPrincipal, setNewPrincipal] = useState("");
  const setAdminMutation = useSetAdminPrincipal();

  function handleSetAdmin() {
    if (!newPrincipal.trim()) {
      toast.error("Please enter a valid principal.");
      return;
    }
    setAdminMutation.mutate(newPrincipal.trim(), {
      onSuccess: () => {
        toast.success("Admin principal updated successfully.");
        setNewPrincipal("");
      },
      onError: (err) => {
        toast.error(`Failed: ${err.message}`);
      },
    });
  }

  return (
    <div
      data-ocid="admin.set_admin.panel"
      className="flex flex-col sm:flex-row gap-2 items-start sm:items-center p-3 rounded-sm border border-border bg-card/60"
    >
      <UserCog className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 sm:mt-0" />
      <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
        Set New Admin:
      </span>
      <Input
        data-ocid="admin.set_admin.input"
        className="h-8 text-xs font-mono bg-background border-border flex-1 min-w-0"
        placeholder="Principal ID (e.g. aaaaa-aa)"
        value={newPrincipal}
        onChange={(e) => setNewPrincipal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSetAdmin()}
      />
      <Button
        data-ocid="admin.set_admin.submit_button"
        size="sm"
        className="h-8 text-xs shrink-0"
        onClick={handleSetAdmin}
        disabled={setAdminMutation.isPending || !newPrincipal.trim()}
      >
        {setAdminMutation.isPending ? (
          <RefreshCw className="w-3 h-3 animate-spin mr-1" />
        ) : (
          <UserCog className="w-3 h-3 mr-1" />
        )}
        Apply
      </Button>
    </div>
  );
}

// ─── Export utility ───────────────────────────────────────────────────────────

function exportAsJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Message Table ────────────────────────────────────────────────────────────

function MessagesTab({
  messages,
  isLoading,
}: {
  messages: MessageSummary[];
  isLoading: boolean;
}) {
  const deleteMutation = useDeleteExpiredMessages();

  const columns: ColumnDef<Record<string, unknown>>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs text-muted-foreground">
          {truncatePrincipal(String(row.id ?? ""), 6)}
        </span>
      ),
    },
    {
      key: "senderId",
      label: "Sender",
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs">
          {truncatePrincipal(String(row.senderId ?? ""), 6)}
        </span>
      ),
    },
    {
      key: "recipientId",
      label: "Recipient",
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs">
          {truncatePrincipal(String(row.recipientId ?? ""), 6)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => {
        const msg = row as unknown as MessageSummary;
        const status = getMessageStatus(msg);
        return <StatusBadge status={status} />;
      },
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs text-muted-foreground">
          {formatTimestamp(BigInt(String(row.createdAt ?? "0")))}
        </span>
      ),
    },
    {
      key: "expiresAt",
      label: "Expires",
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs text-muted-foreground">
          {formatTimestamp(BigInt(String(row.expiresAt ?? "0")))}
        </span>
      ),
    },
    {
      key: "hasAttachment",
      label: "File",
      render: (row) =>
        row.hasAttachment ? (
          <span className="text-accent text-xs font-mono">YES</span>
        ) : (
          <span className="text-muted-foreground text-xs font-mono">—</span>
        ),
    },
  ];

  const tableData = messages.map((m) => ({
    id: m.id,
    senderId: m.senderId.toString(),
    recipientId: m.recipientId.toString(),
    createdAt: m.createdAt,
    expiresAt: m.expiresAt,
    hasAttachment: m.hasAttachment,
    isExpired: m.isExpired,
    isViewed: m.isViewed,
  })) as Record<string, unknown>[];

  function handleCleanup() {
    deleteMutation.mutate(undefined, {
      onSuccess: (count) => {
        toast.success(`Deleted ${count} expired message(s).`, {
          icon: <CheckCircle className="w-4 h-4 text-accent" />,
        });
      },
      onError: (err) => {
        toast.error(`Cleanup failed: ${err.message}`);
      },
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <p className="text-xs text-muted-foreground font-mono">
          {messages.length} total messages
        </p>
        <div className="flex gap-2">
          <Button
            data-ocid="admin.messages.delete_button"
            variant="outline"
            size="sm"
            className="h-8 text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={handleCleanup}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <RefreshCw className="w-3 h-3 animate-spin mr-1.5" />
            ) : (
              <Trash2 className="w-3 h-3 mr-1.5" />
            )}
            Delete Expired
          </Button>
          <Button
            data-ocid="admin.messages.export_button"
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => exportAsJSON(messages, "messages-export.json")}
          >
            <Download className="w-3 h-3 mr-1.5" />
            Export JSON
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div data-ocid="admin.messages.loading_state" className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 bg-muted/30 rounded-sm animate-pulse"
            />
          ))}
        </div>
      ) : (
        <DataTable
          data-ocid="admin.messages.table"
          columns={columns}
          data={tableData}
          pageSize={10}
          searchable
          searchPlaceholder="Search by sender or recipient..."
          searchKeys={
            ["senderId", "recipientId", "id"] as (keyof Record<
              string,
              unknown
            >)[]
          }
          emptyMessage="No messages found."
        />
      )}
    </div>
  );
}

// ─── Access Logs Tab ──────────────────────────────────────────────────────────

function AccessLogsTab({
  logs,
  isLoading,
}: {
  logs: AccessLog[];
  isLoading: boolean;
}) {
  const [actionFilter, setActionFilter] = useState<string>("all");

  const filteredLogs =
    actionFilter === "all"
      ? logs
      : logs.filter((l) => l.action.toLowerCase() === actionFilter);

  const columns: ColumnDef<Record<string, unknown>>[] = [
    {
      key: "messageId",
      label: "Message ID",
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs text-muted-foreground">
          {truncatePrincipal(String(row.messageId ?? ""), 6)}
        </span>
      ),
    },
    {
      key: "accessorId",
      label: "Accessor",
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs">
          {truncatePrincipal(String(row.accessorId ?? ""), 8)}
        </span>
      ),
    },
    {
      key: "timestamp",
      label: "Timestamp",
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs text-muted-foreground">
          {formatTimestamp(BigInt(String(row.timestamp ?? "0")))}
        </span>
      ),
    },
    {
      key: "deviceFingerprint",
      label: "Device",
      render: (row) => (
        <span className="font-mono text-xs text-muted-foreground">
          {truncatePrincipal(String(row.deviceFingerprint ?? ""), 8)}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      sortable: true,
      render: (row) => <ActionBadge action={String(row.action ?? "")} />,
    },
  ];

  const tableData = filteredLogs.map((l) => ({
    id: l.id,
    messageId: l.messageId,
    accessorId: l.accessorId.toString(),
    timestamp: l.timestamp,
    deviceFingerprint: l.deviceFingerprint,
    action: l.action,
  })) as Record<string, unknown>[];

  const actionCounts = {
    all: logs.length,
    view: logs.filter((l) => l.action.toLowerCase().includes("view")).length,
    attempt: logs.filter((l) => l.action.toLowerCase().includes("attempt"))
      .length,
    blocked: logs.filter((l) => l.action.toLowerCase().includes("block"))
      .length,
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        {/* Action filter */}
        <div
          data-ocid="admin.logs.filter.tab"
          className="flex gap-1 p-1 bg-muted/30 rounded-sm border border-border"
        >
          {(["all", "view", "attempt", "blocked"] as const).map((f) => (
            <button
              key={f}
              type="button"
              data-ocid={`admin.logs.filter.${f}`}
              onClick={() => setActionFilter(f)}
              className={cn(
                "px-2.5 py-1 text-xs font-mono rounded-sm transition-colors duration-150",
                actionFilter === f
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}{" "}
              <span className="opacity-60">({actionCounts[f]})</span>
            </button>
          ))}
        </div>
        <Button
          data-ocid="admin.logs.export_button"
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={() => exportAsJSON(filteredLogs, "access-logs-export.json")}
        >
          <Download className="w-3 h-3 mr-1.5" />
          Export JSON
        </Button>
      </div>
      {isLoading ? (
        <div data-ocid="admin.logs.loading_state" className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 bg-muted/30 rounded-sm animate-pulse"
            />
          ))}
        </div>
      ) : (
        <DataTable
          data-ocid="admin.logs.table"
          columns={columns}
          data={tableData}
          pageSize={10}
          searchable
          searchPlaceholder="Search by accessor or message ID..."
          searchKeys={
            ["accessorId", "messageId"] as (keyof Record<string, unknown>)[]
          }
          emptyMessage="No access logs found."
        />
      )}
    </div>
  );
}

// ─── Flagged Users Tab ────────────────────────────────────────────────────────

function FlaggedUserCard({
  profile,
  index,
}: {
  profile: BehaviorProfile;
  index: number;
}) {
  return (
    <div
      data-ocid={`admin.flagged.item.${index}`}
      className={cn(
        "rounded-sm border bg-card p-4 space-y-3 transition-colors duration-150",
        profile.isFlagged
          ? "border-destructive/40 bg-destructive/5"
          : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            {profile.isFlagged && (
              <Flag className="w-3.5 h-3.5 text-destructive shrink-0" />
            )}
            <span className="font-mono text-xs text-foreground break-all">
              {profile.userId.toString()}
            </span>
          </div>
          {profile.flagReason && (
            <p className="mt-1 text-xs text-destructive/80 font-mono">
              {profile.flagReason}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {profile.isFlagged ? (
            <Badge variant="destructive" className="text-xs font-mono">
              FLAGGED
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-xs font-mono text-muted-foreground"
            >
              CLEAN
            </Badge>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-muted/30 rounded-sm p-2 text-center">
          <p className="text-xs text-muted-foreground font-mono">Attempts</p>
          <p className="text-lg font-semibold font-display tabular-nums text-foreground">
            {Number(profile.accessAttempts)}
          </p>
        </div>
        <div className="bg-muted/30 rounded-sm p-2 text-center">
          <p className="text-xs text-muted-foreground font-mono">Flagged</p>
          <p
            className={cn(
              "text-lg font-semibold font-display tabular-nums",
              Number(profile.flaggedAttempts) > 0
                ? "text-destructive"
                : "text-foreground",
            )}
          >
            {Number(profile.flaggedAttempts)}
          </p>
        </div>
        <div className="bg-muted/30 rounded-sm p-2 text-center">
          <p className="text-xs text-muted-foreground font-mono">Devices</p>
          <p className="text-lg font-semibold font-display tabular-nums text-foreground">
            {profile.deviceFingerprints.length}
          </p>
        </div>
      </div>

      {/* Device fingerprints */}
      {profile.deviceFingerprints.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-mono">
            Device fingerprints:
          </p>
          <div className="flex flex-wrap gap-1">
            {profile.deviceFingerprints.slice(0, 3).map((fp) => (
              <span
                key={fp}
                className="inline-block px-1.5 py-0.5 text-xs font-mono bg-muted/50 text-muted-foreground rounded-sm border border-border"
              >
                {truncatePrincipal(fp, 6)}
              </span>
            ))}
            {profile.deviceFingerprints.length > 3 && (
              <span className="text-xs text-muted-foreground font-mono">
                +{profile.deviceFingerprints.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-mono">
          Last: {formatTimestamp(profile.lastAccessTime)}
        </span>
        <Button
          data-ocid={`admin.flagged.clear_button.${index}`}
          variant="outline"
          size="sm"
          className="h-7 text-xs border-border hover:border-accent/40 hover:text-accent"
          disabled
          title="Clear flag (coming soon)"
        >
          <AlertTriangle className="w-3 h-3 mr-1" />
          Clear Flag
        </Button>
      </div>
    </div>
  );
}

function FlaggedUsersTab({
  profiles,
  isLoading,
}: {
  profiles: BehaviorProfile[];
  isLoading: boolean;
}) {
  const sorted = [...profiles].sort((a, b) =>
    a.isFlagged === b.isFlagged ? 0 : a.isFlagged ? -1 : 1,
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-mono">
          {profiles.filter((p) => p.isFlagged).length} flagged /{" "}
          {profiles.length} total users tracked
        </p>
        <Button
          data-ocid="admin.flagged.export_button"
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={() => exportAsJSON(profiles, "flagged-users-export.json")}
        >
          <Download className="w-3 h-3 mr-1.5" />
          Export JSON
        </Button>
      </div>

      {isLoading ? (
        <div
          data-ocid="admin.flagged.loading_state"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-muted/30 rounded-sm animate-pulse"
            />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div
          data-ocid="admin.flagged.empty_state"
          className="flex flex-col items-center gap-3 py-12 text-center"
        >
          <CheckCircle className="w-10 h-10 text-accent opacity-60" />
          <p className="text-muted-foreground text-sm">
            No behavior profiles found.
          </p>
        </div>
      ) : (
        <div
          data-ocid="admin.flagged.list"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
        >
          {sorted.map((profile) => (
            <FlaggedUserCard
              key={profile.userId.toString()}
              profile={profile}
              index={sorted.indexOf(profile) + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { isAdmin, isRoleLoading } = useAuth();

  const messagesQuery = useAdminMessages();
  const logsQuery = useAdminAccessLogs();
  const flaggedQuery = useAdminFlaggedUsers();

  const messages = messagesQuery.data ?? [];
  const logs = logsQuery.data ?? [];
  const flaggedUsers = flaggedQuery.data ?? [];
  const isLoading =
    messagesQuery.isLoading || logsQuery.isLoading || flaggedQuery.isLoading;

  // Show access denied while loading role too (prevent flash)
  if (!isRoleLoading && !isAdmin) {
    return <AccessDenied />;
  }

  return (
    <Layout title="Admin Dashboard">
      <div data-ocid="admin.page" className="flex flex-col gap-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-primary/10 border border-primary/30">
              <ShieldX className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-xl font-display font-semibold text-foreground">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            System-wide oversight — messages, access audit trail, and behavior
            anomaly tracking.
          </p>
        </div>

        {/* Summary stats */}
        <AdminStats
          messages={messages}
          accessLogs={logs}
          flaggedUsers={flaggedUsers}
          isLoading={isLoading}
        />

        {/* Set admin */}
        <SetAdminPanel />

        {/* Tabs */}
        <Tabs defaultValue="messages" data-ocid="admin.tabs">
          <TabsList className="bg-muted/30 border border-border h-9">
            <TabsTrigger
              data-ocid="admin.tabs.messages"
              value="messages"
              className="text-xs font-mono"
            >
              All Messages
              {messages.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-primary/10 text-primary rounded-sm text-xs">
                  {messages.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.tabs.logs"
              value="logs"
              className="text-xs font-mono"
            >
              Access Logs
              {logs.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-warning/10 text-warning rounded-sm text-xs">
                  {logs.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.tabs.flagged"
              value="flagged"
              className="text-xs font-mono"
            >
              Flagged Users
              {flaggedUsers.filter((u) => u.isFlagged).length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-destructive/10 text-destructive rounded-sm text-xs">
                  {flaggedUsers.filter((u) => u.isFlagged).length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="mt-4">
            <MessagesTab
              messages={messages}
              isLoading={messagesQuery.isLoading}
            />
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <AccessLogsTab logs={logs} isLoading={logsQuery.isLoading} />
          </TabsContent>

          <TabsContent value="flagged" className="mt-4">
            <FlaggedUsersTab
              profiles={flaggedUsers}
              isLoading={flaggedQuery.isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
