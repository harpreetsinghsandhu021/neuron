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
import { SiGoogleassistant } from "react-icons/si";
import { FaUserAlt } from "react-icons/fa";

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
    <div className="h-[38rem] w-[28rem] mb-24 mr-10 bg-white border relative flex flex-col rounded-xl overflow-hidden">
      <div className=" border-b p-4 bg-black text-white border-b-white">
        <div className="flex gap-2">
          <div className="bg-white w-12 flex items-center justify-center rounded-full h-12">
            <BsStars className="w-6 fill-black h-6" />
          </div>
          <div>
            <h4 className="text-2xl capitalize whitespace-nowrap font-[500]">
              Sales Rep - <span className="text-xl"> {domain?.name} </span>
            </h4>
            <h6 className="capitalize flex">{domain?.name} </h6>
          </div>
        </div>
      </div>
      <Tabs defaultValue="chat" className="">
        <TabsList className="grid w-full text-black bg-gray-200 rounded-none grid-cols-2">
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
            <TabsTrigger className="rounded-lg " value="helpDesk">
              Help Desk
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent className="m-0" value="chat">
          <div
            ref={messageWindowRef}
            className=" px-4 no-visible-scrollbar h-[25.5rem] overflow-scroll"
          >
            {chat.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`flex gap-3 my-4 text-black text-sm flex-1`}
                >
                  {message.role === "AI" ? <AIIcon /> : <PersonIcon />}
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

            {responseLoading && (
              <div className="flex gap-3">
                <AIIcon />
                <div className="leading-relaxed w-full">
                  <span className="block font-bold text-gray-700"> AI</span>
                  <Loader />
                </div>
              </div>
            )}
          </div>
          <div className="px-4 flex items-center mt-auto pt-0">
            <form
              onSubmit={onSubmit}
              className="flex items-center h-10 justify-center w-full space-x-2"
            >
              <input
                autoComplete="off"
                className="flex h-full w-full rounded-3xl bg-white shadow-[0_0_2px_2px_rgba(0,0,0,0.1)] outline-none px-3 py-2 
                text-sm transition-all focus:outline-black focus:shadow-[0_0_0px_0px_rgba(0,0,0,0.1)] disabled:cursor-not-allowed disabled:opacity-50 
                placeholder-gray-500 text-[#030712] "
                placeholder="Type your message"
                id="input--messenger"
                defaultValue=""
              />
              <button
                type="submit"
                className="min-w-10 h-full active:scale-90 rounded-full bg-black flex items-center justify-center"
              >
                <SendHorizonal className="text-white w-auto h-6" />
              </button>
            </form>
          </div>
        </TabsContent>
        <TabsContent value="helpDesk" className="m-0">
          <div className="px-4 no-visible-scrollbar h-[28rem] overflow-scroll">
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
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
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

function AIIcon() {
  return (
    <div className="min-w-10 h-10 rounded-full bg-black flex justify-center items-center border">
      <SiGoogleassistant className="fill-white w-5 h-5" />
    </div>
  );
}

function PersonIcon() {
  return (
    <div className="min-w-10 h-10 rounded-full bg-black flex justify-center items-center border">
      <FaUserAlt className="fill-white w-5 h-5" />
    </div>
  );
}

export default BotWindow;
