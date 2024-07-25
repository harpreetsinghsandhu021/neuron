import { z } from "zod";

export const chatRoomSchema = z.object({
  id: z.number(),
  live: z.boolean(),
  mailed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  customerId: z.number().nullable(),
  domainId: z.number(),
});
