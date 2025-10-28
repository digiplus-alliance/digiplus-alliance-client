"use client";

import * as z from "zod";
import useSend from "@/lib/useSend";

export const PasswordChangeRequestSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export type PasswordChangeRequest = z.infer<typeof PasswordChangeRequestSchema>;

export const PasswordChangeResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export type PasswordChangeResponse = z.infer<
  typeof PasswordChangeResponseSchema
>;

export function useChangePassword() {
  return useSend<PasswordChangeRequest, PasswordChangeResponse>({
    url: "auth/change-password",
    method: "post",
    hasAuth: true,
    schema: PasswordChangeResponseSchema,
    invalidateKeys: [["api", "auth", "/auth/me"]],
  });
}
