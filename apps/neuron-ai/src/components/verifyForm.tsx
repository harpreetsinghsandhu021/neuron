"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

interface VerifyFormProps {
  handleVerify: (otp: string) => void;
  code: string;
  setCode: (value: string) => void;
}
export default function VerifyForm({
  handleVerify,
  code,
  setCode,
}: VerifyFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify(form.getValues("pin"));
        }}
        className=" space-y-6 border border-zinc-600 max-w-sm p-4 rounded-xl"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 items-center text-center">
              <FormLabel className="text-white text-2xl">
                One-Time Password
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="text-white">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your Email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="bg-gradient-to-br relative group/btn bg-zinc-900 w-full text-white rounded-md h-10 font-medium "
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
