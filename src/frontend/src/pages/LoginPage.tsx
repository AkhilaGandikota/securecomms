/**
 * LoginPage — landing page for unauthenticated users.
 * Showcases the app features and provides Internet Identity login.
 */

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Clock,
  Eye,
  Fingerprint,
  Lock,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: <Eye className="w-4 h-4" />,
    title: "One-Time Access",
    desc: "Messages self-destruct after a single viewing — no copies, no forwarding.",
  },
  {
    icon: <Clock className="w-4 h-4" />,
    title: "Time Expiration",
    desc: "Set a custom expiry window. Unread messages auto-delete when time runs out.",
  },
  {
    icon: <Fingerprint className="w-4 h-4" />,
    title: "Behavior Analysis",
    desc: "Device fingerprinting and anomaly detection flag suspicious access patterns.",
  },
  {
    icon: <Lock className="w-4 h-4" />,
    title: "End-to-End Secure",
    desc: "All message content is encrypted. Only the intended recipient can access it.",
  },
  {
    icon: <Shield className="w-4 h-4" />,
    title: "Role-Based Access",
    desc: "Admins can monitor all activity, review flagged users, and manage access.",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "Instant Notifications",
    desc: "Recipients are alerted the moment a secure message is shared with them.",
  },
];

export default function LoginPage() {
  const { login, isInitializing, isLoggingIn, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-primary/10 border border-primary/30">
            <Lock className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              SecureComm
            </p>
            <p className="text-[10px] text-muted-foreground font-mono tracking-wider">
              ISCSBAC
            </p>
          </div>
        </div>

        <Button
          onClick={login}
          disabled={isInitializing || isLoggingIn || isAuthenticated}
          data-ocid="login.primary_button"
          className="gap-2"
          size="sm"
        >
          {isInitializing
            ? "Loading..."
            : isLoggingIn
              ? "Authenticating..."
              : "Sign In"}
          <ChevronRight className="w-3 h-3" />
        </Button>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-xl"
        >
          {/* Badge */}
          <span className="badge-security mb-6 inline-block">
            BEHAVIOR-BASED ACCESS CONTROL
          </span>

          <h1 className="text-4xl font-display font-bold text-foreground leading-tight mb-4">
            Intelligent Secure
            <br />
            <span className="text-primary">Communication</span> System
          </h1>

          <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
            Share sensitive messages and documents with cryptographic security,
            one-time access controls, and real-time behavior monitoring.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={login}
              disabled={isInitializing || isLoggingIn || isAuthenticated}
              data-ocid="login.hero_primary_button"
              className="gap-2 min-w-[180px]"
            >
              <Shield className="w-4 h-4" />
              {isInitializing
                ? "Initializing..."
                : isLoggingIn
                  ? "Connecting..."
                  : "Get Started Securely"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={login}
              disabled={isInitializing || isLoggingIn || isAuthenticated}
              data-ocid="login.hero_secondary_button"
              className="gap-2 border-border"
            >
              Sign in with Internet Identity
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features grid */}
      <section className="bg-muted/30 border-t border-border px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest text-center mb-8">
            Security Architecture
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className={cn(
                  "bg-card border border-border rounded-sm p-4",
                  "hover:border-primary/30 transition-smooth",
                )}
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="text-primary">{feature.icon}</span>
                  <h3 className="text-sm font-semibold text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-center px-4 py-3 bg-card border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
