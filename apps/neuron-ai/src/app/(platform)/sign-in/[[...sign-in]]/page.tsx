"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { z } from "zod";
import { ClerkAPIError } from "@clerk/types";
import { toast } from "sonner";
import SignInForm from "@/components/signInForm";
import { useRouter } from "next13-progressbar";
import { loginType } from "@/actions/auth/types";

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  async function handleSubmit(values: loginType) {
    if (!isLoaded) return;

    console.log(values);

    try {
      const res = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (res.status === "complete") {
        toast.success("Sign In Successfull, Sailing to the dashboard");
        setTimeout(() => {
          window.location.href = "/dashboard/overview";
        }, 2000);
      }
    } catch (err) {
      // if (isClerkAPIResponseError(err)) setErrors(err.errors);
      let error = JSON.stringify(err, null, 2);

      let parsedErr = JSON.parse(error);

      toast.error(parsedErr.errors[0].longMessage);
    }
  }

  return (
    <section className="h-[100vh] overflow-hidden w-full flex justify-center items-center">
      <SignInForm signUpWithEmail={handleSubmit} />
    </section>
  );
}
