import prisma from "@repo/db/client";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(body);

    const newMessage = await prisma.chatMessage.create({
      data: {
        message: body.message,
        chatRoomId: body.roomId,
        role: body.role || "user",
      },
    });

    if (newMessage) {
      return NextResponse.json(newMessage, { status: 201 });
    }
  } catch (err: any) {
    NextResponse.json({ err: err }, { status: err.status });
  }
}
