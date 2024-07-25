import { z } from "zod";
import { chatbotSchema } from "./schema";

export type ChatbotType = z.infer<typeof chatbotSchema>;
