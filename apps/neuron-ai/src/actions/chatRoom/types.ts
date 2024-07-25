import { z } from "zod";
import { chatRoomSchema } from "./schema";

export type chatRoomType = z.infer<typeof chatRoomSchema>;
