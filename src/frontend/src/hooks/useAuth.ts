/**
 * useAuth — wraps Internet Identity auth state and user role from the backend.
 * Provides a single hook for auth status, principal, role, and admin checks.
 */

import { createActor } from "@/backend";
import type { UserRole } from "@/types";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  // Fetch caller's role from backend
  const roleQuery = useQuery<UserRole>({
    queryKey: ["callerUserRole"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Check if caller is admin
  const adminQuery = useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const handleLogin = () => {
    if (!isAuthenticated) login();
  };

  const handleLogout = () => {
    clear();
    // Clear all cached query data on logout
    queryClient.clear();
  };

  const principal = identity?.getPrincipal();
  const principalText = principal?.toString() ?? null;

  return {
    /** True when user is logged in via Internet Identity */
    isAuthenticated,
    /** True while AuthClient is loading from IndexedDB */
    isInitializing,
    /** True while II popup is open */
    isLoggingIn,
    /** The user's principal string, or null if not authenticated */
    principalText,
    /** The user's role from the backend */
    userRole: roleQuery.data,
    /** True if caller has admin role */
    isAdmin: adminQuery.data ?? false,
    /** True while role is loading */
    isRoleLoading: roleQuery.isLoading || actorFetching,
    /** Trigger Internet Identity login popup */
    login: handleLogin,
    /** Log out and clear all cached data */
    logout: handleLogout,
  };
}
