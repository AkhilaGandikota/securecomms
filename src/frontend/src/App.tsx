/**
 * App.tsx — router + providers ONLY.
 * Sets up TanStack Router with protected routes gated on Internet Identity auth.
 */

import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import LoginPage from "@/pages/LoginPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

// ─── Root route ────────────────────────────────────────────────────────────────

function RootLayout() {
  const { isAuthenticated, isInitializing } = useAuth();

  // While AuthClient is loading from IndexedDB, show a minimal loading screen
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-primary/10 border border-primary/30">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="space-y-2 w-48">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Outlet />;
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

// ─── Authenticated routes ───────────────────────────────────────────────────────

// Lazy-loaded page components
const DashboardPage = () =>
  import("@/pages/DashboardPage").then((m) => ({ default: m.default }));
const SendMessagePage = () =>
  import("@/pages/SendMessagePage").then((m) => ({ default: m.default }));
const AccessLinkPage = () =>
  import("@/pages/AccessLinkPage").then((m) => ({ default: m.default }));
const MessageAccessPage = () =>
  import("@/pages/MessageAccessPage").then((m) => ({ default: m.default }));
const AdminPage = () =>
  import("@/pages/AdminPage").then((m) => ({ default: m.default }));

// Route definitions
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  component: () => null,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => {
    const LazyDashboard = React.lazy(DashboardPage);
    return (
      <React.Suspense fallback={<PageSkeleton />}>
        <LazyDashboard />
      </React.Suspense>
    );
  },
});

const sendRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/send",
  component: () => {
    const LazySend = React.lazy(SendMessagePage);
    return (
      <React.Suspense fallback={<PageSkeleton />}>
        <LazySend />
      </React.Suspense>
    );
  },
});

const accessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/access",
  component: () => {
    const LazyAccess = React.lazy(AccessLinkPage);
    return (
      <React.Suspense fallback={<PageSkeleton />}>
        <LazyAccess />
      </React.Suspense>
    );
  },
});

const messageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/message/$token",
  component: () => {
    const LazyMessage = React.lazy(MessageAccessPage);
    return (
      <React.Suspense fallback={<PageSkeleton />}>
        <LazyMessage />
      </React.Suspense>
    );
  },
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => {
    const LazyAdmin = React.lazy(AdminPage);
    return (
      <React.Suspense fallback={<PageSkeleton />}>
        <LazyAdmin />
      </React.Suspense>
    );
  },
});

// ─── Page skeleton ──────────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <Layout>
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
        <div className="space-y-3 mt-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-sm" />
          ))}
        </div>
      </div>
    </Layout>
  );
}

// ─── Router ─────────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  sendRoute,
  accessRoute,
  messageRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import React from "react";

export default function App() {
  return <RouterProvider router={router} />;
}
