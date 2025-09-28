"use client";

import * as z from "zod";
import useSend from "@/lib/useSend";

export const ContactFormRequestSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"), 
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
}).strict();

export const ContactFormResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type ContactFormRequest = z.infer<typeof ContactFormRequestSchema>;
export type ContactFormResponse = z.infer<typeof ContactFormResponseSchema>;

export function useContactForm() {
  return useSend<ContactFormRequest, ContactFormResponse>({
    url: "contact",
    method: "post",
    hasAuth: false,
    schema: ContactFormResponseSchema,
    successMessage: "Thank you for contacting us. We will get back to you soon.",
    showSuccessMessage: true,
    showErrorMessage: true,
  });
}
