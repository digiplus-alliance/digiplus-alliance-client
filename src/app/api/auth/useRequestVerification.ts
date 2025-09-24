"use client";

import * as z from "zod";
import useSend from "@/lib/useSend";

export const VerificationRequestSchema = z.object({}).strict();
export const VerificationResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export type VerificationRequest = z.infer<typeof VerificationRequestSchema>;
export type VerificationResponse = z.infer<typeof VerificationResponseSchema>;

export function useRequestVerification() {
  return useSend<VerificationRequest, VerificationResponse>({
    url: "auth/request-verification",
    method: "post",
    hasAuth: false,
    schema: VerificationResponseSchema,
  });
}
