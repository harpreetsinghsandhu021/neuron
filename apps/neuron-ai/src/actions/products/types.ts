import { z } from "zod";
import { productSchema } from "./schema";

export type productType = z.infer<typeof productSchema>;
