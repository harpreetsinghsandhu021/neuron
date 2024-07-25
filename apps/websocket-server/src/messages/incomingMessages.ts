import z from "zod";

export enum supportedMessage {
  joinRoom = "JOIN_ROOM",
  sendMessage = "SEND_MESSAGE",
  getRooms = "REALTIME_CHATROOMS",
}

export type incomingMessage =
  | {
      type: supportedMessage.joinRoom;
      payload: initMessageType;
    }
  | { type: supportedMessage.sendMessage; payload: userMessageType }
  | { type: supportedMessage.getRooms; payload: { activeTab: string } };

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

export type initMessageType = z.infer<typeof initMessage>;
export type userMessageType = z.infer<typeof userMessage>;
