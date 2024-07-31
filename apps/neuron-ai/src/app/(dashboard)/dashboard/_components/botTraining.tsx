import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "flowbite-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { helpDeskSchema } from "@/actions/helpdesk/schema";
import { helpDeskType } from "@/actions/helpdesk/types";
import { createHelpDeskQuestion } from "@/actions/helpdesk";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next13-progressbar";
import { filterQuestionType } from "@/actions/botQuestions/types";
import { filterQuestionSchema } from "@/actions/botQuestions/schema";
import { createfilterQuestion } from "@/actions/botQuestions";

interface BotTrainingProps {
  helpDesk: helpDeskType[] | null | undefined;
  id: number | undefined;
  filteredQuestions:
    | { question: string; answer: string | null }[]
    | null
    | undefined;
}

const BotTraining = ({ id, helpDesk, filteredQuestions }: BotTrainingProps) => {
  const router = useRouter();

  const form = useForm<helpDeskType>({
    resolver: zodResolver(helpDeskSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const formFilterQuestions = useForm<filterQuestionType>({
    resolver: zodResolver(filterQuestionSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  async function onSubmit(values: helpDeskType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.rn

    const res = await createHelpDeskQuestion(values, id);
    console.log(res);
    if (res.status === 201) {
      router.refresh();
      toast.success("Help Desk Question created");
    }
  }

  async function onSubmitFilterQuestions(values: filterQuestionType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.rn

    const res = await createfilterQuestion(values, id);
    console.log(res);
    if (res.status === 201) {
      router.refresh();
      toast.success("Bot Filter Question created");
    }
  }

  return (
    <>
      <Tabs defaultValue="helpdesk" className="w-full">
        <TabsList className="grid w-full mb-2 grid-cols-2">
          <TabsTrigger value="helpdesk">Help Desk</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>
        <TabsContent className="flex m-0" value="helpdesk">
          <Card className="flex-1 rounded-none rounded-l-xl">
            <CardHeader>
              <CardTitle> Help Desk</CardTitle>{" "}
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-1">
                    <p>Add a question that you believe is frequently asked.</p>
                    <FormField
                      control={form.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Question</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type your question"
                              className=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-1 mt-4">
                    <p>The answer for the question above</p>

                    <FormField
                      control={form.control}
                      name="answer"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Answer</FormLabel>
                          <FormControl>
                            <Textarea
                              id="current"
                              placeholder="Type your answer"
                              className="resize-none"
                              rows={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="mt-8 w-full">
                    Submit
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className=" rounded-none rounded-r-xl dark:bg-gray-800  flex-1">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 overflow-scroll">
              {helpDesk?.map((h, i) => (
                <FAQ key={i} question={h.question} answer={h.answer} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="flex m-0" value="questions">
          <Card className="flex-1 rounded-none rounded-l-xl">
            <CardHeader>
              <CardTitle> Bot Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...formFilterQuestions}>
                <form
                  onSubmit={formFilterQuestions.handleSubmit(
                    onSubmitFilterQuestions
                  )}
                >
                  <div className="space-y-1">
                    <p>Add a question that you want your chatbot to ask</p>
                    <FormField
                      control={formFilterQuestions.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Question</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type your question"
                              className=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-1 mt-4">
                    <p>The answer for the question above</p>

                    <FormField
                      control={formFilterQuestions.control}
                      name="answer"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Answer</FormLabel>
                          <FormControl>
                            <Textarea
                              id="current"
                              placeholder="Type your answer"
                              className="resize-none"
                              rows={6}
                              // defaultValue={field.value as string}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="mt-8 w-full">
                    Submit
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className=" rounded-none rounded-r-xl dark:bg-gray-800  flex-1">
            <CardHeader>
              <CardTitle>Previous Questions</CardTitle>
              <CardContent className="max-h-96 overflow-scroll">
                {filteredQuestions?.map((h, i) => (
                  <FAQ
                    key={i}
                    question={h.question}
                    answer={h.answer as string}
                  />
                ))}
              </CardContent>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="capitalize text-left">
          {question}
        </AccordionTrigger>
        <AccordionContent>{answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default BotTraining;
