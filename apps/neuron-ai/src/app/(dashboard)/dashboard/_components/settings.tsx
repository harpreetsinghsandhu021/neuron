"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import PlanCard from "@/components/planCard";
import { cn } from "@/lib/utils";
import PageInfo from "./info";
import { useThemeMode } from "flowbite-react";

const Settings = () => {
  const { mode, setMode } = useThemeMode();

  return (
    <div className="my-4">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex gap-4 items-center">
              <Image
                src={"/images/logo.svg"}
                alt=""
                width={100}
                height={100}
                className="w-10 h-10"
              />{" "}
              Neuron
            </CardTitle>
            <CardDescription>
              Switch your subscription to a different type, such as a monthly
              plan, annual plan, or student plan. And see a list of subscription
              plans that Neuron AI offers.
            </CardDescription>
            <CardDescription>
              Next payment of $36 (yearly) occurs on August 13, 2020.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button>Upgrade</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="my-4">
        <PageInfo
          title="Interface Theme"
          subtitle="Select or customize your UI theme "
        />
        <div className="flex my-4 gap-4">
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              mode === "light" && "border-amber-400"
            )}
            onClick={() => setMode("light")}
          >
            <LightMode />
          </div>
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              mode === "dark" && "border-amber-400"
            )}
            onClick={() => setMode("dark")}
          >
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SystemMode = () => {
  return (
    <svg
      width="282"
      height="193"
      viewBox="0 0 282 193"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 15C0 6.71573 6.71573 0 15 0H267C275.284 0 282 6.71573 282 15V178C282 186.284 275.284 193 267 193H15C6.71573 193 0 186.284 0 178V15Z"
        fill="#F5F5F5"
      />
      <path
        d="M28 42C28 33.7157 34.7157 27 43 27H242C250.284 27 257 33.7157 257 42V193H28V42Z"
        fill="white"
      />
      <circle cx="45.5" cy="39.5" r="4.5" fill="#FF6F6F" />
      <circle cx="58.5" cy="39.5" r="4.5" fill="#FFF500" />
      <circle cx="71.5" cy="39.5" r="4.5" fill="#9AFF76" />
      <rect x="44" y="67" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="88" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="110" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="132" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="119" y="67" width="125" height="126" rx="4" fill="#D9D9D9" />
      <rect x="137" width="145" height="193" fill="black" />
      <circle cx="45.5" cy="39.5" r="4.5" fill="#FF6F6F" />
      <circle cx="58.5" cy="39.5" r="4.5" fill="#FFF500" />
      <circle cx="71.5" cy="39.5" r="4.5" fill="#9AFF76" />
      <rect x="44" y="67" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="88" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="110" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="132" width="61" height="17" rx="3" fill="#D9D9D9" />
      <path
        d="M137 27H242C250.284 27 257 33.7157 257 42V193H137V27Z"
        fill="#202020"
      />
      <path
        d="M137 67H238C241.314 67 244 69.6863 244 73V188C244 190.761 241.761 193 239 193H137V67Z"
        fill="#404040"
      />
      <rect x="128" y="123" width="111" height="11" rx="3" fill="#D9D9D9" />
      <rect x="137" y="123" width="102" height="11" fill="#585858" />
      <rect x="194" y="137" width="45" height="6" rx="3" fill="#585858" />
      <rect x="128" y="85" width="111" height="27" fill="#F8F8F8" />
      <rect x="137" y="85" width="102" height="27" fill="#5B5B5B" />
    </svg>
  );
};

export const LightMode = () => {
  return (
    <svg
      width="282"
      height="193"
      viewBox="0 0 282 193"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 15C0 6.71573 6.71573 0 15 0H267C275.284 0 282 6.71573 282 15V178C282 186.284 275.284 193 267 193H15C6.71573 193 0 186.284 0 178V15Z"
        fill="#F5F5F5"
      />
      <path
        d="M28 42C28 33.7157 34.7157 27 43 27H242C250.284 27 257 33.7157 257 42V193H28V42Z"
        fill="white"
      />
      <circle cx="45.5" cy="39.5" r="4.5" fill="#FF6F6F" />
      <circle cx="58.5" cy="39.5" r="4.5" fill="#FFF500" />
      <circle cx="71.5" cy="39.5" r="4.5" fill="#9AFF76" />
      <rect x="44" y="67" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="88" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="110" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="132" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="119" y="67" width="125" height="126" rx="4" fill="#D9D9D9" />
      <rect x="137" width="145" height="193" fill="#F5F5F5" />
      <circle cx="45.5" cy="39.5" r="4.5" fill="#FF6F6F" />
      <circle cx="58.5" cy="39.5" r="4.5" fill="#FFF500" />
      <circle cx="71.5" cy="39.5" r="4.5" fill="#9AFF76" />
      <rect x="44" y="67" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="88" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="110" width="61" height="17" rx="3" fill="#D9D9D9" />
      <rect x="44" y="132" width="61" height="17" rx="3" fill="#D9D9D9" />
      <path
        d="M137 27H242C250.284 27 257 33.7157 257 42V193H137V27Z"
        fill="white"
      />
      <path
        d="M137 67H238C241.314 67 244 69.6863 244 73V188C244 190.761 241.761 193 239 193H137V67Z"
        fill="#D9D9D9"
      />
      <rect x="128" y="123" width="111" height="11" rx="3" fill="#D9D9D9" />
      <rect x="137" y="123" width="102" height="11" fill="#F8F8F8" />
      <rect x="194" y="137" width="45" height="6" rx="3" fill="#F7F7F7" />
      <rect x="128" y="85" width="111" height="27" fill="#F8F8F8" />
      <rect x="137" y="85" width="102" height="27" fill="#F8F8F8" />
    </svg>
  );
};

export const DarkMode = () => {
  return (
    <svg
      width="282"
      height="193"
      viewBox="0 0 282 193"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 15C0 6.71573 6.71573 0 15 0H267C275.284 0 282 6.71573 282 15V178C282 186.284 275.284 193 267 193H15C6.71573 193 0 186.284 0 178V15Z"
        fill="black"
      />
      <path
        d="M28 42C28 33.7157 34.7157 27 43 27H242C250.284 27 257 33.7157 257 42V193H28V42Z"
        fill="#202020"
      />
      <circle cx="45.5" cy="39.5" r="4.5" fill="#FF6F6F" />
      <circle cx="58.5" cy="39.5" r="4.5" fill="#FFF500" />
      <circle cx="71.5" cy="39.5" r="4.5" fill="#9AFF76" />
      <rect x="44" y="67" width="61" height="17" rx="3" fill="#" />
      <rect x="44" y="88" width="61" height="17" rx="3" fill="#" />
      <rect x="44" y="110" width="61" height="17" rx="3" fill="#" />
      <rect x="44" y="132" width="61" height="17" rx="3" fill="#" />
      <rect x="119" y="67" width="125" height="126" rx="4" fill="#404040" />
      <rect x="137" width="145" height="193" fill="black" />
      <circle cx="45.5" cy="39.5" r="4.5" fill="#FF6F6F" />
      <circle cx="58.5" cy="39.5" r="4.5" fill="#FFF500" />
      <circle cx="71.5" cy="39.5" r="4.5" fill="#9AFF76" />
      <rect x="44" y="67" width="61" height="17" rx="3" fill="#5B5B5B" />
      <rect x="44" y="88" width="61" height="17" rx="3" fill="#5B5B5B" />
      <rect x="44" y="110" width="61" height="17" rx="3" fill="#5B5B5B" />
      <rect x="44" y="132" width="61" height="17" rx="3" fill="#5B5B5B" />
      <path
        d="M137 27H242C250.284 27 257 33.7157 257 42V193H137V27Z"
        fill="#202020"
      />
      <path
        d="M137 67H238C241.314 67 244 69.6863 244 73V188C244 190.761 241.761 193 239 193H137V67Z"
        fill="#404040"
      />
      <rect x="128" y="123" width="111" height="11" rx="3" fill="#404040" />
      <rect x="137" y="123" width="102" height="11" fill="#585858" />
      <rect x="194" y="137" width="45" height="6" rx="3" fill="#585858" />
      <rect x="128" y="85" width="111" height="27" fill="#5B5B5B" />
      <rect x="137" y="85" width="102" height="27" fill="#5B5B5B" />
    </svg>
  );
};

export default Settings;
