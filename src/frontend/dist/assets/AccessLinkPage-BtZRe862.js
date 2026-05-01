import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Layout, a as Lock, B as Button } from "./index-B_I069t4.js";
import { I as Input } from "./input-BexXeIUU.js";
import { L as Label } from "./label-DzaPVU75.js";
import { E as ExternalLink } from "./external-link-CJaS__WA.js";
import { S as Search } from "./search-D1vAg7cJ.js";
function AccessLinkPage() {
  const navigate = useNavigate();
  const [token, setToken] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  function parseToken(raw) {
    const trimmed = raw.trim();
    try {
      const url = new URL(trimmed);
      const parts = url.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "message" || p === "access");
      if (idx !== -1 && parts[idx + 1]) {
        return parts[idx + 1];
      }
      return parts[parts.length - 1] ?? trimmed;
    } catch {
      return trimmed;
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const extracted = parseToken(token);
    if (!extracted) {
      setError("Please enter a valid access token or link.");
      return;
    }
    setError("");
    navigate({ to: "/message/$token", params: { token: extracted } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "Access Secure Message", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center min-h-[70vh] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "access_link_page.panel",
      className: "w-full max-w-md rounded-sm border border-accent/40 bg-card overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-5 py-4 bg-accent/10 border-b border-accent/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-accent shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-accent font-mono tracking-wide", children: "ENTER ACCESS TOKEN" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 p-3 rounded-sm bg-muted/40 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
              "Paste the full secure link or just the token you received. You can only view the message",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "once" }),
              " — it will be permanently deleted after reading."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "token-input",
                className: "text-xs font-mono text-muted-foreground uppercase tracking-wider",
                children: "Secure Link or Token"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "token-input",
                "data-ocid": "access_link_page.token_input",
                className: "font-mono text-sm bg-background border-border h-10",
                placeholder: "https://…/message/abc123  or  abc123",
                value: token,
                onChange: (e) => {
                  setToken(e.target.value);
                  if (error) setError("");
                },
                autoComplete: "off",
                autoCorrect: "off",
                spellCheck: false
              }
            ),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "access_link_page.token_input.field_error",
                className: "text-xs text-destructive font-mono",
                children: error
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "access_link_page.submit_button",
              type: "submit",
              className: "w-full gap-2",
              disabled: !token.trim(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                "Access Message"
              ]
            }
          )
        ] })
      ]
    }
  ) }) });
}
export {
  AccessLinkPage as default
};
