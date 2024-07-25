import React from "react";
import Dashboard, { Break } from "../_components/dashboard";
import PageInfo from "../_components/info";
import Conversation from "../_components/conversations";
import { getAllDomains } from "@/actions/domains";

const page = async () => {
  const domains = await getAllDomains();

  return (
    <div className="max-w-6xl md:h-[690px] no-visible-scrollbar overflow-scroll  p-4 dark:text-white">
      <PageInfo
        title="Conversations"
        subtitle="Review and manage all user interactions with your AI chatbot, including active, resolved, and archived conversations, ensuring comprehensive visibility and improved user satisfaction. "
      />
      <Conversation domains={domains?.domains} />
    </div>
  );
};

export default page;
