import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "this above field is required" }),
  price: z.number().min(1).max(500000),
  image: z.string(),
});
