import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

import { IoPersonSharp } from "react-icons/io5";
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

const CampaignHandler = () => {
  return (
    <div>
      <div className="flex gap-4 justify-end">
        <Button>
          <IconPlus className="pr-1" /> Add to Campaign
        </Button>
        <Button>Create Campaign</Button>
      </div>
      <div className="mt-4 no-visible-scrollbar flex flex-col gap-4 ">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between mb-1 text-sm capitalize">
              <p className="flex items-center gap-2">
                <FaCalendarAlt /> Created Jun 14th{" "}
              </p>
              <p className="flex items-center gap-2">
                <IoPersonSharp className="ml-auto" /> 0 customers added
              </p>
            </div>
            <CardTitle className="flex gap-4 items-center">
              Introducing Our New AI Chatbot: Your Personal Assistant!
            </CardTitle>
            <CardDescription className="truncate text-ellipsis line-clamp-3 overflow-hidden">
              Hi [Recipient's Name], We are thrilled to announce the launch of
              our latest product, the AI Chatbot! Designed to streamline your
              tasks and enhance productivity, our AI Chatbot is your personal
              assistant, available 24/7. Key Features: 24/7 Availability: Never
              miss a task with real-time assistance. Intelligent Responses:
              Understands and responds to your queries accurately. Seamless
              Integration: Easily integrates with your favorite tools. Don't
              miss out on experiencing the future of personal assistance. Click
              here to get started with our AI Chatbot today! Best regards,
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Template</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button>Send</Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between mb-1 text-sm capitalize">
              <p className="flex items-center gap-2">
                <FaCalendarAlt /> Created Jun 14th{" "}
              </p>
              <p className="flex items-center gap-2">
                <IoPersonSharp className="ml-auto" /> 0 customers added
              </p>
            </div>
            <CardTitle className="flex gap-4 items-center">
              Introducing Our New AI Chatbot: Your Personal Assistant!
            </CardTitle>
            <CardDescription className="truncate text-ellipsis line-clamp-3 overflow-hidden">
              Hi [Recipient's Name], We are thrilled to announce the launch of
              our latest product, the AI Chatbot! Designed to streamline your
              tasks and enhance productivity, our AI Chatbot is your personal
              assistant, available 24/7. Key Features: 24/7 Availability: Never
              miss a task with real-time assistance. Intelligent Responses:
              Understands and responds to your queries accurately. Seamless
              Integration: Easily integrates with your favorite tools. Don't
              miss out on experiencing the future of personal assistance. Click
              here to get started with our AI Chatbot today! Best regards,
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Button variant={"outline"}>Edit Template</Button>
            <Button>Send</Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between mb-1 text-sm capitalize">
              <p className="flex items-center gap-2">
                <FaCalendarAlt /> Created Jun 14th{" "}
              </p>
              <p className="flex items-center gap-2">
                <IoPersonSharp className="ml-auto" /> 0 customers added
              </p>
            </div>
            <CardTitle className="flex gap-4 items-center">
              Introducing Our New AI Chatbot: Your Personal Assistant!
            </CardTitle>
            <CardDescription className="truncate text-ellipsis line-clamp-3 overflow-hidden">
              Hi [Recipient's Name], We are thrilled to announce the launch of
              our latest product, the AI Chatbot! Designed to streamline your
              tasks and enhance productivity, our AI Chatbot is your personal
              assistant, available 24/7. Key Features: 24/7 Availability: Never
              miss a task with real-time assistance. Intelligent Responses:
              Understands and responds to your queries accurately. Seamless
              Integration: Easily integrates with your favorite tools. Don't
              miss out on experiencing the future of personal assistance. Click
              here to get started with our AI Chatbot today! Best regards,
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Button variant={"outline"}>Edit Template</Button>
            <Button>Send</Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between mb-1 text-sm capitalize">
              <p className="flex items-center gap-2">
                <FaCalendarAlt /> Created Jun 14th{" "}
              </p>
              <p className="flex items-center gap-2">
                <IoPersonSharp className="ml-auto" /> 0 customers added
              </p>
            </div>
            <CardTitle className="flex gap-4 items-center">
              Introducing Our New AI Chatbot: Your Personal Assistant!
            </CardTitle>
            <CardDescription className="truncate text-ellipsis line-clamp-3 overflow-hidden">
              Hi [Recipient's Name], We are thrilled to announce the launch of
              our latest product, the AI Chatbot! Designed to streamline your
              tasks and enhance productivity, our AI Chatbot is your personal
              assistant, available 24/7. Key Features: 24/7 Availability: Never
              miss a task with real-time assistance. Intelligent Responses:
              Understands and responds to your queries accurately. Seamless
              Integration: Easily integrates with your favorite tools. Don't
              miss out on experiencing the future of personal assistance. Click
              here to get started with our AI Chatbot today! Best regards,
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Button variant={"outline"}>Edit Template</Button>
            <Button>Send</Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between mb-1 text-sm capitalize">
              <p className="flex items-center gap-2">
                <FaCalendarAlt /> Created Jun 14th{" "}
              </p>
              <p className="flex items-center gap-2">
                <IoPersonSharp className="ml-auto" /> 0 customers added
              </p>
            </div>
            <CardTitle className="flex gap-4 items-center">
              Introducing Our New AI Chatbot: Your Personal Assistant!
            </CardTitle>
            <CardDescription className="truncate text-ellipsis line-clamp-3 overflow-hidden">
              Hi [Recipient's Name], We are thrilled to announce the launch of
              our latest product, the AI Chatbot! Designed to streamline your
              tasks and enhance productivity, our AI Chatbot is your personal
              assistant, available 24/7. Key Features: 24/7 Availability: Never
              miss a task with real-time assistance. Intelligent Responses:
              Understands and responds to your queries accurately. Seamless
              Integration: Easily integrates with your favorite tools. Don't
              miss out on experiencing the future of personal assistance. Click
              here to get started with our AI Chatbot today! Best regards,
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Button variant={"outline"}>Edit Template</Button>
            <Button>Send</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CampaignHandler;
