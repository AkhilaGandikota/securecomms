/**
 * Layout — main application shell.
 * Sidebar + top bar + content area. Used by all authenticated pages.
 * Unauthenticated pages render without this layout.
 */

import { UserRole } from "@/backend";
import { NotificationBell } from "@/components/NotificationBell";
import { Sidebar } from "@/components/Sidebar";
import { RoleBadge } from "@/components/StatusBadge";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  /** Page title shown in the top bar */
  title?: string;
  /** Optional actions rendered in the top bar right area */
  topBarActions?: React.ReactNode;
}

export function Layout({ children, title, topBarActions }: LayoutProps) {
  const { userRole } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const roleLabel =
    userRole === UserRole.admin
      ? "admin"
      : userRole === UserRole.user
        ? "user"
        : "guest";

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <dialog
          open
          className="fixed inset-0 z-40 md:hidden m-0 p-0 max-w-full max-h-full w-full h-full bg-transparent border-0"
          aria-label="Mobile navigation"
        >
          {/* Backdrop */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Close navigation"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-default"
            onClick={() => setMobileSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileSidebarOpen(false)}
          />
          {/* Sidebar panel */}
          <div className="relative z-50 h-full">
            <Sidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </dialog>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 h-14 bg-card border-b border-border flex-shrink-0">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open navigation"
            data-ocid="nav.mobile_menu_button"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Page title */}
          {title && (
            <h1 className="text-sm font-semibold text-foreground truncate flex-1">
              {title}
            </h1>
          )}
          {!title && <div className="flex-1" />}

          {/* Top bar actions */}
          {topBarActions && (
            <div className="flex items-center gap-2">{topBarActions}</div>
          )}

          {/* Role badge */}
          {userRole !== undefined && (
            <RoleBadge role={roleLabel as "admin" | "user" | "guest"} />
          )}

          {/* Notification bell */}
          <NotificationBell />
        </header>

        {/* Scrollable content area */}
        <main
          className={cn(
            "flex-1 overflow-y-auto bg-background",
            "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
          )}
        >
          {children}
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-center px-4 py-2 bg-card border-t border-border flex-shrink-0">
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

      <Toaster />
    </div>
  );
}
