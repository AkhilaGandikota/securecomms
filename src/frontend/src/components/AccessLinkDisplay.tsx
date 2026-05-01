/**
 * AccessLinkDisplay — shows the generated secure access token/link after a message is sent.
 * Provides copy-to-clipboard and WhatsApp sharing buttons.
 */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCheck,
  Copy,
  ExternalLink,
  Lock,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AccessLinkDisplayProps {
  token: string;
  className?: string;
}

export function AccessLinkDisplay({
  token,
  className,
}: AccessLinkDisplayProps) {
  const [copied, setCopied] = useState(false);

  const accessLink = `${window.location.origin}/message/${token}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accessLink);
      setCopied(true);
      toast.success("Link copied to clipboard", { duration: 3000 });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `🔒 You have a secure one-time message waiting for you. View it here (expires soon): ${accessLink}`,
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      data-ocid="access_link.panel"
      className={cn(
        "rounded-sm border border-accent/40 bg-accent/5 overflow-hidden",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-accent/10 border-b border-accent/30">
        <Lock className="w-4 h-4 text-accent shrink-0" />
        <p className="text-sm font-semibold text-accent font-mono tracking-wide">
          SECURE LINK GENERATED
        </p>
        <span className="ml-auto badge-security">ONE-TIME ACCESS</span>
      </div>

      {/* Link display */}
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 bg-card border border-border rounded-sm px-3 py-2">
          <code className="text-xs font-mono text-foreground flex-1 min-w-0 truncate select-all">
            {accessLink}
          </code>
          <Button
            data-ocid="access_link.copy_button"
            size="sm"
            variant="ghost"
            className={cn(
              "shrink-0 h-7 px-2 transition-smooth",
              copied
                ? "text-accent"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={handleCopy}
          >
            {copied ? (
              <CheckCheck className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Sharing instructions */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            Share via
          </p>
          <div className="flex gap-2">
            <Button
              data-ocid="access_link.copy_full_button"
              variant="outline"
              size="sm"
              className="flex-1 gap-2 border-border hover:border-primary/40 transition-smooth"
              onClick={handleCopy}
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Link
            </Button>
            <Button
              data-ocid="access_link.whatsapp_button"
              variant="outline"
              size="sm"
              className="flex-1 gap-2 border-primary/40 text-primary hover:bg-primary/20 hover:border-primary/60 transition-smooth"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </Button>
            <Button
              data-ocid="access_link.share_button"
              variant="outline"
              size="sm"
              className="gap-2 border-border hover:border-primary/40 transition-smooth"
              onClick={async () => {
                if (navigator.share) {
                  await navigator.share({
                    title: "Secure Message",
                    url: accessLink,
                  });
                } else {
                  handleCopy();
                }
              }}
            >
              <Share2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Security notice */}
        <div className="flex gap-2 p-3 rounded-sm bg-muted/40 border border-border">
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            This link can only be accessed{" "}
            <strong className="text-foreground">once</strong> by the intended
            recipient. After viewing, the message and link will be permanently
            deleted. Do not share publicly.
          </p>
        </div>
      </div>
    </div>
  );
}
