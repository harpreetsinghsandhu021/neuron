"use client";

import BotWindow from "@/components/botWindow";
import useChatBot from "@/hooks/useChatbot";
import Image from "next/image";

export default function Home() {
  const {
    currBot,
    domain,
    loading,
    responseLoading,
    chat,
    onSubmit,
    onOpenChatBot,
    botWindowOpened,
    helpDesk,
  } = useChatBot();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ background: "none" }}
      className="h-screen w-full flex flex-col justify-end overflow-hidden items-end gap-2"
    >
      {botWindowOpened && (
        <BotWindow
          responseLoading={responseLoading}
          onSubmit={onSubmit}
          helpDesk={helpDesk}
          domain={domain}
          currBot={currBot}
          chat={chat}
        />
      )}
      <div
        className={`rounded-full cursor-pointer z-50 w-20 fixed bottom-10 right-10 h-20 flex items-center justify-center ${currBot?.background ? currBot.background : "bg-blue-200"} `}
        onClick={onOpenChatBot}
      >
        {currBot?.icon ? (
          <Image src={`https://ucarecdn.com/${currBot.icon}/`} alt="bot" fill />
        ) : (
          <BotIcon />
        )}
      </div>
    </div>
  );
}

const BotIcon = () => {
  return (
    <Image
      alt=""
      quality={10}
      priority
      width={60}
      height={60}
      sizes=""
      className=" rounded-full"
      src={"/chatboticon.png"}
    />
  );
};
