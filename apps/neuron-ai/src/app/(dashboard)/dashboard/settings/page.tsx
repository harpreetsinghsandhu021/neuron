import React from "react";
import PageInfo from "../_components/info";
import Settings from "../_components/settings";

const page = () => {
  return (
    <div className="max-w-6xl md:h-[690px] hide-scrollbar overflow-scroll  p-4 dark:text-white">
      <PageInfo
        title="Settings"
        subtitle="Manage your account settings, preferences and integrations"
      />
      <Settings />
    </div>
  );
};

export default page;
