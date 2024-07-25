import { Provider, createStore, useAtom } from "jotai";
import {
  chatMessagesAtom,
  chatRoomAtom,
  loadingAtom,
  isRealTimeAtom,
} from "./chat";

export { chatMessagesAtom, chatRoomAtom, loadingAtom, isRealTimeAtom };

export const store = createStore();

store.set(chatMessagesAtom, []);
store.set(chatRoomAtom, []);
store.set(loadingAtom, false);
store.set(isRealTimeAtom, false);

export const useChatRoom = () => {
  const [chatRooms, setChatRooms] = useAtom(chatRoomAtom, { store: store });

  return { chatRooms, setChatRooms };
};

export const useChatMessages = () => {
  const [chatMessages, setChatMessages] = useAtom(chatMessagesAtom, {
    store: store,
  });

  return { chatMessages, setChatMessages };
};

export const JotaiProvider = Provider;
