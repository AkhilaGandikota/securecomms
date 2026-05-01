/**
 * DestroyedTombstone — shown after a one-time message has been viewed and destroyed.
 * Serves as the final, permanent state with no recovery path.
 */

import { Button } from "@/components/ui/button";
import { Flame, LayoutDashboard, ShieldOff } from "lucide-react";
import { motion } from "motion/react";

interface DestroyedTombstoneProps {
  /** Timestamp of when the message was accessed */
  accessedAt?: string;
  /** Navigate back to dashboard */
  onGoHome: () => void;
}

export function DestroyedTombstone({
  accessedAt,
  onGoHome,
}: DestroyedTombstoneProps) {
  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      data-ocid="destroyed_tombstone.panel"
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-muted/20 blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Tombstone icon */}
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.15,
            duration: 0.4,
            type: "spring",
            bounce: 0.3,
          }}
        >
          <div className="w-20 h-20 rounded-sm bg-muted/20 border border-border flex items-center justify-center relative">
            <ShieldOff className="w-8 h-8 text-muted-foreground" />
            <Flame className="w-4 h-4 text-destructive/60 absolute -bottom-1 -right-1" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <h1 className="text-xl font-display font-semibold text-foreground tracking-tight mb-2">
            Message Destroyed
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto mb-6">
            This message has been permanently deleted from all systems. It can
            never be recovered or viewed again.
          </p>
        </motion.div>

        {/* Divider line */}
        <div className="w-full border-t border-border mb-6" />

        {/* Access receipt */}
        {accessedAt && (
          <motion.div
            className="mb-6 px-4 py-3 rounded-sm bg-muted/30 border border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.35 }}
          >
            <p className="text-xs font-mono text-muted-foreground">
              <span className="text-foreground/50 uppercase tracking-widest text-[10px] block mb-1">
                Accessed at
              </span>
              {accessedAt}
            </p>
          </motion.div>
        )}

        {/* Mono badge */}
        <motion.div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-muted/20 border border-border text-muted-foreground text-xs font-mono mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
          ONE-TIME ACCESS CONSUMED
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.35 }}
        >
          <Button
            variant="outline"
            className="w-full border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth"
            onClick={onGoHome}
            data-ocid="destroyed_tombstone.button"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
