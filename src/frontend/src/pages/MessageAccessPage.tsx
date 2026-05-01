/**
 * MessageAccessPage — /message/:token
 *
 * State machine:
 *   warning → loading → viewed | error
 *
 * On mount: show one-time warning overlay.
 * On confirm: call accessMessage(token, fingerprint), then:
 *   - Decrypt content with the returned contentKey (AES-GCM via Web Crypto).
 *   - Show MessageViewer with decrypted content.
 *   - After viewing: show DestroyedTombstone.
 * Error cases: not-found, already-viewed, expired, blocked.
 */

import { DestroyedTombstone } from "@/components/DestroyedTombstone";
import { MessageViewer } from "@/components/MessageViewer";
import { OneTimeWarning } from "@/components/OneTimeWarning";
import { Button } from "@/components/ui/button";
import { useAccessMessage } from "@/hooks/useMessages";
import { formatTimestamp, generateDeviceFingerprint } from "@/types";
import type { MessageView } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import { AlertCircle, Ban, Clock, Search } from "lucide-react";
import { motion } from "motion/react";
import React, { useCallback, useState } from "react";

// ─── AES-GCM decryption ────────────────────────────────────────────────────────

/**
 * Decrypts an AES-GCM encrypted base64 ciphertext using a base64-encoded raw key.
 * The server stores contentKey as a base64 raw AES-256 key; ciphertext is
 * base64(iv[12 bytes] + ciphertext).
 */
async function decryptAesGcm(
  contentKeyB64: string,
  ciphertextB64: string,
): Promise<string> {
  try {
    const keyBytes = Uint8Array.from(atob(contentKeyB64), (c) =>
      c.charCodeAt(0),
    );
    const cipherBytes = Uint8Array.from(atob(ciphertextB64), (c) =>
      c.charCodeAt(0),
    );

    const iv = cipherBytes.slice(0, 12);
    const data = cipherBytes.slice(12);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-GCM" },
      false,
      ["decrypt"],
    );

    const plainBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      data,
    );

    return new TextDecoder().decode(plainBuffer);
  } catch {
    // If decryption fails (e.g. content stored as plain text in demo), return as-is
    return atob(ciphertextB64);
  }
}

// ─── Page state type ────────────────────────────────────────────────────────────

type PageState =
  | { phase: "warning" }
  | { phase: "loading" }
  | {
      phase: "viewed";
      message: MessageView;
      decryptedContent: string;
      accessedAt: string;
    }
  | { phase: "destroyed"; accessedAt: string }
  | {
      phase: "error";
      kind: "not_found" | "already_viewed" | "expired" | "blocked" | "generic";
      message: string;
    };

// ─── Error UI ──────────────────────────────────────────────────────────────────

interface ErrorDisplayProps {
  kind: "not_found" | "already_viewed" | "expired" | "blocked" | "generic";
  message: string;
  onGoHome: () => void;
}

function ErrorDisplay({ kind, message, onGoHome }: ErrorDisplayProps) {
  const config = {
    not_found: {
      icon: <Search className="w-7 h-7 text-muted-foreground" />,
      title: "Message Not Found",
      desc: "This access link is invalid or has already been deleted.",
      color: "text-muted-foreground",
      borderColor: "border-border",
    },
    already_viewed: {
      icon: <Clock className="w-7 h-7 text-secondary" />,
      title: "Already Viewed",
      desc: "This one-time message has already been accessed and permanently deleted.",
      color: "text-secondary",
      borderColor: "border-secondary/40",
    },
    expired: {
      icon: <Clock className="w-7 h-7 text-muted-foreground" />,
      title: "Link Expired",
      desc: "This message has passed its expiration date and has been automatically deleted.",
      color: "text-muted-foreground",
      borderColor: "border-border",
    },
    blocked: {
      icon: <Ban className="w-7 h-7 text-destructive" />,
      title: "Access Denied",
      desc: "Suspicious activity has been detected from your device. Access to this message has been blocked.",
      color: "text-destructive",
      borderColor: "border-destructive/40",
    },
    generic: {
      icon: <AlertCircle className="w-7 h-7 text-destructive" />,
      title: "Access Failed",
      desc: message,
      color: "text-destructive",
      borderColor: "border-destructive/40",
    },
  }[kind];

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      data-ocid="message_access.error_state"
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={`border ${config.borderColor} rounded-sm bg-card overflow-hidden`}
        >
          <div className="p-8 text-center">
            <div className="flex items-center justify-center mb-5">
              <div
                className={`w-14 h-14 rounded-sm border ${config.borderColor} bg-muted/10 flex items-center justify-center`}
              >
                {config.icon}
              </div>
            </div>
            <h1
              className={`text-lg font-display font-semibold mb-2 ${config.color}`}
            >
              {config.title}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {config.desc}
            </p>

            {kind === "blocked" && (
              <div className="px-3 py-2.5 rounded-sm bg-destructive/5 border border-destructive/20 mb-5 text-xs text-muted-foreground font-mono">
                Suspicious activity detected — contact your administrator if you
                believe this is an error.
              </div>
            )}

            <Button
              variant="outline"
              className="w-full border-border text-muted-foreground hover:text-foreground transition-smooth"
              onClick={onGoHome}
              data-ocid="message_access.error_home_button"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function MessageAccessPage() {
  const params = useParams({ from: "/message/$token" });
  const token = params.token;
  const navigate = useNavigate();

  const accessMessageMutation = useAccessMessage();
  const [pageState, setPageState] = useState<PageState>({ phase: "warning" });

  const goHome = useCallback(() => {
    navigate({ to: "/dashboard" });
  }, [navigate]);

  // Called when user confirms the one-time warning
  const handleProceed = useCallback(async () => {
    if (!token) {
      setPageState({
        phase: "error",
        kind: "not_found",
        message: "No access token provided.",
      });
      return;
    }

    setPageState({ phase: "loading" });

    const fingerprint = generateDeviceFingerprint();

    try {
      const messageView = await accessMessageMutation.mutateAsync({
        accessToken: token,
        deviceFingerprint: fingerprint,
      });

      const accessedAt = new Date().toLocaleString();

      // Attempt to decrypt the content using the returned contentKey
      let decryptedContent: string;
      try {
        decryptedContent = await decryptAesGcm(
          messageView.contentKey,
          messageView.encryptedContent,
        );
      } catch {
        // Fallback: show raw content if decryption is not applicable
        decryptedContent = messageView.encryptedContent;
      }

      setPageState({
        phase: "viewed",
        message: messageView,
        decryptedContent,
        accessedAt,
      });
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Unknown error occurred.";

      // Map known backend error strings to specific kinds
      if (errorMsg.includes("not found") || errorMsg.includes("invalid")) {
        setPageState({ phase: "error", kind: "not_found", message: errorMsg });
      } else if (errorMsg.includes("already") || errorMsg.includes("viewed")) {
        setPageState({
          phase: "error",
          kind: "already_viewed",
          message: errorMsg,
        });
      } else if (errorMsg.includes("expired")) {
        setPageState({ phase: "error", kind: "expired", message: errorMsg });
      } else if (
        errorMsg.includes("blocked") ||
        errorMsg.includes("suspicious") ||
        errorMsg.includes("anomaly") ||
        errorMsg.includes("behavior")
      ) {
        setPageState({ phase: "error", kind: "blocked", message: errorMsg });
      } else {
        setPageState({ phase: "error", kind: "generic", message: errorMsg });
      }
    }
  }, [token, accessMessageMutation]);

  // Once user is done reading, transition to tombstone
  const handleViewed = useCallback(() => {
    if (pageState.phase !== "viewed") return;
    // Use a short delay so user can read before tombstone appears
    setTimeout(() => {
      setPageState((prev) =>
        prev.phase === "viewed"
          ? { phase: "destroyed", accessedAt: prev.accessedAt }
          : prev,
      );
    }, 30_000); // Auto-destroy UI after 30 seconds of viewing
  }, [pageState.phase]);

  // ─── Render ──────────────────────────────────────────────────────────────────

  if (pageState.phase === "warning") {
    return (
      <OneTimeWarning
        onProceed={handleProceed}
        onBack={goHome}
        isLoading={false}
      />
    );
  }

  if (pageState.phase === "loading") {
    return (
      <OneTimeWarning
        onProceed={handleProceed}
        onBack={goHome}
        isLoading={true}
      />
    );
  }

  if (pageState.phase === "error") {
    return (
      <ErrorDisplay
        kind={pageState.kind}
        message={pageState.message}
        onGoHome={goHome}
      />
    );
  }

  if (pageState.phase === "destroyed") {
    return (
      <DestroyedTombstone accessedAt={pageState.accessedAt} onGoHome={goHome} />
    );
  }

  // phase === "viewed"
  return (
    <MessageViewer
      message={pageState.message}
      decryptedContent={pageState.decryptedContent}
      onViewed={handleViewed}
    />
  );
}
