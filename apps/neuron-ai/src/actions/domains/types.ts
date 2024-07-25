import { z } from "zod";
import { domainSchema } from "./schema";

export type DomainType = z.infer<typeof domainSchema>;
