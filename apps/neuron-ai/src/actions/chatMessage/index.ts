"use server";

import prisma from "@repo/db/client";

export async function getChatRoomMessages(id: number) {
  try {
    const messages = await prisma.chatMessage.findMany({
      where: {
        chatRoomId: id,
      },
    });

    if (messages) {
      return { messages, status: 200 };
    }
  } catch (err: any) {
    console.log(err);

    return { erorr: err, status: err.status || 500 };
  }
}
