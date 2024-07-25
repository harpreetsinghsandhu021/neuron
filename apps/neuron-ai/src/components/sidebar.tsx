"use client";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { Badge, Sidebar, useThemeMode } from "flowbite-react";
import { LogOut, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiConversation } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import {
  MdDashboard,
  MdEmail,
  MdIntegrationInstructions,
} from "react-icons/md";
import { Button } from "./ui/button";
import { FaCirclePlus } from "react-icons/fa6";
import { Break } from "@/app/(dashboard)/dashboard/_components/dashboard";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UploadClient } from "@uploadcare/upload-client";
import { SupportedFileInput } from "@uploadcare/upload-client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createDomain, getAllDomains } from "@/actions/domains";
import { toast } from "sonner";
import { useRouter } from "next13-progressbar";
import { DomainType } from "@/actions/domains/types";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

export default function SidebarComponent() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [domains, setDomains] = useState<DomainType[] | undefined>(undefined);
  let pathName = usePathname();
  pathName = pathName.replace("/dashboard", "");
  const router = useRouter();
  const { mode } = useThemeMode();

  async function fetchDomains() {
    const res = await getAllDomains();
    console.log(res);

    if (res?.status !== 200) {
      toast.error(res?.erorr);
    }

    setDomains(res?.domains);
  }
  useEffect(() => {
    fetchDomains();
  }, []);

  const form = useForm<DomainType>({
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const values = form.getValues();

    const res = await createDomain(values);

    if (res?.status === 201) {
      toast.success("domain created successfully");
      fetchDomains();
    }
  }

  return (
    <Sidebar
      className={`h-[100vh] border dark:bg-gray-800 text-black min-w-64 `}
      collapsed={false}
      aria-label="Sidebar with call to action button example"
    >
      {mode === "dark" ? (
        <Sidebar.Logo
          href="#"
          img="/images/logo.svg"
          className="w-8 h-8 select-none"
          imgAlt="Flowbite logo"
        >
          Neuron
        </Sidebar.Logo>
      ) : (
        <Sidebar.Logo
          href="#"
          img="/images/logo-dark.svg"
          className="w-8 h-8 select-none"
          imgAlt="Flowbite logo"
        >
          Neuron
        </Sidebar.Logo>
      )}
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={pathName.includes("/overview")}
            as={Link}
            href="/dashboard/overview"
            icon={MdDashboard}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            active={pathName.includes("/conversation")}
            href="/dashboard/conversation"
            as={Link}
            icon={BiConversation}
          >
            Conversation
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/integrations"
            as={Link}
            active={pathName.includes("/integrations")}
            icon={MdIntegrationInstructions}
          >
            Integrations
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/settings"
            as={Link}
            active={pathName === "/settings"}
            icon={SettingsIcon}
          >
            Settings
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/appointments"
            active={pathName.includes("/appointments")}
            as={Link}
            icon={CgCalendarDates}
          >
            Appointments
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/email-marketing"
            active={pathName.includes("/email-marketing")}
            as={Link}
            icon={MdEmail}
          >
            Email Marketing
          </Sidebar.Item>

          <SignedIn>
            <Sidebar.Item href="#" as={Link} icon={LogOut}>
              <SignOutButton />
            </Sidebar.Item>
          </SignedIn>
          <Break />
          <Sidebar.Item>
            <Dialog>
              <DialogTrigger
                className="flex w-full outline-none justify-between items-center"
                asChild
              >
                <div className="">
                  <p> Domains </p> <FaCirclePlus className="w-6 h-6" />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[30rem]">
                <DialogHeader>
                  <DialogTitle>Add your Business Domain</DialogTitle>
                  <DialogDescription>
                    Add in your domain to integrate chatbot
                  </DialogDescription>
                </DialogHeader>
                <form
                  {...form}
                  onSubmit={handleSubmit}
                  className="grid gap-4 py-4"
                >
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="name"
                      className="text-left whitespace-nowrap"
                    >
                      Domain name
                    </Label>
                    <Input
                      id="name"
                      onChange={(e) => form.setValue("name", e.target.value)}
                      defaultValue="Sample Domain.com"
                      className="col-span-3 outline-none "
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Domain Icon
                    </Label>
                    <Input
                      id="picture"
                      disabled={isUploading}
                      onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files![0];

                        setIsUploading(true);
                        const uploaded = await upload.uploadFile(
                          file as SupportedFileInput
                        );

                        setIsUploading(false);
                        form.setValue("icon", uploaded.uuid);
                      }}
                      multiple={false}
                      className="w-[20rem] mt-4 p-0 "
                      type="file"
                    />
                  </div>
                </form>

                <DialogFooter>
                  <Button
                    disabled={isUploading}
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full"
                  >
                    <p> {isUploading ? "Uploading Image" : " Save changes"}</p>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Sidebar.Item>

          {domains?.length! > 0 &&
            domains?.map((domain) => (
              <Sidebar.Item
                as={Link}
                key={domain.icon}
                active={pathName === `/settings/${domain.slug}`}
                href={`/dashboard/settings/${domain.slug}`}
              >
                <button className="flex items-center gap-2  w-full">
                  <Image
                    src={`https://ucarecdn.com/${domain.icon}/`}
                    alt=""
                    className="w-8 h-8 border border-gray-200/40 object-cover rounded-full "
                    width={600}
                    height={600}
                  />
                  <p className="text-sm"> {domain.name}</p>
                </button>
              </Sidebar.Item>
            ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <Sidebar.CTA>
        <div className="mb-3 flex items-center">
          <Badge color="warning">Free</Badge>
        </div>
        <div className="mb-6 text-sm text-cyan-900 dark:text-gray-400">
          Experience the advanced features and seamless navigation with our
          premium plan.
        </div>
        <Link
          className="text-sm bg-amber-400 text-black p-2 rounded-xl font-bold "
          href="/dashboard/integrations"
        >
          Upgrade to Premium
        </Link>
      </Sidebar.CTA>
    </Sidebar>
  );
}
