"use server";
import { domain, message } from "@/hooks/useChatbot";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@repo/db/client";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function onStartChatting(
  chats: message[],
  domain: domain | null | undefined,
  message: string
) {
  try {
    const filteredQuestions = await prisma.filterQuestions.findMany({
      where: {
        domainId: domain?.id,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        domainId: domain?.id,
      },
      select: {
        name: true,
        price: true,
        image: true,
      },
    });

    const prompt = `
  You are Bard, an AI sales assistant for ${domain?.name}. You are continuing a conversation with a customer.

  Here's a List of previous conversation details: ${chats.map((conversation: message) => `Role: ${conversation.role}, Content: ${conversation.content}`).join("\n")}.

  Your product, ${domain?.name}, has a variety of features that are stored in ${filteredQuestions.map((question) => `Question: ${question.question}, Answer: ${question.answer}`).join("\n")} and 
  a variety of products that are stored in ${products.map((product) => `Name: ${product.name}, Price: ${product.price}`).join("\n")}.

  Engage in a friendly and informative conversation with the customer.  Identify their specific needs and demonstrate how ${domain?.name} can be a valuable solution. Use a conversational tone and answer any questions they may have about the product or its benefits.
  
  if the customer asks for link,make sure you give him https://${domain?.name}

  We do have live chat feature, 
  IMPORTANT - if the customer says something out of context or inapporpriate or asks for an executive. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.

  Goals:
   1) Try to get customers email,Schedule a demo or provide resources to learn more about ${domain?.name}.
   2) Try to keep answers small and crisp, not more than 70 words.
   3) Be Respectful and Never Leave Your Charcter.
   4) Refrain from greeting the customer.
    "
  `;

    const result = await model.generateContent([prompt]);

    if (result) {
      return { response: result.response.text(), status: 200 };
    }
  } catch (err) {
    console.log(err);
  }
}
