import { IconCalendar, IconPresentation } from "@tabler/icons-react";
import React from "react";
import { BiDollar } from "react-icons/bi";
import PageInfo from "./info";
import { Progress } from "flowbite-react";

const Dashboard = () => {
  return (
    <div className="w-full mt-4 py-2 rounded-xl">
      <div className="flex justify-between gap-4 flex-wrap">
        <DashboardCard
          value={0}
          title="Total Clients"
          icon={<IconPresentation className="w-8 h-8" />}
        />
        <DashboardCard
          value={0}
          sales
          title="Pipline Value"
          icon={<BiDollar className="w-8 h-8" />}
        />
        <DashboardCard
          value={0}
          title="Appointments"
          icon={<IconCalendar className="w-8 h-8" />}
        />
        <DashboardCard
          value={0}
          sales
          title="Total Sales"
          icon={<BiDollar className="w-8 h-8" />}
        />
      </div>
      <div className="my-4">
        <PageInfo title="Plan Usage" />
        <div className="max-w-sm">
          <ProgressBar progress={2} title="Email Credits" />
          <ProgressBar progress={5} title="Domains" />
          <ProgressBar progress={0} title="Contacts" />
        </div>
      </div>
    </div>
  );
};

export function Break() {
  return <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>;
}

type CardProps = {
  title: string;
  value: number;
  icon: JSX.Element;
  sales?: boolean;
};

const DashboardCard = ({ icon, title, value, sales }: CardProps) => {
  return (
    <div className=" bg-white dark:bg-gray-800 border p-8 w-64 rounded-xl flex gap-8 flex-col justify-between ">
      <div className="flex justify-center gap-4 items-center">
        {icon}
        <h2 className=" text-xl">{title}</h2>
      </div>
      <p className="font-bold text-black dark:text-white text-center text-4xl">
        {sales && "$"}
        {value}
      </p>
    </div>
  );
};

interface ProgressBarProps {
  title: string;
  progress: number;
}
export function ProgressBar({ title, progress }: ProgressBarProps) {
  return (
    <div className="my-4 relative">
      <p className="my-2">{title}</p>
      {/* <p className="inline-block">{10}</p> */}
      <Progress
        textLabel={`${progress}`}
        labelText={true}
        textLabelPosition="outside"
        color="dark"
        progress={50}
        size="lg"
      />
    </div>
  );
}

export default Dashboard;
