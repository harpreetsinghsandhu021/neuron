import React from "react";
import { Card } from "flowbite-react";
import Image from "next/image";
import PageInfo from "../../_components/info";
import DomainSettings from "../../_components/domainSettings";
import { getParticularDomainData } from "@/actions/domains";

const page = async ({
  params,
}: {
  params: {
    domain: string;
  };
}) => {
  const domainSettings = await getParticularDomainData(params.domain);

  return (
    <div className="max-w-6xl md:h-[700px] hide-scrollbar overflow-scroll  p-4 dark:text-white">
      {domainSettings && (
        <>
          <PageInfo
            title={domainSettings?.domain?.name as string}
            subtitle="Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to."
          />
          <DomainSettings
            helpDesk={domainSettings.helpDesk}
            domain={domainSettings.domain}
            chatbot={domainSettings.chatbot}
            filteredQuestions={domainSettings.filteredQuestions}
            products={domainSettings.products}
          />
        </>
      )}
    </div>
  );
};

export default page;
