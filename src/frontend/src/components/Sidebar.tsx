/**
 * Sidebar — main navigation sidebar.
 * Shows nav items with icons, active state, admin section, and notification badge.
 */

import { useAuth } from "@/hooks/useAuth";
import { useUnreadNotificationCount } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { truncatePrincipal } from "@/types";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Link2,
  Lock,
  LogOut,
  Send,
  ShieldAlert,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  adminOnly?: boolean;
}

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { principalText, isAdmin, logout } = useAuth();
  const unreadCount = useUnreadNotificationCount();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      label: "Send Message",
      href: "/send",
      icon: <Send className="w-4 h-4" />,
    },
    {
      label: "Access Link",
      href: "/access",
      icon: <Link2 className="w-4 h-4" />,
    },
    {
      label: "Admin",
      href: "/admin",
      icon: <ShieldAlert className="w-4 h-4" />,
      adminOnly: true,
    },
  ];

  const visibleItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <aside
      className="flex flex-col h-full bg-sidebar border-r border-sidebar-border w-60"
      aria-label="Sidebar navigation"
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-7 h-7 rounded-sm bg-primary/10 border border-primary/30">
          <Lock className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-sidebar-foreground leading-tight truncate">
            SecureComm
          </p>
          <p className="text-[10px] text-muted-foreground font-mono tracking-wider">
            ISCSBAC
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 py-3 px-2 space-y-0.5"
        aria-label="Main navigation"
      >
        {visibleItems.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== "/" && currentPath.startsWith(item.href));

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-smooth",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-sidebar-primary/10 text-sidebar-primary font-medium border-l-2 border-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <span
                className={cn(
                  isActive ? "text-sidebar-primary" : "text-muted-foreground",
                )}
              >
                {item.icon}
              </span>
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  aria-label={`${item.badge} unread`}
                  className="min-w-[20px] h-5 bg-primary text-primary-foreground text-[10px] font-mono font-bold rounded-full flex items-center justify-center px-1"
                >
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User info + logout */}
      <div className="px-3 py-3 border-t border-sidebar-border space-y-1">
        {principalText && (
          <div className="px-3 py-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              Principal
            </p>
            <p
              title={principalText}
              className="text-xs font-mono text-sidebar-foreground truncate"
            >
              {truncatePrincipal(principalText)}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={logout}
          data-ocid="nav.logout_button"
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2 rounded-sm text-sm",
            "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
            "transition-smooth focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring",
          )}
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
