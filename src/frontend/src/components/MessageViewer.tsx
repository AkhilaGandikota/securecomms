/**
 * MessageViewer — displays the decrypted content of a one-time message.
 * Shows message text, optional file attachment, and sender info.
 * Includes copy-prevention notice and a note about permanent deletion.
 */

import type { FileAttachment, MessageView } from "@/types";
import { formatTimestamp } from "@/types";
import {
  AlertTriangle,
  Download,
  FileText,
  Lock,
  Shield,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

interface MessageViewerProps {
  message: MessageView;
  /** The decrypted plaintext content to display */
  decryptedContent: string;
  /** Called when component mounts (message is being read) */
  onViewed?: () => void;
}

/** Renders a file attachment row with download link */
function FileAttachmentRow({ attachment }: { attachment: FileAttachment }) {
  const isImage = attachment.fileType.startsWith("image/");
  const downloadUrl = attachment.blob.getDirectURL();

  return (
    <div
      className="border border-border rounded-sm bg-background/60 p-4"
      data-ocid="message_viewer.attachment"
    >
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
        Attachment
      </p>

      {isImage ? (
        <div className="mb-3 rounded-sm overflow-hidden border border-border">
          <img
            src={downloadUrl}
            alt={attachment.fileName}
            className="w-full max-h-80 object-contain bg-muted/10"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 mb-3 p-3 rounded-sm bg-muted/20">
          <div className="w-9 h-9 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {attachment.fileName}
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              {attachment.fileType}
            </p>
          </div>
        </div>
      )}

      <a
        href={downloadUrl}
        download={attachment.fileName}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-primary/40 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-smooth"
        data-ocid="message_viewer.download_button"
      >
        <Download className="w-3.5 h-3.5" />
        Download {attachment.fileName}
      </a>
    </div>
  );
}

export function MessageViewer({
  message,
  decryptedContent,
  onViewed,
}: MessageViewerProps) {
  const accessedAtMs = Number(message.accessedAt) / 1_000_000;

  // Notify parent that message is being read
  useEffect(() => {
    onViewed?.();
  }, [onViewed]);

  const hasAttachment = !!message.fileAttachment;
  const attachment = message.fileAttachment;

  return (
    <div
      className="min-h-screen bg-background flex items-start justify-center p-4 pt-8"
      data-ocid="message_viewer.panel"
    >
      <motion.div
        className="w-full max-w-xl space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary uppercase tracking-widest">
              Secure Message
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-muted/30 border border-border text-muted-foreground text-xs font-mono">
            <Lock className="w-3 h-3" />
            ONE-TIME ACCESS
          </div>
        </div>

        {/* Main message card */}
        <div className="border border-border rounded-sm bg-card overflow-hidden">
          {/* Card top accent */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* Sender info */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-background/30">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-0.5">
                From
              </p>
              <p className="text-sm text-foreground font-mono truncate">
                {message.senderId.toString()}
              </p>
            </div>
            <div className="ml-auto text-right shrink-0">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-0.5">
                Accessed
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {new Date(accessedAtMs).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Decrypted message body */}
          <div className="px-5 py-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-3">
              Message
            </p>
            <div
              className="text-foreground text-sm leading-relaxed whitespace-pre-wrap break-words rounded-sm bg-background/50 border border-border p-4 font-body select-text"
              data-ocid="message_viewer.content"
            >
              {decryptedContent}
            </div>
          </div>

          {/* File attachment */}
          {hasAttachment && attachment && (
            <div className="px-5 pb-4">
              <FileAttachmentRow attachment={attachment} />
            </div>
          )}

          {/* Eyes-only notice */}
          <div className="flex items-center justify-center gap-2 px-5 py-3 border-t border-border bg-muted/10">
            <Shield className="w-3 h-3 text-primary/70" />
            <p className="text-xs font-mono text-muted-foreground">
              This message is for your eyes only
            </p>
          </div>
        </div>

        {/* Accessed timestamp */}
        <div className="px-3 py-2.5 rounded-sm bg-card border border-border">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
            Accessed At
          </p>
          <p className="text-xs text-foreground font-mono">
            {formatTimestamp(message.accessedAt)}
          </p>
        </div>

        {/* Destruction notice */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-sm bg-muted/20 border border-border">
          <AlertTriangle className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">
            This message has been permanently deleted after this viewing. No
            copies exist.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
