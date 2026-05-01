/**
 * AccessLinkPage — Allows users who received a secure link externally to enter
 * their access token and be redirected to the message viewer.
 */

import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { ExternalLink, Lock, Search } from "lucide-react";
import { useState } from "react";

export default function AccessLinkPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  /** Extract a raw token from either a full URL or a bare token string. */
  function parseToken(raw: string): string {
    const trimmed = raw.trim();
    try {
      const url = new URL(trimmed);
      // Support /message/<token> or /access/<token> path formats
      const parts = url.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "message" || p === "access");
      if (idx !== -1 && parts[idx + 1]) {
        return parts[idx + 1];
      }
      // fallback: last path segment
      return parts[parts.length - 1] ?? trimmed;
    } catch {
      // Not a URL — treat the whole string as the token
      return trimmed;
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const extracted = parseToken(token);
    if (!extracted) {
      setError("Please enter a valid access token or link.");
      return;
    }
    setError("");
    navigate({ to: "/message/$token", params: { token: extracted } });
  }

  return (
    <Layout title="Access Secure Message">
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div
          data-ocid="access_link_page.panel"
          className="w-full max-w-md rounded-sm border border-accent/40 bg-card overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-5 py-4 bg-accent/10 border-b border-accent/30">
            <Lock className="w-4 h-4 text-accent shrink-0" />
            <p className="text-sm font-semibold text-accent font-mono tracking-wide">
              ENTER ACCESS TOKEN
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            {/* Instructions */}
            <div className="flex gap-2 p-3 rounded-sm bg-muted/40 border border-border">
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Paste the full secure link or just the token you received. You
                can only view the message{" "}
                <strong className="text-foreground">once</strong> — it will be
                permanently deleted after reading.
              </p>
            </div>

            {/* Token input */}
            <div className="space-y-2">
              <Label
                htmlFor="token-input"
                className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
              >
                Secure Link or Token
              </Label>
              <Input
                id="token-input"
                data-ocid="access_link_page.token_input"
                className="font-mono text-sm bg-background border-border h-10"
                placeholder="https://…/message/abc123  or  abc123"
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  if (error) setError("");
                }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {error && (
                <p
                  data-ocid="access_link_page.token_input.field_error"
                  className="text-xs text-destructive font-mono"
                >
                  {error}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              data-ocid="access_link_page.submit_button"
              type="submit"
              className="w-full gap-2"
              disabled={!token.trim()}
            >
              <Search className="w-4 h-4" />
              Access Message
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
