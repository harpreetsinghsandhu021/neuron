import { z } from "zod";
import { formSchema, loginSchema } from "./schema";

export type authType = z.infer<typeof formSchema>;
export type loginType = z.infer<typeof loginSchema>;
