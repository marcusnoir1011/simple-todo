import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(8, "Password length must be at least 8."),
});

export type LoginInput = z.infer<typeof loginSchema>;
