import { c as createLucideIcon, j as jsxRuntimeExports, w as motion, B as Button, x as LayoutDashboard, r as reactExports, a as Lock, y as Shield, k as formatTimestamp, E as Eye, z as useParams, u as useNavigate, A as generateDeviceFingerprint, C as Clock } from "./index-B_I069t4.js";
import { S as ShieldOff } from "./shield-off-DQlaVOV7.js";
import { U as User, C as CircleAlert } from "./user-BPSfq0k2.js";
import { T as TriangleAlert, F as FileText, D as Download } from "./triangle-alert-CnO543-u.js";
import { b as useAccessMessage } from "./index-CZgAH2l5.js";
import { S as Search } from "./search-D1vAg7cJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]
];
const Ban = createLucideIcon("ban", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode);
function DestroyedTombstone({
  accessedAt,
  onGoHome
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center p-4",
      "data-ocid": "destroyed_tombstone.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-64 h-64 rounded-full bg-muted/20 blur-3xl" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative w-full max-w-sm text-center",
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "flex items-center justify-center mb-6",
                  initial: { scale: 0.7, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: {
                    delay: 0.15,
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.3
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-20 h-20 rounded-sm bg-muted/20 border border-border flex items-center justify-center relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-8 h-8 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-destructive/60 absolute -bottom-1 -right-1" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.25, duration: 0.35 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-semibold text-foreground tracking-tight mb-2", children: "Message Destroyed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto mb-6", children: "This message has been permanently deleted from all systems. It can never be recovered or viewed again." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-border mb-6" }),
              accessedAt && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "mb-6 px-4 py-3 rounded-sm bg-muted/30 border border-border",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.4, duration: 0.35 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/50 uppercase tracking-widest text-[10px] block mb-1", children: "Accessed at" }),
                    accessedAt
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-muted/20 border border-border text-muted-foreground text-xs font-mono mb-7",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.5 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-muted-foreground/50" }),
                    "ONE-TIME ACCESS CONSUMED",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-muted-foreground/50" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.55, duration: 0.35 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "w-full border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth",
                      onClick: onGoHome,
                      "data-ocid": "destroyed_tombstone.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4 mr-2" }),
                        "Return to Dashboard"
                      ]
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function FileAttachmentRow({ attachment }) {
  const isImage = attachment.fileType.startsWith("image/");
  const downloadUrl = attachment.blob.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-sm bg-background/60 p-4",
      "data-ocid": "message_viewer.attachment",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3", children: "Attachment" }),
        isImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 rounded-sm overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: downloadUrl,
            alt: attachment.fileName,
            className: "w-full max-h-80 object-contain bg-muted/10"
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3 p-3 rounded-sm bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: attachment.fileName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: attachment.fileType })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: downloadUrl,
            download: attachment.fileName,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-primary/40 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-smooth",
            "data-ocid": "message_viewer.download_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              "Download ",
              attachment.fileName
            ]
          }
        )
      ]
    }
  );
}
function MessageViewer({
  message,
  decryptedContent,
  onViewed
}) {
  const accessedAtMs = Number(message.accessedAt) / 1e6;
  reactExports.useEffect(() => {
    onViewed == null ? void 0 : onViewed();
  }, [onViewed]);
  const hasAttachment = !!message.fileAttachment;
  const attachment = message.fileAttachment;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background flex items-start justify-center p-4 pt-8",
      "data-ocid": "message_viewer.panel",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "w-full max-w-xl space-y-4",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-primary uppercase tracking-widest", children: "Secure Message" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-muted/30 border border-border text-muted-foreground text-xs font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                "ONE-TIME ACCESS"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-sm bg-card overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-border bg-background/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono mb-0.5", children: "From" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-mono truncate", children: message.senderId.toString() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-right shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono mb-0.5", children: "Accessed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: new Date(accessedAtMs).toLocaleString() })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono mb-3", children: "Message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-foreground text-sm leading-relaxed whitespace-pre-wrap break-words rounded-sm bg-background/50 border border-border p-4 font-body select-text",
                    "data-ocid": "message_viewer.content",
                    children: decryptedContent
                  }
                )
              ] }),
              hasAttachment && attachment && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileAttachmentRow, { attachment }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 px-5 py-3 border-t border-border bg-muted/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3 text-primary/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: "This message is for your eyes only" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5 rounded-sm bg-card border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1", children: "Accessed At" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground font-mono", children: formatTimestamp(message.accessedAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-3 py-2.5 rounded-sm bg-muted/20 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This message has been permanently deleted after this viewing. No copies exist." })
            ] })
          ]
        }
      )
    }
  );
}
function OneTimeWarning({
  onProceed,
  onBack,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center p-4",
      "data-ocid": "one_time_warning.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-96 h-96 rounded-full bg-destructive/5 blur-3xl" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative w-full max-w-md",
            initial: { opacity: 0, scale: 0.95, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-destructive/40 rounded-sm bg-card overflow-hidden shadow-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-gradient-to-r from-destructive/60 via-destructive to-destructive/60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-sm bg-destructive/10 border border-destructive/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-7 h-7 text-destructive" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-sm border border-destructive/40 animate-ping opacity-30" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-semibold text-foreground tracking-tight mb-2", children: "One-Time Message" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-destructive/10 border border-destructive/25 text-destructive text-xs font-mono mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3" }),
                      "IRREVERSIBLE ACTION"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
                      "This message can only be viewed",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "ONCE" }),
                      ". Once you proceed, it will be",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-semibold", children: "permanently deleted" }),
                      " ",
                      "from the system."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 mb-7 border border-border rounded-sm p-4 bg-background/50", children: [
                    "The message cannot be recovered after viewing",
                    "Forwarding or copying is strictly prohibited",
                    "Your device fingerprint will be logged",
                    "Suspicious activity will trigger an alert"
                  ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex items-start gap-2.5 text-xs text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0" }),
                        item
                      ]
                    },
                    item
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground font-mono mb-6 flex items-center justify-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3 text-primary" }),
                    "This message is for your eyes only"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "destructive",
                        className: "w-full font-semibold tracking-wide transition-smooth",
                        onClick: onProceed,
                        disabled: isLoading,
                        "data-ocid": "one_time_warning.confirm_button",
                        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-destructive-foreground border-t-transparent rounded-full animate-spin" }),
                          "Accessing…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
                          "Proceed to View"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "ghost",
                        className: "w-full text-muted-foreground hover:text-foreground transition-smooth",
                        onClick: onBack,
                        disabled: isLoading,
                        "data-ocid": "one_time_warning.cancel_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                          "Go Back"
                        ]
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4 font-mono", children: "Powered by end-to-end encryption" })
            ]
          }
        )
      ]
    }
  );
}
async function decryptAesGcm(contentKeyB64, ciphertextB64) {
  try {
    const keyBytes = Uint8Array.from(
      atob(contentKeyB64),
      (c) => c.charCodeAt(0)
    );
    const cipherBytes = Uint8Array.from(
      atob(ciphertextB64),
      (c) => c.charCodeAt(0)
    );
    const iv = cipherBytes.slice(0, 12);
    const data = cipherBytes.slice(12);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
    const plainBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      data
    );
    return new TextDecoder().decode(plainBuffer);
  } catch {
    return atob(ciphertextB64);
  }
}
function ErrorDisplay({ kind, message, onGoHome }) {
  const config = {
    not_found: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-7 h-7 text-muted-foreground" }),
      title: "Message Not Found",
      desc: "This access link is invalid or has already been deleted.",
      color: "text-muted-foreground",
      borderColor: "border-border"
    },
    already_viewed: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-7 h-7 text-secondary" }),
      title: "Already Viewed",
      desc: "This one-time message has already been accessed and permanently deleted.",
      color: "text-secondary",
      borderColor: "border-secondary/40"
    },
    expired: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-7 h-7 text-muted-foreground" }),
      title: "Link Expired",
      desc: "This message has passed its expiration date and has been automatically deleted.",
      color: "text-muted-foreground",
      borderColor: "border-border"
    },
    blocked: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-7 h-7 text-destructive" }),
      title: "Access Denied",
      desc: "Suspicious activity has been detected from your device. Access to this message has been blocked.",
      color: "text-destructive",
      borderColor: "border-destructive/40"
    },
    generic: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-7 h-7 text-destructive" }),
      title: "Access Failed",
      desc: message,
      color: "text-destructive",
      borderColor: "border-destructive/40"
    }
  }[kind];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center p-4",
      "data-ocid": "message_access.error_state",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "w-full max-w-md",
          initial: { opacity: 0, scale: 0.96, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `border ${config.borderColor} rounded-sm bg-card overflow-hidden`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-14 h-14 rounded-sm border ${config.borderColor} bg-muted/10 flex items-center justify-center`,
                    children: config.icon
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: `text-lg font-display font-semibold mb-2 ${config.color}`,
                    children: config.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: config.desc }),
                kind === "blocked" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 rounded-sm bg-destructive/5 border border-destructive/20 mb-5 text-xs text-muted-foreground font-mono", children: "Suspicious activity detected — contact your administrator if you believe this is an error." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full border-border text-muted-foreground hover:text-foreground transition-smooth",
                    onClick: onGoHome,
                    "data-ocid": "message_access.error_home_button",
                    children: "Return to Dashboard"
                  }
                )
              ] })
            }
          )
        }
      )
    }
  );
}
function MessageAccessPage() {
  const params = useParams({ from: "/message/$token" });
  const token = params.token;
  const navigate = useNavigate();
  const accessMessageMutation = useAccessMessage();
  const [pageState, setPageState] = reactExports.useState({ phase: "warning" });
  const goHome = reactExports.useCallback(() => {
    navigate({ to: "/dashboard" });
  }, [navigate]);
  const handleProceed = reactExports.useCallback(async () => {
    if (!token) {
      setPageState({
        phase: "error",
        kind: "not_found",
        message: "No access token provided."
      });
      return;
    }
    setPageState({ phase: "loading" });
    const fingerprint = generateDeviceFingerprint();
    try {
      const messageView = await accessMessageMutation.mutateAsync({
        accessToken: token,
        deviceFingerprint: fingerprint
      });
      const accessedAt = (/* @__PURE__ */ new Date()).toLocaleString();
      let decryptedContent;
      try {
        decryptedContent = await decryptAesGcm(
          messageView.contentKey,
          messageView.encryptedContent
        );
      } catch {
        decryptedContent = messageView.encryptedContent;
      }
      setPageState({
        phase: "viewed",
        message: messageView,
        decryptedContent,
        accessedAt
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error occurred.";
      if (errorMsg.includes("not found") || errorMsg.includes("invalid")) {
        setPageState({ phase: "error", kind: "not_found", message: errorMsg });
      } else if (errorMsg.includes("already") || errorMsg.includes("viewed")) {
        setPageState({
          phase: "error",
          kind: "already_viewed",
          message: errorMsg
        });
      } else if (errorMsg.includes("expired")) {
        setPageState({ phase: "error", kind: "expired", message: errorMsg });
      } else if (errorMsg.includes("blocked") || errorMsg.includes("suspicious") || errorMsg.includes("anomaly") || errorMsg.includes("behavior")) {
        setPageState({ phase: "error", kind: "blocked", message: errorMsg });
      } else {
        setPageState({ phase: "error", kind: "generic", message: errorMsg });
      }
    }
  }, [token, accessMessageMutation]);
  const handleViewed = reactExports.useCallback(() => {
    if (pageState.phase !== "viewed") return;
    setTimeout(() => {
      setPageState(
        (prev) => prev.phase === "viewed" ? { phase: "destroyed", accessedAt: prev.accessedAt } : prev
      );
    }, 3e4);
  }, [pageState.phase]);
  if (pageState.phase === "warning") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      OneTimeWarning,
      {
        onProceed: handleProceed,
        onBack: goHome,
        isLoading: false
      }
    );
  }
  if (pageState.phase === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      OneTimeWarning,
      {
        onProceed: handleProceed,
        onBack: goHome,
        isLoading: true
      }
    );
  }
  if (pageState.phase === "error") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorDisplay,
      {
        kind: pageState.kind,
        message: pageState.message,
        onGoHome: goHome
      }
    );
  }
  if (pageState.phase === "destroyed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DestroyedTombstone, { accessedAt: pageState.accessedAt, onGoHome: goHome });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MessageViewer,
    {
      message: pageState.message,
      decryptedContent: pageState.decryptedContent,
      onViewed: handleViewed
    }
  );
}
export {
  MessageAccessPage as default
};
