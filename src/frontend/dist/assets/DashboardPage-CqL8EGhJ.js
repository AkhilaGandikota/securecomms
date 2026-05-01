import { c as createLucideIcon, r as reactExports, h as getMessageStatus, t as truncatePrincipal, j as jsxRuntimeExports, a as Lock, S as StatusBadge, C as Clock, i as formatRelativeTime, k as formatTimestamp, b as cn, B as Button, l as ue, m as useMarkNotificationRead, n as ShieldAlert, o as Bell, p as Skeleton, q as Send, s as useQueryClient, v as useNotifications, L as Layout } from "./index-B_I069t4.js";
import { P as Paperclip, C as Check, a as Copy, S as ShieldCheck } from "./shield-check-DWvKZBQV.js";
import { E as ExternalLink } from "./external-link-CJaS__WA.js";
import { A as Activity } from "./activity-BznrzM79.js";
import { u as useInbox, a as useSentMessages } from "./index-CZgAH2l5.js";
import { R as RefreshCw } from "./refresh-cw-BAox-huA.js";
import { S as ShieldOff } from "./shield-off-DQlaVOV7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
const BORDER_CLASSES = {
  active: "border-l-primary",
  viewed: "border-l-muted-foreground",
  expired: "border-l-muted-foreground/40",
  flagged: "border-l-destructive"
};
const BG_TINT = {
  active: "bg-primary/5",
  viewed: "bg-muted/20",
  expired: "bg-muted/10 opacity-70",
  flagged: "bg-destructive/5"
};
function MessageCard(props) {
  const { message, index, className, variant } = props;
  const [copied, setCopied] = reactExports.useState(false);
  const status = getMessageStatus(message);
  const borderClass = BORDER_CLASSES[status];
  const bgTint = BG_TINT[status];
  const handleCopyLink = async () => {
    const url = `${window.location.origin}/message/${message.accessToken}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    ue.success("Secure link copied to clipboard");
    setTimeout(() => setCopied(false), 2e3);
  };
  const principalDisplay = variant === "inbox" ? truncatePrincipal(message.senderId.toString()) : truncatePrincipal(message.recipientId.toString());
  const principalLabel = variant === "inbox" ? "From" : "To";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      "data-ocid": `message.item.${index}`,
      className: cn(
        "relative flex flex-col gap-3 px-4 py-3 rounded-sm border border-border border-l-4",
        "transition-smooth hover:border-border/80 hover:shadow-sm",
        borderClass,
        bgTint,
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                principalLabel,
                ":"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground/80 truncate", children: principalDisplay }),
              message.hasAttachment && /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-medium truncate", children: [
              variant === "inbox" ? "Encrypted Message" : "Secure Message Sent",
              " — ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                message.id.slice(0, 16),
                "…"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status, className: "flex-shrink-0 mt-0.5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1",
              title: formatTimestamp(message.createdAt),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                formatRelativeTime(message.createdAt)
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-50", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Expires",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(status === "expired" && "text-destructive"), children: formatRelativeTime(message.expiresAt) })
            ] })
          ] }),
          message.viewedAt !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Viewed ",
              formatRelativeTime(message.viewedAt)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          variant === "inbox" && status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-7 text-xs px-3 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-smooth",
              asChild: true,
              "data-ocid": `message.open_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `/message/${message.accessToken}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 mr-1.5" }),
                    "Open"
                  ]
                }
              )
            }
          ),
          variant === "sent" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: cn(
                "h-7 text-xs px-3 transition-smooth",
                copied ? "border-primary/40 text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
              ),
              onClick: handleCopyLink,
              "data-ocid": `message.copy_link_button.${index}`,
              children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 mr-1.5" }),
                "Copied"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3 mr-1.5" }),
                "Copy Link"
              ] })
            }
          ),
          status === "flagged" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-destructive font-mono flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" }),
            "ANOMALY DETECTED"
          ] })
        ] })
      ]
    }
  );
}
function NotificationItem({
  notification,
  index
}) {
  const markRead = useMarkNotificationRead();
  const handleMarkRead = () => {
    if (!notification.isRead) {
      markRead.mutate(notification.id);
    }
  };
  const isSecurityAlert = notification.message.toLowerCase().includes("flag") || notification.message.toLowerCase().includes("suspicious") || notification.message.toLowerCase().includes("anomaly") || notification.message.toLowerCase().includes("blocked");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      "data-ocid": `notification.item.${index}`,
      className: cn(
        "flex items-start gap-3 px-4 py-3 rounded-sm border transition-smooth",
        notification.isRead ? "border-border bg-card/30 opacity-70" : "border-primary/20 bg-primary/5"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-sm mt-0.5",
              isSecurityAlert ? "bg-destructive/10 text-destructive" : notification.isRead ? "bg-muted/50 text-muted-foreground" : "bg-primary/10 text-primary"
            ),
            children: isSecurityAlert ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4" }) : notification.isRead ? /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-sm leading-snug",
                notification.isRead ? "text-muted-foreground" : "text-foreground"
              ),
              children: notification.message
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatRelativeTime(notification.createdAt) }),
            notification.messageId && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                notification.messageId.slice(0, 12),
                "…"
              ] })
            ] }),
            !notification.isRead && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-1 text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
              "NEW"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
          notification.messageId && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              className: "w-7 h-7 text-muted-foreground hover:text-foreground",
              asChild: true,
              "data-ocid": `notification.view_message_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `/message/${notification.messageId}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "View related message",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
                }
              )
            }
          ),
          !notification.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "h-7 text-xs px-2 text-muted-foreground hover:text-primary transition-smooth",
              onClick: handleMarkRead,
              disabled: markRead.isPending,
              "data-ocid": `notification.mark_read_button.${index}`,
              children: "Mark read"
            }
          )
        ] })
      ]
    }
  );
}
function StatsBar({
  totalSent,
  totalReceived,
  pendingNotifications,
  activeMessages,
  isLoading,
  className
}) {
  const stats = [
    {
      label: "Messages Sent",
      value: totalSent,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
    },
    {
      label: "Messages Received",
      value: totalReceived,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" })
    },
    {
      label: "Active Now",
      value: activeMessages,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
      highlight: activeMessages > 0
    },
    {
      label: "Unread Alerts",
      value: pendingNotifications,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
      danger: pendingNotifications > 0
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "dashboard.stats_bar",
      className: cn("grid grid-cols-2 md:grid-cols-4 gap-3", className),
      children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "flex flex-col gap-2 px-4 py-3 rounded-sm border transition-smooth",
            stat.danger ? "border-destructive/30 bg-destructive/5" : stat.highlight ? "border-primary/30 bg-primary/5" : "border-border bg-card"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "text-xs font-mono uppercase tracking-wider",
                    stat.danger ? "text-destructive" : stat.highlight ? "text-primary" : "text-muted-foreground"
                  ),
                  children: stat.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    stat.danger ? "text-destructive" : stat.highlight ? "text-primary" : "text-muted-foreground"
                  ),
                  children: stat.icon
                }
              )
            ] }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-12" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-2xl font-display font-semibold",
                  stat.danger ? "text-destructive" : stat.highlight ? "text-primary" : "text-foreground"
                ),
                children: stat.value
              }
            )
          ]
        },
        stat.label
      ))
    }
  );
}
function EmptyState({
  icon,
  title,
  description,
  action,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-sm bg-muted/50 border border-border text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: description })
        ] }),
        action
      ]
    }
  );
}
function MessageListSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-2 px-4 py-3 rounded-sm border border-border border-l-4 border-l-muted",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20 rounded-sm" })
      ]
    },
    i
  )) });
}
function TabButton({
  tab,
  active,
  label,
  icon,
  badge,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `dashboard.${tab}.tab`,
      onClick: () => onClick(tab),
      className: cn(
        "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-smooth border-b-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
      ),
      children: [
        icon,
        label,
        badge !== void 0 && badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-mono bg-primary text-primary-foreground", children: badge > 99 ? "99+" : badge })
      ]
    }
  );
}
function DashboardPage() {
  const [activeTab, setActiveTab] = reactExports.useState("inbox");
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const queryClient = useQueryClient();
  const inbox = useInbox();
  const sent = useSentMessages();
  const notifications = useNotifications();
  const inboxData = inbox.data ?? [];
  const sentData = sent.data ?? [];
  const notifData = notifications.data ?? [];
  const activeMessages = inboxData.filter(
    (m) => getMessageStatus(m) === "active"
  ).length;
  const unreadNotifs = notifData.filter((n) => !n.isRead).length;
  const handleRefresh = reactExports.useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["inbox"] }),
      queryClient.invalidateQueries({ queryKey: ["sentMessages"] }),
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    ]);
    setTimeout(() => setIsRefreshing(false), 600);
  }, [queryClient]);
  const topBarActions = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "outline",
        className: "h-8 text-xs gap-1.5 border-border text-muted-foreground hover:text-foreground transition-smooth",
        onClick: handleRefresh,
        disabled: isRefreshing,
        "data-ocid": "dashboard.refresh_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RefreshCw,
            {
              className: cn("w-3.5 h-3.5", isRefreshing && "animate-spin")
            }
          ),
          "Refresh"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        className: "h-8 text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth",
        asChild: true,
        "data-ocid": "dashboard.send_new_message_button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/send", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
          "Send Message"
        ] })
      }
    )
  ] });
  const isLoading = inbox.isLoading || sent.isLoading || notifications.isLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "Dashboard", topBarActions, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatsBar,
      {
        totalSent: sentData.length,
        totalReceived: inboxData.length,
        pendingNotifications: unreadNotifs,
        activeMessages,
        isLoading
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "dashboard.tabs",
        className: "flex flex-col bg-card rounded-sm border border-border overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0 border-b border-border px-2 bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabButton,
              {
                tab: "inbox",
                active: activeTab === "inbox",
                label: "Inbox",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-3.5 h-3.5" }),
                badge: activeMessages,
                onClick: setActiveTab
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabButton,
              {
                tab: "sent",
                active: activeTab === "sent",
                label: "Sent",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" }),
                onClick: setActiveTab
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabButton,
              {
                tab: "notifications",
                active: activeTab === "notifications",
                label: "Notifications",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3.5 h-3.5" }),
                badge: unreadNotifs,
                onClick: setActiveTab
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            activeTab === "inbox" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "dashboard.inbox.panel", children: inbox.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(MessageListSkeleton, {}) : inboxData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                ocid: "dashboard.inbox.empty_state",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-7 h-7" }),
                title: "No messages received",
                description: "When someone sends you a secure message, it will appear here. Messages are one-time access only.",
                action: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-xs",
                    asChild: true,
                    "data-ocid": "dashboard.inbox.send_first_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/send", children: "Send a message instead" })
                  }
                )
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "dashboard.inbox.list", children: inboxData.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              MessageCard,
              {
                variant: "inbox",
                message: msg,
                index: i + 1
              },
              msg.id
            )) }) }),
            activeTab === "sent" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "dashboard.sent.panel", children: sent.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(MessageListSkeleton, {}) : sentData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                ocid: "dashboard.sent.empty_state",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-7 h-7" }),
                title: "No messages sent yet",
                description: "Send a secure, self-destructing message to any recipient. Only they can open it, once.",
                action: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: "text-xs bg-primary text-primary-foreground hover:bg-primary/90",
                    asChild: true,
                    "data-ocid": "dashboard.sent.send_first_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/send", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "Send New Message"
                    ] })
                  }
                )
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "dashboard.sent.list", children: sentData.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              MessageCard,
              {
                variant: "sent",
                message: msg,
                index: i + 1
              },
              msg.id
            )) }) }),
            activeTab === "notifications" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "dashboard.notifications.panel", children: notifications.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 px-4 py-3 rounded-sm border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-sm flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" })
                  ] })
                ]
              },
              i
            )) }) : notifData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                ocid: "dashboard.notifications.empty_state",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-7 h-7" }),
                title: "No notifications",
                description: "You'll be notified when someone sends you a secure message or when suspicious activity is detected on your account."
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-2",
                "data-ocid": "dashboard.notifications.list",
                children: notifData.map((notif, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NotificationItem,
                  {
                    notification: notif,
                    index: i + 1
                  },
                  notif.id
                ))
              }
            ) })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  DashboardPage as default
};
