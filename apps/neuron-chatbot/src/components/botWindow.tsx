import { ChatbotType } from "@/actions/chatbot/types";
import { domain, helpDesk, message } from "@/hooks/useChatbot";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { BsStars } from "react-icons/bs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TextGenerateEffect } from "./ui/textGenerate";
import { ArrowBigRight, MoveRight, Send, SendHorizonal } from "lucide-react";
import Image from "next/image";
import useWebsocket from "@/hooks/useWebSocket";

interface BotWindowProps {
  currBot: ChatbotType | null;
  chat: message[];
  onSubmit: (e: FormEvent) => void;
  domain: domain | null | undefined;
  helpDesk: helpDesk[] | null | undefined;
  responseLoading: boolean;
}

const BotWindow = ({
  chat,
  helpDesk,
  currBot,
  onSubmit,
  domain,
  responseLoading,
}: BotWindowProps) => {
  const messageWindowRef = useRef<HTMLDivElement | null>(null);
  const [showTextAnimation, setShowTextAnimation] = useState<number>(
    chat.length - 1
  );

  const onScrollToBottom = () => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTo({
        top: messageWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setShowTextAnimation(chat.length - 1);
    onScrollToBottom();
  }, [chat]);

  return (
    <div className="h-[36rem] w-[28rem] border-4 border-black py-4 px-4 mb-32 mr-10 bg-blue-200 relative flex flex-col rounded-xl p-2  ">
      <div className=" border-b pb-2 border-b-white">
        <div className="flex gap-2">
          <div className="bg-white w-12 flex items-center justify-center rounded-full h-12">
            <BsStars className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-2xl capitalize whitespace-nowrap font-[500]">
              Sales Rep - <span className="text-xl"> {domain?.name} </span>
            </h4>
            <h6 className="capitalize">{domain?.name}</h6>
          </div>
        </div>
      </div>
      <Tabs defaultValue="chat" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            onClick={() => {
              setShowTextAnimation(chat.length + 1);
              onScrollToBottom();
            }}
            className="rounded-lg"
            value="chat"
          >
            Chat
          </TabsTrigger>
          {currBot?.helpDesk && (
            <TabsTrigger className="rounded-lg" value="helpDesk">
              Help Desk
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent className="m-0" value="chat">
          <div
            ref={messageWindowRef}
            className="pr-4 no-visible-scrollbar h-[23.5rem] overflow-scroll"
          >
            {chat.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`flex gap-3 my-4 text-gray-600 text-sm flex-1`}
                >
                  <span
                    className={`relative flex  shrink-0 overflow-hidden rounded-full w-8 h-8`}
                  >
                    <div className="rounded-full bg-gray-100 border p-1">
                      {message.role === "AI" ? <IconAi /> : <IconPerson />}
                      {}
                    </div>
                  </span>
                  <div className="leading-relaxed">
                    <span className="block font-bold text-gray-700">
                      {" "}
                      {message.role}
                    </span>

                    {!responseLoading && showTextAnimation === index ? (
                      <TextGenerateEffect words={message.content} />
                    ) : (
                      <p className={``}>{message.content}</p>
                    )}
                  </div>
                </div>
              );
            })}
            {/* {true && (
              <div className="flex gap-3">
                <span
                  className={`relative flex  shrink-0 overflow-hidden rounded-full w-8 h-8`}
                >
                  <div className="rounded-full bg-gray-100 border p-1">
                    <IconAi />
                  </div>
                </span>
                <div className="leading-relaxed w-full">
                  <span className="block font-bold text-gray-700"> AI</span>
                  <span className="text-sm text-gray-700">
                    "Connecting you to a live agent..."{" "}
                  </span>
                </div>
              </div>
            )} */}

            {responseLoading && (
              <div className="flex gap-3">
                <span
                  className={`relative flex  shrink-0 overflow-hidden rounded-full w-8 h-8`}
                >
                  <div className="rounded-full bg-gray-100 border p-1">
                    <IconAi />
                  </div>
                </span>
                <div className="leading-relaxed w-full">
                  <span className="block font-bold text-gray-700"> AI</span>
                  <Loader />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center mt-auto pt-0">
            <form
              onSubmit={onSubmit}
              className="flex items-center h-10 justify-center w-full space-x-2"
            >
              <input
                className="flex h-full w-full rounded-md border bg-gray-100 border-[#e5e7eb] outline-none px-3 py-2 text-sm   disabled:cursor-not-allowed disabled:opacity-50 placeholder-[#030712] text-[#030712] "
                placeholder="Type your message"
                id="input--messenger"
                defaultValue=""
              />
              <button
                type="submit"
                className="min-w-10 h-full rounded-full bg-black flex items-center justify-center"
              >
                <SendHorizonal className="text-white w-auto h-6" />
              </button>
            </form>
          </div>
        </TabsContent>
        <TabsContent value="helpDesk" className="m-0">
          <div className="pr-4 no-visible-scrollbar h-[23.5rem] overflow-scroll">
            {helpDesk?.map((h, index) => (
              <FAQ
                key={index}
                question={h.question}
                answer={h.answer as string}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <h6 className="text-sm flex w-full items-baseline justify-center pt-2  ">
        Powered By
        <Image
          className="ml-2 mr-[1px]"
          alt=""
          width={16}
          height={16}
          src={"/logo-dark.svg"}
        />
        euron AI
      </h6>
    </div>
  );
};

function Loader() {
  return (
    <div className="w-full mt-1 animate-pulse">
      <div className="h-2.5 bg-white rounded-full dark:bg-gray-700 w-full mb-4"></div>
      <div className="h-2.5 bg-white rounded-full dark:bg-gray-700 w-full mb-4"></div>
      <div className="h-2.5 bg-white rounded-full dark:bg-gray-700 w-24 mb-4"></div>
    </div>
  );
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger className="capitalize text-sm text-left">
          {question}
        </AccordionTrigger>
        <AccordionContent>{answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function IconAi() {
  return (
    <svg
      stroke="none"
      fill="black"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      ></path>
    </svg>
  );
}

function IconPerson() {
  return (
    <svg
      stroke="none"
      fill="black"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
    </svg>
  );
}

export default BotWindow;
