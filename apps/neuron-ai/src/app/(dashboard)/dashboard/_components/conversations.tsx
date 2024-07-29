"use client";
import { Avatar, Button, List, TextInput, ToggleSwitch } from "flowbite-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { RiAttachment2 } from "react-icons/ri";
import { HiOutlineArrowRight } from "react-icons/hi2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { DomainType } from "@/actions/domains/types";
import { FormEvent, useEffect, useRef, useState } from "react";
import { log } from "console";
import { getAllChatRooms, toggleRealtime } from "@/actions/chatRoom";
import { chatRoomType } from "@/actions/chatRoom/types";
import { BsPerson } from "react-icons/bs";
import { AlertCircle, AlertTriangle, Bold, Lock } from "lucide-react";
import useWebsocket from "@/hooks/useWebsocket";
import { useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { chatRoomAtom, store, useChatMessages, useChatRoom } from "@repo/store";
import { Toggle } from "@/components/ui/toggle";
import { getChatRoomMessages } from "@/actions/chatMessage";
import { useRouter } from "next13-progressbar";

interface ConversationProps {
  domains: DomainType[] | undefined;
}

export default function Conversation({ domains }: ConversationProps) {
  const { sendMessage, isConnected, error, data } = useWebsocket(
    "ws://localhost:8000"
  );
  const [mainTab, setMainTab] = useState<string>("unread");
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [realTime, setRealTime] = useState(false);
  const [activeChatRoom, setActiveChatroom] = useState<chatRoomType | null>(
    null
  );
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const { isSignedIn, user, isLoaded } = useUser();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { chatRooms, setChatRooms } = useChatRoom();
  const { chatMessages, setChatMessages } = useChatMessages();

  async function getChatRooms() {
    sendMessage({
      type: "REALTIME_CHATROOMS",
      payload: {
        activeTab,
      },
    });
  }

  useEffect(() => {
    if (activeTab === null || mainTab !== "unread") return;
    console.log(activeTab, mainTab);

    getChatRooms();
  }, [activeTab, mainTab]);

  useEffect(() => {
    console.log(data);
    if (data === null) return;
    if (data.type === "REALTIME_CHATROOMS") {
      setChatRooms(data.payload);
    }
    if (data.type === "ADD_CHAT") {
      setChatMessages([...chatMessages, data.payload]);
    }
  }, [data, chatMessages, chatRooms, setChatRooms, setChatMessages]);

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    const message = inputRef.current?.value;
    inputRef.current!.value = "";

    sendMessage({
      type: "SEND_MESSAGE",
      payload: {
        userId: user?.id,
        roomId: activeChatRoom?.id,
        message,
        role: "assistant",
      },
    });
  }

  async function handleTabChange(e: string) {
    setChatMessages([]);
    setActiveTab(e);

    const res = await getAllChatRooms(e);

    if (res?.status === 200) {
      console.log(res);

      setChatRooms(res?.rooms as chatRoomType[]);
    }
  }

  function handleMainTabChange(e: string) {
    setMainTab(e);
    setChatRooms([]);
    setActiveChatroom(null);
  }

  return (
    <section className="flex my-4 items-start gap-4">
      <Tabs
        onValueChange={handleMainTabChange}
        defaultValue="unread"
        className="flex-[0.6]"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="unread">Live</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
        </TabsList>
        <TabsContent value="unread">
          <Select
            // defaultValue={activeTab as string}
            onValueChange={(e) => setActiveTab(e)}
          >
            <SelectTrigger className="w-full outline-none border">
              <SelectValue placeholder={"Select a Domain"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Domains</SelectLabel>

                {domains &&
                  domains?.length > 0 &&
                  domains?.map((domain) => (
                    <SelectItem key={domain.slug} value={domain.slug}>
                      {domain.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <List
            unstyled
            className="max-w-md divide-y h-[30rem] no-visible-scrollbar overflow-scroll  my-2 divide-gray-200 dark:divide-gray-700"
          >
            {!isLoadingMessages &&
              chatRooms &&
              chatRooms.map((room: chatRoomType) => {
                return (
                  <List.Item
                    key={room.id}
                    onClick={async () => {
                      setActiveChatroom(room);

                      setIsLoadingMessages(true);

                      const fetchMessages = await getChatRoomMessages(room.id);

                      if (fetchMessages?.status === 200) {
                        console.log(fetchMessages);

                        setChatMessages(fetchMessages.messages as any[]);
                      }
                      setIsLoadingMessages(false);

                      sendMessage({
                        type: "JOIN_ROOM",
                        payload: {
                          name: user?.fullName,
                          userId: user?.id,
                          roomId: room.id,
                          role: "assistant",
                        },
                      });
                    }}
                    className={`py-3 px-3 ${activeChatRoom?.id === room.id && "dark:bg-gray-700 bg-gray-200"} rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer sm:pb-4`}
                  >
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <BsPerson className="w-8 h-auto" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          Anonymous
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          I want to talk to your manager
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <AlertCircle className="stroke-yellow-300" />
                      </div>
                    </div>
                  </List.Item>
                );
              })}
          </List>
        </TabsContent>

        <TabsContent value="all">
          <Select
            // defaultValue={activeTab as string}
            onValueChange={handleTabChange}
          >
            <SelectTrigger className="w-full outline-none border">
              <SelectValue placeholder={"Select a Domain"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Domains</SelectLabel>
                {domains &&
                  domains?.map((domain) => {
                    return (
                      <SelectItem key={domain.slug} value={domain.slug}>
                        {" "}
                        {domain.name}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <List
            unstyled
            className="max-w-md divide-y no-visible-scrollbar overflow-scroll h-[30rem] my-2 divide-gray-200 dark:divide-gray-700"
          >
            {chatRooms &&
              chatRooms.map((room: chatRoomType) => {
                return (
                  <List.Item
                    key={room.id}
                    onClick={async () => {
                      setActiveChatroom(room);

                      setIsLoadingMessages(true);

                      const fetchMessages = await getChatRoomMessages(room.id);

                      if (fetchMessages?.status === 200) {
                        console.log(fetchMessages);

                        setChatMessages(fetchMessages.messages as any[]);
                      }
                      setIsLoadingMessages(false);
                    }}
                    className={`py-3 px-3 ${activeChatRoom?.id === room.id && "dark:bg-gray-700 bg-gray-200"} rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer sm:pb-4`}
                  >
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <BsPerson className="w-8 h-auto" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          Anonymous
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          I want to talk to your manager
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <AlertCircle className="stroke-yellow-300" />
                      </div>
                    </div>
                  </List.Item>
                );
              })}
          </List>
        </TabsContent>
      </Tabs>

      <div className="flex-1 border relative bg-gray-200 overflow-hidden dark:bg-gray-800 rounded-xl">
        {!activeChatRoom && (
          <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center z-50 backdrop-blur-sm bg-black/20">
            <div className="text-3xl font-[500] flex flex-col gap-4 items-center uppercase w-1/2 text-center">
              <Lock className="h-10 w-10" />
              <h3> Select a Conversation to view chats</h3>
            </div>
          </div>
        )}
        <div className="h-[36rem] relative ">
          <div className="bg-slate-100 flex items-center  dark:bg-gray-900  capitalize p-2">
            <h4 className="truncate text-sm font-medium text-gray-500 dark:text-white">
              {isLoadingMessages ? "loading chats..." : "Anonymous User"}
            </h4>
            {mainTab === "unread" && (
              <ToggleSwitch
                className="ml-auto "
                checked={activeChatRoom?.live as boolean}
                label="Toggle Realtime"
                onChange={async (e) => {
                  const res = await toggleRealtime(
                    activeChatRoom?.id as number,
                    e
                  );
                  if (res?.status === 204) {
                    setActiveChatroom({
                      ...activeChatRoom,
                      live: e,
                    } as chatRoomType);

                    let liveFilteredChatRooms = chatRooms.filter(
                      (room) => room.id !== activeChatRoom?.id
                    );

                    setChatRooms(liveFilteredChatRooms);
                    setActiveChatroom(null);
                    setChatMessages([]);
                  }
                }}
              />
            )}
          </div>
          <div className="h-full">
            <div className="h-[80%] overflow-scroll no-visible-scrollbar px-4">
              {!isLoadingMessages &&
                chatMessages.map((message) => {
                  console.log(message);

                  return (
                    <div
                      key={message.id}
                      className={`my-2 ${message.role === "assistant" && "ml-auto"} dark:bg-gray-900 bg-gray-300 p-2.5 rounded-xl max-w-max `}
                    >
                      <span className="text-sm ">{message.message}</span>
                    </div>
                  );
                })}
            </div>
          </div>
          <form
            onSubmit={submitHandler}
            className="absolute  p-2 bottom-0 w-[100%] gap-2 flex items-center left-1/2 -translate-x-1/2"
          >
            <div className="flex-1 flex ">
              <TextInput
                type="text"
                ref={inputRef}
                className="flex-1 outline-none border-none"
                placeholder="Type Your Message...."
                required
              />
              <RiAttachment2 className="w-6 h-6 scale-[2] flex-[0.02] -translate-x-10 translate-y-2" />
            </div>
            <Button type="submit" outline>
              <HiOutlineArrowRight className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
