"use server";

import prisma from "@repo/db/client";
import { filterQuestionType } from "./types";

export async function createfilterQuestion(
  values: filterQuestionType,
  id: number | undefined
) {
  try {
    const newHelpDeskQuery = await prisma.filterQuestions.create({
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
