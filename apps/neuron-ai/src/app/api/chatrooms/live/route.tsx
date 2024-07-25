import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const slug = url.searchParams.get("slug");

  const domain = await prisma.domain.findFirst({
    where: {
      slug: slug as string,
    },
    select: {
      id: true,
    },
  });

  try {
    const liveChatRooms = await prisma.chatRoom.findMany({
      where: {
        live: true,
        domainId: domain?.id,
      },
    });

    if (liveChatRooms) {
      return NextResponse.json(liveChatRooms, { status: 200 });
    }
  } catch (err: any) {
    NextResponse.json({ err: err }, { status: err.status });
  }
}
