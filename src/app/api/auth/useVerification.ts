"use client";

import * as z from "zod";
import useSend from "@/lib/useSend";

export const VerificationRequestSchema = z.object({
  code: z.string().min(6),
});

export type VerificationRequest = z.infer<typeof VerificationRequestSchema>;

export const VerificationResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export type VerificationResponse = z.infer<typeof VerificationResponseSchema>;

export function useVerification() {
  return useSend<VerificationRequest, VerificationResponse>({
    url: "auth/verify-email",
    method: "post",
    hasAuth: false,
    schema: VerificationResponseSchema,
    invalidateKeys: [["api", "auth", "/auth/me"]],
  });
}
