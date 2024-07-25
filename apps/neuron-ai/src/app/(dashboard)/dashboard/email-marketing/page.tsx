import React from "react";
import Dashboard, { Break } from "../_components/dashboard";
import PageInfo from "../_components/info";
import Conversation from "../_components/conversations";
import { Card } from "flowbite-react";
import Image from "next/image";
import Intergration from "../_components/integration";
import EmailMarketing from "../_components/emailMarketing";

const page = () => {
  return (
    <div className="max-w-6xl md:h-[690px] hide-scrollbar overflow-scroll  p-4 dark:text-white">
      <PageInfo
        title="Email Marketing"
        subtitle="Send bulk emails to your customers"
      />
      <EmailMarketing />
    </div>
  );
};

export default page;
