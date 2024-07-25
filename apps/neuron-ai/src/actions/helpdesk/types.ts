import { z } from "zod";
import { helpDeskSchema } from "./schema";

export type helpDeskType = z.infer<typeof helpDeskSchema>;
