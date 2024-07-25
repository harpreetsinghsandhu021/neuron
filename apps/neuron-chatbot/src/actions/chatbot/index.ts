"use server";

import prisma from "@repo/db/client";

export async function fetchDomainChatbot(id: string) {
  try {
    const chatbot = await prisma.chatbot.findUnique({
      where: {
        domainId: +id,
      },
    });

    const domain = await prisma.domain.findUnique({
      where: {
        id: +id,
      },
    });

    let helpDeskQuestions = null;

    if (chatbot?.helpDesk) {
      helpDeskQuestions = await prisma.helpDesk.findMany({
        where: {
          domainId: +id,
        },
        select: {
          question: true,
          answer: true,
        },
      });
    }

    return { chatbot, domain, helpDeskQuestions, status: 200 };
  } catch (err: any) {
    console.log(err);

    return { status: err.errorCode || 500, err };
  }
}

export async function createChatRoom(id: number) {
  try {
    const chatRoom = await prisma.chatRoom.create({
      data: {
        domainId: id,
        live: true,
      },
    });

    if (chatRoom) {
      return { chatRoom, status: 201 };
    }
  } catch (err: any) {
    console.log(err);

    return { status: err.errorCode || 500, err };
  }
}
