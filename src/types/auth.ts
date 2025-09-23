import { z } from "zod";

export const signUpSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  business_name: z.string().min(1, "Business name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(
      /(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?])/,
      "Password must contain at least one symbol"
    ),
  role: z.string().min(1, "Role is required"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
