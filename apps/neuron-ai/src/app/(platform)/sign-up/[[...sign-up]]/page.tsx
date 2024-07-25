"use client";

import SignUpForm from "@/components/signUpForm";
import VerifyForm from "@/components/verifyForm";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next13-progressbar";
import { useState } from "react";
import { z } from "zod";
import { ClerkAPIError } from "@clerk/types";
import { toast } from "sonner";
import { signUpCustom } from "@/actions/auth";
import { authType } from "@/actions/auth/types";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [showVerifyForm, setShowVerifyForm] = useState<boolean>(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const [formValues, setFormValues] = useState<authType | null>(null);

  async function onOTP(values: authType): Promise<void> {
    if (!isLoaded) return;
    setFormValues(values);

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.fullName,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setShowVerifyForm(true);
    } catch (err) {
      // if (isClerkAPIResponseError(err)) setErrors(err.errors);
      let error = JSON.stringify(err, null, 2);

      let parsedErr = JSON.parse(error);

      toast.error(parsedErr.errors[0].longMessage);
    }
  }

  async function handleSubmit(otp: string) {
    console.log(otp);

    if (!isLoaded) return;

    try {
      const res = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      console.log(res);

      if (res.status !== "complete") {
        return { message: "Something went wrong!" };
      }

      if (res.status === "complete") {
        if (!signUp.createdUserId) return;

        const clerkId = signUp.createdUserId;

        const customSignUpRes = await signUpCustom(formValues!, clerkId);

        if (customSignUpRes.status === 201) {
          await setActive({
            session: res.createdSessionId,
          });

          toast.success("Sign up Successfull, Sailing to the dashboard");
          setTimeout(() => {
            window.location.href = "/dashboard/overview";
          }, 2000);
        }
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
      {!showVerifyForm && <SignUpForm signUpWithEmail={onOTP} />}
      {showVerifyForm && (
        <VerifyForm handleVerify={handleSubmit} code={code} setCode={setCode} />
      )}
    </section>
  );
}
