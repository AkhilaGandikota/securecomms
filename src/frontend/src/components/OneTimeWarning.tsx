/**
 * OneTimeWarning — confirmation overlay shown before revealing a one-time message.
 * The recipient must explicitly confirm before the message is accessed and destroyed.
 */

import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Eye, Shield } from "lucide-react";
import { motion } from "motion/react";

interface OneTimeWarningProps {
  /** Called when user confirms they want to proceed and view the message */
  onProceed: () => void;
  /** Called when user wants to go back without accessing the message */
  onBack: () => void;
  /** Whether the access mutation is currently loading */
  isLoading?: boolean;
}

export function OneTimeWarning({
  onProceed,
  onBack,
  isLoading,
}: OneTimeWarningProps) {
  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      data-ocid="one_time_warning.panel"
    >
      {/* Radial glow effect behind the card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-destructive/5 blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Warning card */}
        <div className="border border-destructive/40 rounded-sm bg-card overflow-hidden shadow-2xl">
          {/* Red top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-destructive/60 via-destructive to-destructive/60" />

          <div className="p-8">
            {/* Icon cluster */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-sm bg-destructive/10 border border-destructive/30 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-destructive" />
                </div>
                {/* Pulsing ring */}
                <span className="absolute inset-0 rounded-sm border border-destructive/40 animate-ping opacity-30" />
              </div>
            </div>

            {/* Warning header */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-display font-semibold text-foreground tracking-tight mb-2">
                One-Time Message
              </h1>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-destructive/10 border border-destructive/25 text-destructive text-xs font-mono mb-4">
                <Shield className="w-3 h-3" />
                IRREVERSIBLE ACTION
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This message can only be viewed{" "}
                <span className="text-foreground font-semibold">ONCE</span>.
                Once you proceed, it will be{" "}
                <span className="text-destructive font-semibold">
                  permanently deleted
                </span>{" "}
                from the system.
              </p>
            </div>

            {/* Warning bullets */}
            <ul className="space-y-2.5 mb-7 border border-border rounded-sm p-4 bg-background/50">
              {[
                "The message cannot be recovered after viewing",
                "Forwarding or copying is strictly prohibited",
                "Your device fingerprint will be logged",
                "Suspicious activity will trigger an alert",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-xs text-muted-foreground"
                >
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* "Eyes only" notice */}
            <p className="text-center text-xs text-muted-foreground font-mono mb-6 flex items-center justify-center gap-1.5">
              <Eye className="w-3 h-3 text-primary" />
              This message is for your eyes only
            </p>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <Button
                variant="destructive"
                className="w-full font-semibold tracking-wide transition-smooth"
                onClick={onProceed}
                disabled={isLoading}
                data-ocid="one_time_warning.confirm_button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-destructive-foreground border-t-transparent rounded-full animate-spin" />
                    Accessing…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Proceed to View
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground transition-smooth"
                onClick={onBack}
                disabled={isLoading}
                data-ocid="one_time_warning.cancel_button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom caption */}
        <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
          Powered by end-to-end encryption
        </p>
      </motion.div>
    </div>
  );
}
