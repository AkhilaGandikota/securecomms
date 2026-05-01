import { c as createLucideIcon, j as jsxRuntimeExports, n as ShieldAlert, r as reactExports, b as cn, B as Button, D as Slot, F as cva, G as useId, P as Primitive, H as composeEventHandlers, e as createContextScope, f as useComposedRefs, I as useDirection, J as useControllableState, K as useCallbackRef, M as Presence, N as useActor, O as useQuery, Q as useMutation, T as Principal, s as useQueryClient, U as createActor, V as useAuth, L as Layout, l as ue, t as truncatePrincipal, h as getMessageStatus, S as StatusBadge, k as formatTimestamp } from "./index-B_I069t4.js";
import { F as FileText, T as TriangleAlert, D as Download } from "./triangle-alert-CnO543-u.js";
import { A as Activity } from "./activity-BznrzM79.js";
import { I as Input } from "./input-BexXeIUU.js";
import { S as Search } from "./search-D1vAg7cJ.js";
import { C as ChevronUp, a as ChevronDown, c as createCollection, T as Trash2 } from "./index-SgeowXp3.js";
import { R as RefreshCw } from "./refresh-cw-BAox-huA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
];
const Flag = createLucideIcon("flag", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m14.5 9.5-5 5", key: "17q4r4" }],
  ["path", { d: "m9.5 9.5 5 5", key: "18nt4w" }]
];
const ShieldX = createLucideIcon("shield-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10 15H6a4 4 0 0 0-4 4v2", key: "1nfge6" }],
  ["path", { d: "m14.305 16.53.923-.382", key: "1itpsq" }],
  ["path", { d: "m15.228 13.852-.923-.383", key: "eplpkm" }],
  ["path", { d: "m16.852 12.228-.383-.923", key: "13v3q0" }],
  ["path", { d: "m16.852 17.772-.383.924", key: "1i8mnm" }],
  ["path", { d: "m19.148 12.228.383-.923", key: "1q8j1v" }],
  ["path", { d: "m19.53 18.696-.382-.924", key: "vk1qj3" }],
  ["path", { d: "m20.772 13.852.924-.383", key: "n880s0" }],
  ["path", { d: "m20.772 16.148.924.383", key: "1g6xey" }],
  ["circle", { cx: "18", cy: "15", r: "3", key: "gjjjvw" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCog = createLucideIcon("user-cog", __iconNode);
const ACCENT_MAP = {
  primary: "border-primary/30 bg-primary/5 text-primary",
  accent: "border-accent/30 bg-accent/5 text-accent",
  destructive: "border-destructive/30 bg-destructive/5 text-destructive",
  warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400"
};
function StatCard({ label, value, icon, accent, isLoading }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-sm border bg-card p-4 flex items-center gap-4 ${ACCENT_MAP[accent].split(" ").slice(0, 2).join(" ")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex items-center justify-center w-10 h-10 rounded-sm border ${ACCENT_MAP[accent]}`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider truncate", children: label }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-16 bg-muted animate-pulse rounded-sm mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-semibold text-foreground tabular-nums", children: value })
        ] })
      ]
    }
  );
}
function AdminStats({
  messages,
  accessLogs,
  flaggedUsers,
  isLoading
}) {
  const activeMessages = messages.filter(
    (m) => !m.isExpired && !m.isViewed
  ).length;
  const totalAttempts = accessLogs.length;
  const flaggedCount = flaggedUsers.filter((u) => u.isFlagged).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "admin.stats.section",
      className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Messages",
            value: messages.length,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
            accent: "primary",
            isLoading
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Active Messages",
            value: activeMessages,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" }),
            accent: "accent",
            isLoading
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Access Attempts",
            value: totalAttempts,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4" }),
            accent: "warning",
            isLoading
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Flagged Users",
            value: flaggedCount,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
            accent: "destructive",
            isLoading
          }
        )
      ]
    }
  );
}
function SortIcon({ direction }) {
  if (direction === "asc") return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3 ml-1 inline" });
  if (direction === "desc")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 ml-1 inline" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "w-3 h-3 ml-1 inline opacity-40" });
}
function DataTable({
  columns,
  data,
  pageSize = 10,
  searchable = false,
  searchPlaceholder = "Search...",
  searchKeys = [],
  emptyMessage = "No data found.",
  "data-ocid": dataOcid
}) {
  const [sortKey, setSortKey] = reactExports.useState(null);
  const [sortDir, setSortDir] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const filtered = reactExports.useMemo(() => {
    if (!searchQuery.trim() || searchKeys.length === 0) return data;
    const q = searchQuery.toLowerCase();
    return data.filter(
      (row) => searchKeys.some((k) => {
        const val = row[k];
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, searchQuery, searchKeys]);
  const sorted = reactExports.useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      const cmp = av.localeCompare(bv, void 0, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = sorted.slice((page - 1) * pageSize, page * pageSize);
  function handleSort(key) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    } else {
      setSortDir("asc");
    }
    setPage(1);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": dataOcid, className: "flex flex-col gap-3", children: [
    searchable && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": dataOcid ? `${dataOcid}.search_input` : void 0,
          className: "pl-9 bg-card border-border font-mono text-sm h-9",
          placeholder: searchPlaceholder,
          value: searchQuery,
          onChange: (e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "th",
        {
          className: cn(
            "px-3 py-2.5 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider whitespace-nowrap select-none",
            col.sortable && "cursor-pointer hover:text-foreground transition-colors duration-150",
            col.className
          ),
          onClick: col.sortable ? () => handleSort(String(col.key)) : void 0,
          onKeyDown: col.sortable ? (e) => {
            if (e.key === "Enter" || e.key === " ")
              handleSort(String(col.key));
          } : void 0,
          tabIndex: col.sortable ? 0 : void 0,
          children: [
            col.label,
            col.sortable && /* @__PURE__ */ jsxRuntimeExports.jsx(
              SortIcon,
              {
                direction: sortKey === String(col.key) ? sortDir : null
              }
            )
          ]
        },
        String(col.key)
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pageData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: columns.length,
          className: "px-3 py-10 text-center text-muted-foreground text-sm",
          "data-ocid": dataOcid ? `${dataOcid}.empty_state` : void 0,
          children: emptyMessage
        }
      ) }) : pageData.map((row, idx) => {
        const rowKey = String(
          row.id ?? row.messageId ?? String((page - 1) * pageSize + idx)
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-muted/20 transition-colors duration-100",
            "data-ocid": dataOcid ? `${dataOcid}.item.${(page - 1) * pageSize + idx + 1}` : void 0,
            children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: cn(
                  "px-3 py-2.5 text-foreground/90 align-middle",
                  col.className
                ),
                children: col.render ? col.render(row) : String(row[String(col.key)] ?? "—")
              },
              String(col.key)
            ))
          },
          rowKey
        );
      }) })
    ] }) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground font-mono", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        (page - 1) * pageSize + 1,
        "–",
        Math.min(page * pageSize, sorted.length),
        " of ",
        sorted.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 px-2 text-xs",
            disabled: page <= 1,
            onClick: () => setPage((p) => p - 1),
            "data-ocid": dataOcid ? `${dataOcid}.pagination_prev` : void 0,
            children: "Prev"
          }
        ),
        Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pg = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: pg === page ? "default" : "outline",
              size: "sm",
              className: "h-7 w-7 p-0 text-xs",
              onClick: () => setPage(pg),
              children: pg
            },
            pg
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 px-2 text-xs",
            disabled: page >= totalPages,
            onClick: () => setPage((p) => p + 1),
            "data-ocid": dataOcid ? `${dataOcid}.pagination_next` : void 0,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function useAdminMessages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.adminGetAllMessages();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useAdminAccessLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "accessLogs"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.adminGetAllAccessLogs();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useAdminFlaggedUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "flaggedUsers"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.adminGetFlaggedUsers();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useDeleteExpiredMessages() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteExpiredMessages();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
    }
  });
}
function useSetAdminPrincipal() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (principalText) => {
      if (!actor) throw new Error("Actor not available");
      const principal = Principal.fromText(principalText);
      const result = await actor.adminSetAdminPrincipal(principal);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    }
  });
}
function AccessDenied() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "Access Denied", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "admin.access_denied.panel",
      className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-sm bg-destructive/10 border border-destructive/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldX, { className: "w-8 h-8 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-semibold text-foreground", children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm", children: "You don't have administrator privileges to view this page. Contact your system administrator for access." })
        ] })
      ]
    }
  ) });
}
function ActionBadge({ action }) {
  const lower = action.toLowerCase();
  const config = lower === "view" || lower === "viewed" ? { label: action, cls: "bg-accent/10 text-accent border-accent/30" } : lower === "attempt" || lower === "attempted" ? {
    label: action,
    cls: "bg-warning/10 text-warning border-warning/30"
  } : lower === "blocked" || lower === "block" ? {
    label: action,
    cls: "bg-destructive/10 text-destructive border-destructive/30"
  } : {
    label: action,
    cls: "bg-muted/50 text-muted-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-block px-2 py-0.5 text-xs font-mono rounded-sm border tracking-wider",
        config.cls
      ),
      children: config.label.toUpperCase()
    }
  );
}
function SetAdminPanel() {
  const [newPrincipal, setNewPrincipal] = reactExports.useState("");
  const setAdminMutation = useSetAdminPrincipal();
  function handleSetAdmin() {
    if (!newPrincipal.trim()) {
      ue.error("Please enter a valid principal.");
      return;
    }
    setAdminMutation.mutate(newPrincipal.trim(), {
      onSuccess: () => {
        ue.success("Admin principal updated successfully.");
        setNewPrincipal("");
      },
      onError: (err) => {
        ue.error(`Failed: ${err.message}`);
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "admin.set_admin.panel",
      className: "flex flex-col sm:flex-row gap-2 items-start sm:items-center p-3 rounded-sm border border-border bg-card/60",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5 sm:mt-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono whitespace-nowrap", children: "Set New Admin:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "admin.set_admin.input",
            className: "h-8 text-xs font-mono bg-background border-border flex-1 min-w-0",
            placeholder: "Principal ID (e.g. aaaaa-aa)",
            value: newPrincipal,
            onChange: (e) => setNewPrincipal(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleSetAdmin()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "admin.set_admin.submit_button",
            size: "sm",
            className: "h-8 text-xs shrink-0",
            onClick: handleSetAdmin,
            disabled: setAdminMutation.isPending || !newPrincipal.trim(),
            children: [
              setAdminMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "w-3 h-3 mr-1" }),
              "Apply"
            ]
          }
        )
      ]
    }
  );
}
function exportAsJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function MessagesTab({
  messages,
  isLoading
}) {
  const deleteMutation = useDeleteExpiredMessages();
  const columns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: truncatePrincipal(String(row.id ?? ""), 6) })
    },
    {
      key: "senderId",
      label: "Sender",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: truncatePrincipal(String(row.senderId ?? ""), 6) })
    },
    {
      key: "recipientId",
      label: "Recipient",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: truncatePrincipal(String(row.recipientId ?? ""), 6) })
    },
    {
      key: "status",
      label: "Status",
      render: (row) => {
        const msg = row;
        const status = getMessageStatus(msg);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status });
      }
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: formatTimestamp(BigInt(String(row.createdAt ?? "0"))) })
    },
    {
      key: "expiresAt",
      label: "Expires",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: formatTimestamp(BigInt(String(row.expiresAt ?? "0"))) })
    },
    {
      key: "hasAttachment",
      label: "File",
      render: (row) => row.hasAttachment ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-xs font-mono", children: "YES" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-mono", children: "—" })
    }
  ];
  const tableData = messages.map((m) => ({
    id: m.id,
    senderId: m.senderId.toString(),
    recipientId: m.recipientId.toString(),
    createdAt: m.createdAt,
    expiresAt: m.expiresAt,
    hasAttachment: m.hasAttachment,
    isExpired: m.isExpired,
    isViewed: m.isViewed
  }));
  function handleCleanup() {
    deleteMutation.mutate(void 0, {
      onSuccess: (count) => {
        ue.success(`Deleted ${count} expired message(s).`, {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-accent" })
        });
      },
      onError: (err) => {
        ue.error(`Cleanup failed: ${err.message}`);
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
        messages.length,
        " total messages"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "admin.messages.delete_button",
            variant: "outline",
            size: "sm",
            className: "h-8 text-xs border-destructive/30 text-destructive hover:bg-destructive/10",
            onClick: handleCleanup,
            disabled: deleteMutation.isPending,
            children: [
              deleteMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 animate-spin mr-1.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-1.5" }),
              "Delete Expired"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "admin.messages.export_button",
            variant: "outline",
            size: "sm",
            className: "h-8 text-xs",
            onClick: () => exportAsJSON(messages, "messages-export.json"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3 mr-1.5" }),
              "Export JSON"
            ]
          }
        )
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "admin.messages.loading_state", className: "space-y-2", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-10 bg-muted/30 rounded-sm animate-pulse"
      },
      i
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        "data-ocid": "admin.messages.table",
        columns,
        data: tableData,
        pageSize: 10,
        searchable: true,
        searchPlaceholder: "Search by sender or recipient...",
        searchKeys: ["senderId", "recipientId", "id"],
        emptyMessage: "No messages found."
      }
    )
  ] });
}
function AccessLogsTab({
  logs,
  isLoading
}) {
  const [actionFilter, setActionFilter] = reactExports.useState("all");
  const filteredLogs = actionFilter === "all" ? logs : logs.filter((l) => l.action.toLowerCase() === actionFilter);
  const columns = [
    {
      key: "messageId",
      label: "Message ID",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: truncatePrincipal(String(row.messageId ?? ""), 6) })
    },
    {
      key: "accessorId",
      label: "Accessor",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: truncatePrincipal(String(row.accessorId ?? ""), 8) })
    },
    {
      key: "timestamp",
      label: "Timestamp",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: formatTimestamp(BigInt(String(row.timestamp ?? "0"))) })
    },
    {
      key: "deviceFingerprint",
      label: "Device",
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: truncatePrincipal(String(row.deviceFingerprint ?? ""), 8) })
    },
    {
      key: "action",
      label: "Action",
      sortable: true,
      render: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBadge, { action: String(row.action ?? "") })
    }
  ];
  const tableData = filteredLogs.map((l) => ({
    id: l.id,
    messageId: l.messageId,
    accessorId: l.accessorId.toString(),
    timestamp: l.timestamp,
    deviceFingerprint: l.deviceFingerprint,
    action: l.action
  }));
  const actionCounts = {
    all: logs.length,
    view: logs.filter((l) => l.action.toLowerCase().includes("view")).length,
    attempt: logs.filter((l) => l.action.toLowerCase().includes("attempt")).length,
    blocked: logs.filter((l) => l.action.toLowerCase().includes("block")).length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "admin.logs.filter.tab",
          className: "flex gap-1 p-1 bg-muted/30 rounded-sm border border-border",
          children: ["all", "view", "attempt", "blocked"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `admin.logs.filter.${f}`,
              onClick: () => setActionFilter(f),
              className: cn(
                "px-2.5 py-1 text-xs font-mono rounded-sm transition-colors duration-150",
                actionFilter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              ),
              children: [
                f.charAt(0).toUpperCase() + f.slice(1),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60", children: [
                  "(",
                  actionCounts[f],
                  ")"
                ] })
              ]
            },
            f
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "admin.logs.export_button",
          variant: "outline",
          size: "sm",
          className: "h-8 text-xs",
          onClick: () => exportAsJSON(filteredLogs, "access-logs-export.json"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3 mr-1.5" }),
            "Export JSON"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "admin.logs.loading_state", className: "space-y-2", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-10 bg-muted/30 rounded-sm animate-pulse"
      },
      i
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        "data-ocid": "admin.logs.table",
        columns,
        data: tableData,
        pageSize: 10,
        searchable: true,
        searchPlaceholder: "Search by accessor or message ID...",
        searchKeys: ["accessorId", "messageId"],
        emptyMessage: "No access logs found."
      }
    )
  ] });
}
function FlaggedUserCard({
  profile,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `admin.flagged.item.${index}`,
      className: cn(
        "rounded-sm border bg-card p-4 space-y-3 transition-colors duration-150",
        profile.isFlagged ? "border-destructive/40 bg-destructive/5" : "border-border"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              profile.isFlagged && /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3.5 h-3.5 text-destructive shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground break-all", children: profile.userId.toString() })
            ] }),
            profile.flagReason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive/80 font-mono", children: profile.flagReason })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 shrink-0", children: profile.isFlagged ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs font-mono", children: "FLAGGED" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs font-mono text-muted-foreground",
              children: "CLEAN"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-sm p-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "Attempts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold font-display tabular-nums text-foreground", children: Number(profile.accessAttempts) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-sm p-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "Flagged" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: cn(
                  "text-lg font-semibold font-display tabular-nums",
                  Number(profile.flaggedAttempts) > 0 ? "text-destructive" : "text-foreground"
                ),
                children: Number(profile.flaggedAttempts)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-sm p-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "Devices" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold font-display tabular-nums text-foreground", children: profile.deviceFingerprints.length })
          ] })
        ] }),
        profile.deviceFingerprints.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "Device fingerprints:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
            profile.deviceFingerprints.slice(0, 3).map((fp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-block px-1.5 py-0.5 text-xs font-mono bg-muted/50 text-muted-foreground rounded-sm border border-border",
                children: truncatePrincipal(fp, 6)
              },
              fp
            )),
            profile.deviceFingerprints.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
              "+",
              profile.deviceFingerprints.length - 3,
              " more"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
            "Last: ",
            formatTimestamp(profile.lastAccessTime)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": `admin.flagged.clear_button.${index}`,
              variant: "outline",
              size: "sm",
              className: "h-7 text-xs border-border hover:border-accent/40 hover:text-accent",
              disabled: true,
              title: "Clear flag (coming soon)",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 mr-1" }),
                "Clear Flag"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function FlaggedUsersTab({
  profiles,
  isLoading
}) {
  const sorted = [...profiles].sort(
    (a, b) => a.isFlagged === b.isFlagged ? 0 : a.isFlagged ? -1 : 1
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
        profiles.filter((p) => p.isFlagged).length,
        " flagged /",
        " ",
        profiles.length,
        " total users tracked"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "admin.flagged.export_button",
          variant: "outline",
          size: "sm",
          className: "h-8 text-xs",
          onClick: () => exportAsJSON(profiles, "flagged-users-export.json"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3 mr-1.5" }),
            "Export JSON"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "admin.flagged.loading_state",
        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
        children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-40 bg-muted/30 rounded-sm animate-pulse"
          },
          i
        ))
      }
    ) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "admin.flagged.empty_state",
        className: "flex flex-col items-center gap-3 py-12 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-accent opacity-60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No behavior profiles found." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "admin.flagged.list",
        className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3",
        children: sorted.map((profile) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FlaggedUserCard,
          {
            profile,
            index: sorted.indexOf(profile) + 1
          },
          profile.userId.toString()
        ))
      }
    )
  ] });
}
function AdminPage() {
  const { isAdmin, isRoleLoading } = useAuth();
  const messagesQuery = useAdminMessages();
  const logsQuery = useAdminAccessLogs();
  const flaggedQuery = useAdminFlaggedUsers();
  const messages = messagesQuery.data ?? [];
  const logs = logsQuery.data ?? [];
  const flaggedUsers = flaggedQuery.data ?? [];
  const isLoading = messagesQuery.isLoading || logsQuery.isLoading || flaggedQuery.isLoading;
  if (!isRoleLoading && !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "Admin Dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.page", className: "flex flex-col gap-6 p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-sm bg-primary/10 border border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldX, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-semibold text-foreground", children: "Admin Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "System-wide oversight — messages, access audit trail, and behavior anomaly tracking." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminStats,
      {
        messages,
        accessLogs: logs,
        flaggedUsers,
        isLoading
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SetAdminPanel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "messages", "data-ocid": "admin.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/30 border border-border h-9", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "admin.tabs.messages",
            value: "messages",
            className: "text-xs font-mono",
            children: [
              "All Messages",
              messages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 px-1.5 py-0.5 bg-primary/10 text-primary rounded-sm text-xs", children: messages.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "admin.tabs.logs",
            value: "logs",
            className: "text-xs font-mono",
            children: [
              "Access Logs",
              logs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 px-1.5 py-0.5 bg-warning/10 text-warning rounded-sm text-xs", children: logs.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "admin.tabs.flagged",
            value: "flagged",
            className: "text-xs font-mono",
            children: [
              "Flagged Users",
              flaggedUsers.filter((u) => u.isFlagged).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 px-1.5 py-0.5 bg-destructive/10 text-destructive rounded-sm text-xs", children: flaggedUsers.filter((u) => u.isFlagged).length })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "messages", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MessagesTab,
        {
          messages,
          isLoading: messagesQuery.isLoading
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "logs", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccessLogsTab, { logs, isLoading: logsQuery.isLoading }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "flagged", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FlaggedUsersTab,
        {
          profiles: flaggedUsers,
          isLoading: flaggedQuery.isLoading
        }
      ) })
    ] })
  ] }) });
}
export {
  AdminPage as default
};
