'use client';

import * as z from 'zod';
import useSend from '@/lib/useSend';

export const UpdateProfileRequestSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().min(1, 'Last name is required').max(100),
  business_name: z.string().min(1, 'Company name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  website: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: 'Invalid website URL',
      }
    ),
  address: z.string().optional(),
  role: z.string().optional(),
});

export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;

export const UpdateProfileResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
  user: z
    .object({
      _id: z.string(),
      email: z.string(),
      role: z.string(),
      business_name: z.string().optional().nullable(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      profile_picture: z.string().optional().nullable(),
      is_verified: z.boolean(),
      locked_until: z.string().optional().nullable(),
      is_in_recovery: z.boolean(),
      is_verified_for_recovery: z.boolean(),
      login_attempts: z.number(),
      is_active: z.boolean(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
      __v: z.number().optional(),
      onboarded: z.boolean().optional(),
      phone: z.string().optional(),
      website: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
});

export type UpdateProfileResponse = z.infer<typeof UpdateProfileResponseSchema>;

export function useUpdateProfile() {
  return useSend<UpdateProfileRequest, UpdateProfileResponse>({
    url: '/api/profile/business',
    method: 'PATCH',
    hasAuth: false, // Set to false since we're using Next.js API route
    baseUrl: '', // Use empty baseUrl to use the local API route
    schema: UpdateProfileResponseSchema,
    invalidateKeys: [['api', 'auth', '/auth/me'], ['profile']],
    showSuccessMessage: true,
    successMessage: 'Profile updated successfully',
    showErrorMessage: true,
  });
}
