import { z } from "zod";

export const helpDeskSchema = z.object({
  question: z.string().min(1, { message: "this field cannot be empty" }),
  answer: z.string().min(10),
});
