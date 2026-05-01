import { N as useActor, O as useQuery, s as useQueryClient, Q as useMutation, a8 as __vitePreload, U as createActor, T as Principal, a9 as JSON_KEY_PRINCIPAL, aa as base32Decode, ab as base32Encode, ac as getCrc32 } from "./index-B_I069t4.js";
function useInbox() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["inbox"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyInbox();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 3e4
    // Poll every 30s for new messages
  });
}
function useSentMessages() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["sentMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMySentMessages();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 3e4
  });
}
function useSendMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not available");
      const { Principal: Princ } = await __vitePreload(async () => {
        const { Principal: Princ2 } = await Promise.resolve().then(() => index);
        return { Principal: Princ2 };
      }, true ? void 0 : void 0);
      const result = await actor.sendMessage(
        Princ.fromText(params.recipientId),
        params.encryptedContent,
        params.contentKey,
        params.expiresInSeconds,
        params.fileAttachment
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentMessages"] });
    }
  });
}
function useAccessMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.accessMessage(
        params.accessToken,
        params.deviceFingerprint
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inbox"] });
    }
  });
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JSON_KEY_PRINCIPAL,
  Principal,
  base32Decode,
  base32Encode,
  getCrc32
}, Symbol.toStringTag, { value: "Module" }));
export {
  useSentMessages as a,
  useAccessMessage as b,
  useSendMessage as c,
  useInbox as u
};
