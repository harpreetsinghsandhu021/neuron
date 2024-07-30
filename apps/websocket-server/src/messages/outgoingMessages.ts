export enum supportedMessage {
  AddChat = "ADD_CHAT",
  UpdateChat = "UPDATE_CHAT",
  leaveRoom = "LEAVE_ROOM",
}

type messagePayload = {
  roomId: string;
  message: string;
  name: string;
  role?: string;
};

export type outgoingMessage =
  | {
      type: supportedMessage.AddChat;
      payload: messagePayload;
    }
  | {
      type: supportedMessage.UpdateChat;
      payload: Partial<messagePayload>;
    }
  | {
      type: supportedMessage.leaveRoom;
      payload: Partial<messagePayload>;
    };
