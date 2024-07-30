import z from "zod";

export enum supportedMessage {
  joinRoom = "JOIN_ROOM",
  sendMessage = "SEND_MESSAGE",
  getRooms = "REALTIME_CHATROOMS",
  leaveRoom = "LEAVE_ROOM",
}

export type incomingMessage =
  | {
      type: supportedMessage.joinRoom;
      payload: initMessageType;
    }
  | { type: supportedMessage.sendMessage; payload: userMessageType }
  | { type: supportedMessage.getRooms; payload: { activeTab: string } }
  | { type: supportedMessage.leaveRoom; payload: leavePayload };

export const initMessage = z.object({
  name: z.string(),
  userId: z.string(),
  roomId: z.string(),
});

export const userMessage = z.object({
  userId: z.string(),
  roomId: z.string(),
  message: z.string(),
  role: z.string(),
});

export const leavePayload = z.object({
  userId: z.string(),
  roomId: z.string(),
});

export type leavePayload = z.infer<typeof leavePayload>;

export type initMessageType = z.infer<typeof initMessage>;
export type userMessageType = z.infer<typeof userMessage>;
