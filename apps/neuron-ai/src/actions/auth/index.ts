"use server";

import { z } from "zod";
import { authType } from "./types";
import prisma from "@repo/db/client";

export async function signUpCustom(values: authType, clerkId: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        fullName: values.fullName,
        clerkId: clerkId,
        type: values.type,
      },
    });

    return { newUser, status: 201 };
  } catch (err: any) {
    return { message: err, status: err.status || 500 };
  }
}

export async function getUser(clerkId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        clerkId: clerkId,
      },
    });
    return { user, status: 200 };
  } catch (err: any) {
    return { message: err, status: err.status || 500 };
  }
}
