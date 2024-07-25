"use server";
import prisma from "@repo/db/client";

export async function getAllChatRooms(slug: string | null) {
  try {
    const domain = await prisma.domain.findFirst({
      where: {
        slug: slug as string,
      },
      select: {
        id: true,
      },
    });

    const rooms = await prisma.chatRoom.findMany({
      where: {
        domainId: domain?.id,
      },
    });

    if (rooms) {
      return { rooms, status: 200 };
    }
  } catch (err: any) {
    console.log(err);

    return { erorr: err, status: err.status || 500 };
  }
}

export async function toggleRealtime(id: number, state: boolean) {
  try {
    const updated = await prisma.chatRoom.update({
      where: {
        id: id,
      },
      data: {
        live: state,
      },
      select: {
        id: true,
        live: true,
      },
    });

    if (updated) {
      return { updated, status: 204 };
    }
  } catch (err: any) {
    console.log(err);

    return { erorr: err, status: err.status || 500 };
  }
}
