/**
 * useMessages — inbox and sent message hooks.
 * Wraps actor calls for getMyInbox, getMySentMessages, sendMessage, and accessMessage.
 */

import { createActor } from "@/backend";
import type { FileAttachment, MessageSummary, MessageView } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** Fetch the current user's inbox */
export function useInbox() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<MessageSummary[]>({
    queryKey: ["inbox"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyInbox();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30_000, // Poll every 30s for new messages
  });
}

/** Fetch the current user's sent messages */
export function useSentMessages() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<MessageSummary[]>({
    queryKey: ["sentMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMySentMessages();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30_000,
  });
}

/** Mutation to send a new secure message */
export function useSendMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      recipientId: string;
      encryptedContent: string;
      contentKey: string;
      expiresInSeconds: bigint;
      fileAttachment: FileAttachment | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      // Dynamically import Principal to convert string -> Principal type
      const { Principal: Princ } = await import("@icp-sdk/core/principal");
      const result = await actor.sendMessage(
        Princ.fromText(params.recipientId),
        params.encryptedContent,
        params.contentKey,
        params.expiresInSeconds,
        params.fileAttachment,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok; // Returns the access token
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentMessages"] });
    },
  });
}

/** Mutation to access a message by token (one-time access) */
export function useAccessMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      accessToken: string;
      deviceFingerprint: string;
    }): Promise<MessageView> => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.accessMessage(
        params.accessToken,
        params.deviceFingerprint,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      // Refresh inbox to show updated viewed status
      queryClient.invalidateQueries({ queryKey: ["inbox"] });
    },
  });
}

/** Fetch access logs for a specific message */
export function useMessageAccessLogs(messageId: string | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["accessLogs", messageId],
    queryFn: async () => {
      if (!actor || !messageId) return [];
      const result = await actor.getAccessLogs(messageId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !actorFetching && !!messageId,
  });
}
