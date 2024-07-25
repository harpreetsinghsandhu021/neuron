"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

import { RadioTile, RadioTileGroup } from "rsuite";
import { Icon } from "@rsuite/icons";
import { VscLock, VscWorkspaceTrusted, VscRepo } from "react-icons/vsc";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next13-progressbar";
import Link from "next/link";
import { authType } from "@/actions/auth/types";
import { formSchema } from "@/actions/auth/schema";

export default function SignUpForm({
  signUpWithEmail,
}: {
  signUpWithEmail: (values: authType) => Promise<void>;
}) {
  // 1. Define your form.
  const form = useForm<authType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      type: "student",
      passwordConfirm: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: authType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.rn
    signUpWithEmail(values);
  }

  // ...

  return (
    <div className="border border-zinc-600 rounded-xl">
      <div className="w-[34rem] mx-auto rounded-none md:rounded-2xl p-4 md:px-6 md:py-6 shadow-input bg-black">
        <h2 className="font-bold text-xl text-white">Welcome to Neuron</h2>
        <p className="text-gray-300 text-sm max-w-sm mt-2 ">
          Sign up to Neuron - If you can figure out our non-existent login flow,
          you're a genius!
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="my-5 ">
            <div className="flex flex-col text-white gap-8 space-y-2 md:space-y-2 mb-4">
              <div className="flex-1 flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-zinc-800 text-zinc-300  border-zinc-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-zinc-800 text-zinc-300  border-zinc-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full inline-block ">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="bg-zinc-800 text-zinc-300  border-zinc-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem className="w-full ">
                        <FormLabel>Password Confirm</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="bg-zinc-800 text-zinc-300  border-zinc-800"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex-1">
                <RadioTileGroup
                  className="text-white text-sm flex mb-4"
                  defaultValue="private"
                  inline={true}
                  onChange={(e) =>
                    form.setValue("type", e as "owner" | "student")
                  }
                  aria-label="Visibility Level"
                >
                  <RadioTile
                    icon={<Icon as={VscLock} />}
                    label="I own a buisness"
                    className="flex-1"
                    value="owner"
                  >
                    Setting up my account for my company.
                  </RadioTile>
                  <RadioTile
                    icon={<Icon as={VscRepo} />}
                    label="Im a student"
                    className="flex-1"
                    value="student"
                  >
                    Looking to learn about the tool.
                  </RadioTile>
                </RadioTileGroup>

                <button
                  className="bg-gradient-to-br relative group/btn bg-zinc-900 w-full text-white rounded-md h-10 font-medium "
                  type="submit"
                >
                  Sign up &rarr;
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                  <p className="text-center">
                    Already have an account.{" "}
                    <Link href={"/sign-in"} className="text-white">
                      {" "}
                      Sign In{" "}
                    </Link>{" "}
                    instead
                  </p>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
