"use client";

import * as z from "zod";
import useSend from "@/lib/useSend";

export const ResetPasswordRequestSchema = z.object({
  password: z.string().min(1),
  resetToken: z.string().min(1),
});

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

export const ResetPasswordResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export type ResetPasswordResponse = z.infer<typeof ResetPasswordResponseSchema>;

export function useResetPassword() {
  return useSend<ResetPasswordRequest, ResetPasswordResponse>({
    url: "auth/reset-password",
    method: "post",
    hasAuth: false,
    schema: ResetPasswordResponseSchema,
    invalidateKeys: [["api", "auth", "/auth/me"]],
  });
}
