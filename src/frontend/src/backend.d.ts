import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Result_2 = {
    __kind__: "ok";
    ok: BehaviorProfile;
} | {
    __kind__: "err";
    err: string;
};
export type Result_6 = {
    __kind__: "ok";
    ok: MessageView;
} | {
    __kind__: "err";
    err: string;
};
export interface AccessLog {
    id: string;
    action: string;
    messageId: string;
    accessorId: Principal;
    timestamp: bigint;
    deviceFingerprint: string;
}
export type Result_5 = {
    __kind__: "ok";
    ok: Array<MessageSummary>;
} | {
    __kind__: "err";
    err: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
};
export type Result_4 = {
    __kind__: "ok";
    ok: Array<BehaviorProfile>;
} | {
    __kind__: "err";
    err: string;
};
export interface FileAttachment {
    blob: ExternalBlob;
    fileName: string;
    fileSize: bigint;
    fileType: string;
    storageId: string;
}
export type Result = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: Array<AccessLog>;
} | {
    __kind__: "err";
    err: string;
};
export interface BehaviorProfile {
    flagReason?: string;
    userId: Principal;
    accessAttempts: bigint;
    flaggedAttempts: bigint;
    deviceFingerprints: Array<string>;
    lastAccessTime: bigint;
    isFlagged: boolean;
}
export interface Notification {
    id: string;
    messageId: string;
    createdAt: bigint;
    isRead: boolean;
    message: string;
    recipientId: Principal;
}
export interface MessageView {
    id: string;
    encryptedContent: string;
    contentKey: string;
    accessedAt: bigint;
    fileAttachment?: FileAttachment;
    senderId: Principal;
}
export interface MessageSummary {
    id: string;
    expiresAt: bigint;
    isExpired: boolean;
    isViewed: boolean;
    createdAt: bigint;
    viewedAt?: bigint;
    accessToken: string;
    recipientId: Principal;
    senderId: Principal;
    hasAttachment: boolean;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    accessMessage(accessToken: string, deviceFingerprint: string): Promise<Result_6>;
    adminGetAllAccessLogs(): Promise<Result_3>;
    adminGetAllMessages(): Promise<Result_5>;
    adminGetFlaggedUsers(): Promise<Result_4>;
    adminSetAdminPrincipal(newAdmin: Principal): Promise<Result_1>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteExpiredMessages(): Promise<bigint>;
    getAccessLogs(messageId: string): Promise<Result_3>;
    getCallerUserRole(): Promise<UserRole>;
    getMyBehaviorProfile(): Promise<Result_2>;
    getMyInbox(): Promise<Array<MessageSummary>>;
    getMyNotifications(): Promise<Array<Notification>>;
    getMySentMessages(): Promise<Array<MessageSummary>>;
    isCallerAdmin(): Promise<boolean>;
    markNotificationRead(notifId: string): Promise<Result_1>;
    sendMessage(recipientId: Principal, encryptedContent: string, contentKey: string, expiresInSeconds: bigint, fileAttachment: FileAttachment | null): Promise<Result>;
}
