'use client';

import * as z from 'zod';
import useSend from '@/lib/useSend';

export const ChangePasswordRequestSchema = z.object({
  oldPassword: z.string().min(8),

  newPassword: z.string().min(8),
});

export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;

export const ChangePasswordResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export type ChangePasswordResponse = z.infer<typeof ChangePasswordResponseSchema>;

export function useChangePassword() {
  return useSend<ChangePasswordRequest, ChangePasswordResponse>({
    url: 'auth/change-password',
    method: 'post',
    hasAuth: true,
    schema: ChangePasswordResponseSchema,
    invalidateKeys: [['api', 'auth', '/auth/me']],
  });
}
