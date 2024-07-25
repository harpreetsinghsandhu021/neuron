import { ChatMessage, ChatRoom } from "@prisma/client";
import { atom } from "jotai";

export const chatMessagesAtom = atom<ChatMessage[]>([]); // Array of ChatMessage objects
export const chatRoomAtom = atom<ChatRoom[]>([]); // Single ChatRoom object or null
export const loadingAtom = atom<boolean>(false); // Boolean for loading state
export const isRealTimeAtom = atom<boolean>(false);
