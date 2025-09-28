"use client";

import * as z from "zod";
import useSend from "@/lib/useSend";

export const VerificationRequestSchema = z.object({
  email: z.string().email().min(6),
});

export type VerificationRequest = z.infer<typeof VerificationRequestSchema>;

export const VerificationResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export type VerificationResponse = z.infer<typeof VerificationResponseSchema>;

export function useForgotPassword() {
  return useSend<VerificationRequest, VerificationResponse>({
    url: "auth/forgot-password",
    method: "post",
    hasAuth: false,
    schema: VerificationResponseSchema,
    invalidateKeys: [["api", "auth", "/auth/me"]],
  });
}
