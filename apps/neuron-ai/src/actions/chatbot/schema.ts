import { z } from "zod";

export const chatbotSchema = z.object({
  welcomeMessage: z.string().nullable(),
  icon: z.string().nullable(),
  background: z.string().nullable(),
  textColor: z.string().nullable(),
  helpDesk: z.boolean(),
  domainId: z.number(),
});
