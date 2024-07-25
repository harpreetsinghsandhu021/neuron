import { z } from "zod";

export const domainSchema = z.object({
  name: z.string().includes(".com", { message: "not a valid domain" }),
  icon: z.string(),
  slug: z.string(),
});
