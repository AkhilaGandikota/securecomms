/**
 * SendMessagePage — compose and send a one-time secure encrypted message.
 *
 * Flow:
 *  1. Fill form (recipient, content, expiration, optional file)
 *  2. On submit: AES-256-GCM encrypt content via Web Crypto API
 *  3. Send encrypted payload + exported key to backend
 *  4. Display the generated access link for sharing
 */

import { AccessLinkDisplay } from "@/components/AccessLinkDisplay";
import {
  EncryptionIndicator,
  type EncryptionStatus,
} from "@/components/EncryptionIndicator";
import { FileUploadZone } from "@/components/FileUploadZone";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSendMessage } from "@/hooks/useMessages";
import { cn } from "@/lib/utils";
import type { FileAttachment } from "@/types";
import {
  AlertCircle,
  Clock,
  Lock,
  MessageSquareLock,
  RefreshCw,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

// ─── Constants ──────────────────────────────────────────────────────────────────

const EXPIRY_OPTIONS = [
  { label: "1 hour", value: "3600" },
  { label: "6 hours", value: "21600" },
  { label: "24 hours", value: "86400" },
  { label: "7 days", value: "604800" },
] as const;

const MAX_CHARS = 4000;

// ─── Validation helpers ──────────────────────────────────────────────────────────

/** Validate ICP principal format: groups of alphanumeric chars separated by hyphens */
function isValidPrincipal(value: string): boolean {
  if (!value.trim()) return false;
  return /^[a-z0-9]{5}(-[a-z0-9]{5})*(-[a-z0-9]{3})?$/.test(value.trim());
}

// ─── Web Crypto helpers ──────────────────────────────────────────────────────────

async function encryptWithAES(
  plaintext: string,
): Promise<{ ciphertext: string; keyB64: string }> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  // Generate AES-256-GCM key
  const key = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );

  // Random 12-byte IV
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Encrypt
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data,
  );

  // Export key as raw bytes → base64
  const rawKey = await window.crypto.subtle.exportKey("raw", key);
  const keyB64 = btoa(String.fromCharCode(...new Uint8Array(rawKey)));

  // Pack iv + ciphertext as base64
  const combined = new Uint8Array(iv.byteLength + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.byteLength);
  const ciphertext = btoa(String.fromCharCode(...combined));

  return { ciphertext, keyB64 };
}

// ─── Main component ──────────────────────────────────────────────────────────────

export default function SendMessagePage() {
  // Form state
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");
  const [expiry, setExpiry] = useState("86400");
  const [file, setFile] = useState<File | null>(null);

  // Validation
  const [recipientTouched, setRecipientTouched] = useState(false);
  const [contentTouched, setContentTouched] = useState(false);

  // Encryption display state
  const [encryptionStatus, setEncryptionStatus] =
    useState<EncryptionStatus>("idle");

  // Result state
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const sendMessage = useSendMessage();

  // ── Derived errors ──
  const recipientError =
    recipientTouched && recipient && !isValidPrincipal(recipient)
      ? "Invalid principal format (e.g. aaaaa-aa)"
      : recipientTouched && !recipient
        ? "Recipient is required"
        : null;

  const contentError =
    contentTouched && !content.trim()
      ? "Message content is required"
      : contentTouched && content.length > MAX_CHARS
        ? `Message exceeds ${MAX_CHARS} characters`
        : null;

  const isFormValid =
    isValidPrincipal(recipient) &&
    content.trim().length > 0 &&
    content.length <= MAX_CHARS;

  const isBusy = encryptionStatus === "encrypting" || sendMessage.isPending;

  // ── Submit handler ──
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setRecipientTouched(true);
      setContentTouched(true);

      if (!isFormValid) return;

      try {
        // Step 1: Encrypt
        setEncryptionStatus("encrypting");
        await new Promise((r) => setTimeout(r, 400)); // visual pause for UX

        const { ciphertext, keyB64 } = await encryptWithAES(content);
        setEncryptionStatus("encrypted");

        // Step 2: Prepare file attachment using ExternalBlob
        let fileAttachment: FileAttachment | null = null;
        if (file) {
          const { ExternalBlob } = await import("@/backend");
          const fileBytes = new Uint8Array(await file.arrayBuffer());
          fileAttachment = {
            fileName: file.name,
            fileType: file.type,
            fileSize: BigInt(file.size),
            storageId: `upload_${Date.now()}`,
            blob: ExternalBlob.fromBytes(fileBytes),
          };
        }

        // Step 3: Send to backend
        const token = await sendMessage.mutateAsync({
          recipientId: recipient.trim(),
          encryptedContent: ciphertext,
          contentKey: keyB64,
          expiresInSeconds: BigInt(expiry),
          fileAttachment,
        });

        setAccessToken(token);
        toast.success("Message sent securely");
      } catch (err) {
        setEncryptionStatus("error");
        const message =
          err instanceof Error ? err.message : "Failed to send message";
        toast.error(message);
      }
    },
    [isFormValid, content, file, recipient, expiry, sendMessage],
  );

  const handleReset = () => {
    setRecipient("");
    setContent("");
    setExpiry("86400");
    setFile(null);
    setRecipientTouched(false);
    setContentTouched(false);
    setEncryptionStatus("idle");
    setAccessToken(null);
    sendMessage.reset();
  };

  // ── Success view ──
  if (accessToken) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Success header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/30 mx-auto">
                <ShieldCheck className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Message Sent Securely
              </h1>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your message has been encrypted and stored. Share the link below
                with your recipient.
              </p>
            </div>

            <AccessLinkDisplay token={accessToken} />

            <Button
              data-ocid="send_message.reset_button"
              variant="outline"
              className="w-full gap-2 border-border"
              onClick={handleReset}
            >
              <RefreshCw className="w-4 h-4" />
              Send Another Message
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // ── Form view ──
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Page header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
              <MessageSquareLock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">
                Secure Message
              </h1>
              <p className="text-xs text-muted-foreground">
                End-to-end encrypted · One-time access · Auto-delete on view
              </p>
            </div>
          </div>

          {/* Form card */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-card border border-border rounded-sm divide-y divide-border"
          >
            {/* Recipient */}
            <div className="p-5 space-y-2">
              <Label
                htmlFor="recipient"
                className="flex items-center gap-1.5 text-sm font-semibold"
              >
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                Recipient Principal ID
                <span className="text-destructive ml-0.5">*</span>
              </Label>
              <Input
                id="recipient"
                data-ocid="send_message.recipient_input"
                placeholder="xxxxx-xxxxx-xxxxx-xxxxx-cai"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                onBlur={() => setRecipientTouched(true)}
                className={cn(
                  "font-mono text-sm h-10",
                  recipientError &&
                    "border-destructive focus-visible:ring-destructive/30",
                )}
                autoComplete="off"
                spellCheck={false}
              />
              {recipientError && (
                <p
                  data-ocid="send_message.recipient_field_error"
                  className="flex items-center gap-1.5 text-xs text-destructive"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {recipientError}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Enter the ICP Principal ID of the intended recipient. Only this
                identity can access the message.
              </p>
            </div>

            {/* Message content */}
            <div className="p-5 space-y-2">
              <Label
                htmlFor="content"
                className="flex items-center gap-1.5 text-sm font-semibold"
              >
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                Message Content
                <span className="text-destructive ml-0.5">*</span>
              </Label>
              <div className="relative">
                <textarea
                  id="content"
                  data-ocid="send_message.content_textarea"
                  rows={6}
                  placeholder="Write your confidential message here. It will be AES-256 encrypted before sending."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onBlur={() => setContentTouched(true)}
                  className={cn(
                    "flex w-full rounded-sm border bg-background px-3 py-2 text-sm",
                    "placeholder:text-muted-foreground focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
                    "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                    "border-input transition-colors",
                    contentError &&
                      "border-destructive focus-visible:ring-destructive/30",
                  )}
                />
                {/* Character counter */}
                <div
                  className={cn(
                    "absolute bottom-2 right-3 text-xs font-mono",
                    content.length > MAX_CHARS * 0.9
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {content.length}/{MAX_CHARS}
                </div>
              </div>
              {contentError && (
                <p
                  data-ocid="send_message.content_field_error"
                  className="flex items-center gap-1.5 text-xs text-destructive"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {contentError}
                </p>
              )}
            </div>

            {/* Expiration */}
            <div className="p-5 space-y-2">
              <Label
                htmlFor="expiry"
                className="flex items-center gap-1.5 text-sm font-semibold"
              >
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                Expiration Time
              </Label>
              <Select value={expiry} onValueChange={setExpiry}>
                <SelectTrigger
                  id="expiry"
                  data-ocid="send_message.expiry_select"
                  className="h-10 border-input"
                >
                  <SelectValue placeholder="Select expiry…" />
                </SelectTrigger>
                <SelectContent>
                  {EXPIRY_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      data-ocid={`send_message.expiry_option.${opt.value}`}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Message auto-deletes after this period even if not viewed.
              </p>
            </div>

            {/* File attachment */}
            <div className="p-5 space-y-2">
              <Label className="flex items-center gap-1.5 text-sm font-semibold">
                File Attachment{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <FileUploadZone value={file} onChange={setFile} />
            </div>

            <Separator />

            {/* Encryption indicator + submit */}
            <div className="p-5 space-y-4">
              <EncryptionIndicator status={encryptionStatus} />

              {/* Backend error */}
              {sendMessage.isError && (
                <div
                  data-ocid="send_message.error_state"
                  className="flex items-start gap-2 p-3 rounded-sm bg-destructive/5 border border-destructive/30 text-sm text-destructive"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    {sendMessage.error instanceof Error
                      ? sendMessage.error.message
                      : "An unexpected error occurred. Please try again."}
                  </span>
                </div>
              )}

              <Button
                data-ocid="send_message.submit_button"
                type="submit"
                className="w-full gap-2 h-11 font-semibold"
                disabled={isBusy}
              >
                {isBusy ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {encryptionStatus === "encrypting"
                      ? "Encrypting…"
                      : "Sending…"}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Encrypt &amp; Send Message
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Message is encrypted client-side with AES-256-GCM before leaving
                your device.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
