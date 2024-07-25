export enum supportedMessage {
  AddChat = "ADD_CHAT",
  UpdateChat = "UPDATE_CHAT",
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
    };
