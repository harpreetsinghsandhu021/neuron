import { updateGreetingMessage } from "@/actions/chatbot";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "flowbite-react";
import Image from "next/image";
import React, { ChangeEvent } from "react";
import { toast } from "sonner";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const ChatbotSettings = ({
  icon,
  greetingMessage,
  id,
}: {
  icon: string | undefined | null;
  greetingMessage: string | undefined | null;
  id: number | undefined;
}) => {
  const handleUpdateGreetingMessage = useDebouncedCallback(
    async (e: ChangeEvent<HTMLTextAreaElement>) => {
      const res = await updateGreetingMessage(e.target.value, id as number);

      console.log(res);

      if (res.status === 204) {
        toast.success("Greeting Message updated");
      }
    },
    2000
  );

  return (
    <div className="flex">
      <div className="flex-1">
        <CardTitle className="text-xl capitalize">Chatbot icon</CardTitle>
        <p>Change the icon for the chatbot.</p>
        <div className="flex items-start gap-4">
          <Input id="picture" className="w-full mt-4 p-0 " type="file" />

          <div className="min-w-16 min-h-16 rounded-full p-1 flex items-center justify-center bg-blue-200  ">
            <Image
              src="/icons/chatboticon.png"
              alt="chaticon"
              className="w-16 h-auto"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="items-center mt-4 pr-20">
          <CardTitle className="text-xl capitalize">Greeting message</CardTitle>
          <p>Customize your welcome message</p>
          <Textarea
            defaultValue={greetingMessage as string}
            className="w-full  mt-4 resize-none"
            onChange={(e) => handleUpdateGreetingMessage(e)}
            rows={2}
          />
        </div>
      </div>
      <div className="flex-1">
        <Image
          src="/images/bot-ui.png"
          alt="chaticon"
          className="w-[30rem] h-auto"
          width={600}
          height={500}
        />
      </div>
    </div>
  );
};

export default ChatbotSettings;
