import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contains at least 3 characters." })
    .max(20, "Name must length must be 20 or less than 20.")
    .trim(),
  email: z.string().email().nonempty(),
  password: z.string().min(8, "Password length must be at least 8."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
