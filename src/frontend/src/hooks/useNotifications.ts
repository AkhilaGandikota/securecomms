/**
 * useNotifications — fetches and manages in-app notifications.
 * Polls for new notifications and provides mark-as-read mutation.
 */

import { createActor } from "@/backend";
import type { Notification } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** Fetch the current user's notifications */
export function useNotifications() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const query = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyNotifications();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 20_000, // Poll every 20s for new notifications
  });

  const unreadCount = (query.data ?? []).filter((n) => !n.isRead).length;

  return {
    ...query,
    unreadCount,
  };
}

/** Mutation to mark a notification as read */
export function useMarkNotificationRead() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notifId: string) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.markNotificationRead(notifId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

/** Hook that provides unread notification count for badges */
export function useUnreadNotificationCount(): number {
  const { unreadCount } = useNotifications();
  return unreadCount;
}
