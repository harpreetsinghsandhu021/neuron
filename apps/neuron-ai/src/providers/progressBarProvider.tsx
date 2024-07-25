"use client";
import { useThemeMode } from "flowbite-react";
import { Next13ProgressBar } from "next13-progressbar";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useThemeMode();

  return (
    <>
      {children}
      <Next13ProgressBar
        height="4px"
        color={"#64748b"}
        options={{ showSpinner: false }}
        showOnShallow
      />
    </>
  );
};

export default ProgressProvider;
