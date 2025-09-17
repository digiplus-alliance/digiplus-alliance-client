"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";

export const VerificationResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export type VerificationResponse = z.infer<typeof VerificationResponseSchema>;

export function useRequestVerification(code?: string | null) {
  return useFetch<VerificationResponse>({
    url: "auth/request-verification",
    hasAuth: false,
    schema: VerificationResponseSchema,
  });
}
