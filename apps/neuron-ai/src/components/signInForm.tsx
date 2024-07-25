"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next13-progressbar";
import Link from "next/link";
import { loginType } from "@/actions/auth/types";
import { loginSchema } from "@/actions/auth/schema";

export default function SignInForm({
  signUpWithEmail,
}: {
  signUpWithEmail: (values: loginType) => Promise<void>;
}) {
  // 1. Define your form.
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
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
          Log in to Neuron - If you can figure out our non-existent login flow,
          you're a genius!
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="my-5 ">
            <div className="flex text-white gap-8 space-y-2 md:space-y-2 mb-4">
              <div className="flex-1 flex flex-col gap-4">
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full ">
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

                <div className="flex-1 mt-4">
                  <button
                    className="bg-gradient-to-br relative group/btn bg-zinc-900 w-full text-white rounded-md h-10 font-medium "
                    type="submit"
                  >
                    Sign in
                  </button>

                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

                  <div className="flex flex-col space-y-4">
                    <p className="text-center">
                      Don`t` have an account.{" "}
                      <Link href={"/sign-up"} className="text-white">
                        {" "}
                        Sign Up{" "}
                      </Link>{" "}
                      instead
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
