import React from "react";
import Dashboard from "../_components/dashboard";
import PageInfo from "../_components/info";

const page = () => {
  return (
    <div className="max-w-6xl md:h-[690px] hide-scrollbar overflow-scroll  p-4 dark:text-white">
      <PageInfo
        title="Dashboard Overview"
        subtitle="A detailed overview of your metrics, usage, customers and more"
      />
      <Dashboard />
    </div>
  );
};

export default page;
