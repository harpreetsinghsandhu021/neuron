"use server";

import prisma from "@repo/db/client";

export async function updateGreetingMessage(message: string, id: number) {
  try {
    await prisma.chatbot.update({
      where: {
        id: id,
      },
      data: {
        welcomeMessage: message,
      },
    });

    return { status: 204 };
  } catch (err: any) {
    return { erorr: err, status: err.status || 500 };
  }
}

export async function toggleHelpDesk(state: boolean, id: number) {
  try {
    await prisma.chatbot.update({
      where: {
        id: id,
      },
      data: {
        helpDesk: state,
      },
    });

    return { status: 204 };
  } catch (err: any) {
    return { erorr: err, status: err.status || 500 };
  }
}
