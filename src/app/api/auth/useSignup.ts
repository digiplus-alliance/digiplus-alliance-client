"use client";

import * as z from "zod";
import useSend from "@/lib/useSend";

export const SignupRequestSchema = z.object({
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  business_name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.string().min(1),
});

export type SignupRequest = z.infer<typeof SignupRequestSchema>;

export const SignupResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(), 
});

export type SignupResponse = z.infer<typeof SignupResponseSchema>;

export function useSignup() {
  return useSend<SignupRequest, SignupResponse>({
    url: "auth/signup",
    method: "post",
    hasAuth: false,
    schema: SignupResponseSchema,
    invalidateKeys: [["api", "auth", "/auth/me"]],
  });
}
