"use client";

import { ChatbotType } from "@/actions/chatbot/types";
import { FormEvent, useEffect, useState } from "react";
import { createChatRoom, fetchDomainChatbot } from "@/actions/chatbot";
import { onStartChatting } from "@/actions/bot";
import analyseSentiment from "@/lib/analyzeSentiment";
import { useRecoilState } from "recoil";
import { chatRoomAtom, isRealTimeAtom, store, useChatRoom } from "@repo/store";
import useWebsocket from "./useWebSocket";
import { v4 as uuidv4 } from "uuid";
import { useAtom } from "jotai";

type name = string;

export interface message {
  role: "AI" | "You" | name;
  content: string;
  link?: string;
}

export interface domain {
  id: number;
  name: string;
  icon: string;
  slug: string;
  userId: number;
  campaignId: number | null;
}

export interface helpDesk {
  question: string;
  answer: string;
}

export interface chatRoomSchema {
  id: number;
  live: boolean;
  mailed: boolean;
  createdAt: string;
  updatedAt: string;
  customerId: number;
  domainId: number;
}

let limitConnections = 0;
let userId = uuidv4();

export default function useChatBot() {
  const [currBot, setCurrBot] = useState<ChatbotType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [botWindowOpened, setBotWindowOpened] = useState<boolean>(false);
  const [chat, setChat] = useState<message[]>([]);
  const [domain, setCurrDomain] = useState<domain | null | undefined>(null);
  const [helpDesk, setHelpDesk] = useState<helpDesk[] | null | undefined>(null);
  const [responseLoading, setResponseLoading] = useState<boolean>(false);
  const [activeChatRoom, setActiveChatRoom] = useState<any>(null);

  const [isRealTime, setIsRealTime] = useAtom(isRealTimeAtom, { store: store });
  const { chatRooms, setChatRooms } = useChatRoom();

  const { sendMessage, isConnected, error, data } = useWebsocket(
    `${process.env.NEXT_PUBLIC_WS_SERVER}`
  );

  async function getDomainChatbot(id: string) {
    const res = await fetchDomainChatbot(id);

    if (res.status === 200) {
      setCurrBot(res.chatbot as ChatbotType);

      setChat((prevChat) => [
        ...prevChat,
        { content: res.chatbot?.welcomeMessage, role: "AI" } as message,
      ]);

      setHelpDesk(res.helpDeskQuestions);

      setCurrDomain(res.domain);
    }
    setLoading(false);
  }

  useEffect(() => {
    window.onmessage = (e) => {
      let id = e.data;

      if (id) {
        getDomainChatbot(id);
      }
    };
  }, []);

  async function handleRoom() {
    // if (isRealTime) return;
    if (limitConnections === 1) return;

    const res = await createChatRoom(domain?.id as number);

    if (res?.status === 201) {
      // setChatRooms([...chatRooms, res.chatRoom as ChatRoom]);
      console.log([...chatRooms, res?.chatRoom as any]);

      sendMessage({
        type: "JOIN_ROOM",
        payload: {
          name: "realman",
          userId: userId,
          roomId: res.chatRoom?.id,
        },
      });

      sendMessage({
        type: "REALTIME_CHATROOMS",
        payload: {
          activeTab: domain?.slug,
        },
      });

      setActiveChatRoom(res.chatRoom);
      localStorage.setItem("userId", userId);
      localStorage.setItem("isRealTime", `${isRealTime}`);
      localStorage.setItem("chatRoom", JSON.stringify(res.chatRoom));
    }
  }

  useEffect(() => {
    let isRealtimeConn = localStorage.getItem("isRealTime");

    if (isRealtimeConn) {
      // if (isConnected) return;
      console.log(isRealtimeConn);

      let chatRoomData = JSON.parse(localStorage.getItem("chatRoom") as string);
      let userIdData = localStorage.getItem("userId");

      console.log(chatRoomData, userIdData);

      sendMessage({
        type: "JOIN_ROOM",
        payload: {
          name: "realman",
          userId: userIdData,
          roomId: chatRoomData?.id,
        },
      });

      setActiveChatRoom(chatRoomData);
      setIsRealTime(true);
      userId = userIdData as string;

      return;
    }

    if (isRealTime) {
      console.log("running");

      handleRoom();
    }
  }, [isRealTime, isConnected, handleRoom, sendMessage, setIsRealTime]);

  useEffect(() => {
    if (data === null) return;

    if (data.type === "ADD_CHAT") {
      console.log(data);

      // setChat([
      //   ...chat,
      //   { role: data.payload.name, content: data.payload.message },
      // ]);

      setChat((prevChat) => [
        ...prevChat,
        { role: data.payload.name, content: data.payload.message },
      ]);
    }
  }, [data]);

  const onOpenChatBot = () => setBotWindowOpened((prev) => !prev);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const inputEl = document.getElementById(
      "input--messenger"
    )! as HTMLInputElement;

    const userInput = inputEl.value;

    inputEl.value = "";

    if (userInput.length === 0) return;

    console.log(isRealTime);

    if (isRealTime) {
      sendMessage({
        type: "SEND_MESSAGE",
        payload: {
          userId: userId,
          roomId: activeChatRoom?.id,
          message: userInput,
          role: "user",
        },
      });
    } else {
      setResponseLoading(true);
      setChat((prevChat) => [
        ...prevChat,
        { content: userInput, role: "You" } as message,
      ]);

      const { res } = analyseSentiment(userInput);

      if (res) {
        setResponseLoading(true);

        setIsRealTime(true);

        setTimeout(() => {
          setChat((prevChat) => [
            ...prevChat,
            {
              content:
                "I understand this issue requires you to speak with someone directly. Please hold while I connect you to one of our customer experts. (End of the conversation)",
              role: "AI",
            } as message,
          ]);

          setResponseLoading(false);
        }, 3000);

        return;
      }

      const response = await onStartChatting(
        [...chat, { content: userInput, role: "You" } as message],
        domain,
        userInput
      );

      if (response?.status === 200) {
        if (response.response.includes("end of the conversation")) {
          setIsRealTime(true);
        }

        setTimeout(() => {
          setChat((prevChat) => [
            ...prevChat,
            { content: response.response, role: "AI" } as message,
          ]);
          setResponseLoading(false);
        }, 500);
      }
    }
  }

  return {
    currBot,
    domain,
    loading,
    responseLoading,
    onOpenChatBot,
    botWindowOpened,
    helpDesk,
    chat,
    onSubmit,
  };
}
