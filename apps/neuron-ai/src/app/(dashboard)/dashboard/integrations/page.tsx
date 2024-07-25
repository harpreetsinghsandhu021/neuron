import React from "react";
import Dashboard, { Break } from "../_components/dashboard";
import PageInfo from "../_components/info";
import Conversation from "../_components/conversations";
import { Card } from "flowbite-react";
import Image from "next/image";
import Intergration from "../_components/integration";

const page = () => {
  return (
    <div className="max-w-6xl md:h-[690px] hide-scrollbar overflow-scroll  p-4 dark:text-white">
      <PageInfo
        title="Integrations"
        subtitle="Connect third-party applications into Neuron AI"
      />
      <Intergration />
    </div>
  );
};

export default page;
