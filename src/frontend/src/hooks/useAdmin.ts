/**
 * useAdmin — React Query hooks for admin dashboard operations.
 * Calls adminGetAllMessages, adminGetAllAccessLogs, adminGetFlaggedUsers,
 * adminSetAdminPrincipal, and deleteExpiredMessages via the backend actor.
 */

import { createActor } from "@/backend";
import type { AccessLog, BehaviorProfile, MessageSummary } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Queries ────────────────────────────────────────────────────────────────────

/** Fetches all messages (admin only) */
export function useAdminMessages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MessageSummary[]>({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.adminGetAllMessages();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

/** Fetches all access logs (admin only) */
export function useAdminAccessLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AccessLog[]>({
    queryKey: ["admin", "accessLogs"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.adminGetAllAccessLogs();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

/** Fetches flagged user behavior profiles (admin only) */
export function useAdminFlaggedUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BehaviorProfile[]>({
    queryKey: ["admin", "flaggedUsers"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.adminGetFlaggedUsers();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Mutations ──────────────────────────────────────────────────────────────────

/** Deletes all expired messages, returns count of deleted */
export function useDeleteExpiredMessages() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<bigint, Error>({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteExpiredMessages();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
    },
  });
}

/** Sets a new admin principal */
export function useSetAdminPrincipal() {
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, string>({
    mutationFn: async (principalText: string) => {
      if (!actor) throw new Error("Actor not available");
      const principal = Principal.fromText(principalText);
      const result = await actor.adminSetAdminPrincipal(principal);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
  });
}
