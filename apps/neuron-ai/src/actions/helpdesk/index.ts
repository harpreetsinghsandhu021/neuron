"use server";

import prisma from "@repo/db/client";
import { helpDeskType } from "./types";

export async function createHelpDeskQuestion(
  values: helpDeskType,
  id: number | undefined
) {
  try {
    const newHelpDeskQuery = await prisma.helpDesk.create({
      data: {
        question: values.question,
        answer: values.answer,
        domainId: id as number,
      },
    });

    return { newHelpDeskQuery, status: 201 };
  } catch (err: any) {
    return { erorr: err, status: err.status || 500 };
  }
}
