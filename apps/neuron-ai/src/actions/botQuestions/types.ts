import { z } from "zod";
import { filterQuestionSchema } from "./schema";

export type filterQuestionType = z.infer<typeof filterQuestionSchema>;
