import { z } from "zod";
import { NewUserSchema } from "../new/new-user-schema";

export type EditUserSchema = z.infer<typeof EditUserSchema>
export const EditUserSchema = NewUserSchema.partial()