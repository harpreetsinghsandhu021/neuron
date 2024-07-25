import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}

const PageInfo = ({ title, subtitle }: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-400 text-muted-foreground  mt-0 w-3/4">
        {subtitle}
      </p>
    </div>
  );
};

export default PageInfo;
