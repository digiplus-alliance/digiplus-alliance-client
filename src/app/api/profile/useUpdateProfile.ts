'use client';

import * as z from 'zod';
import useSend from '@/lib/useSend';

export const UpdateProfileRequestSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().min(1, 'Last name is required').max(100),
  org_logo: z.any().optional(), // File upload
  business_name: z.string().min(1, 'Business name is required').max(100),
  industry: z.string().min(1, 'Industry is required').max(100),
  email: z.string().email('Invalid email address'),
  phone_number: z.string().optional(),
  company_website: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        // Allow plain domain names like "example.com" or full URLs
        const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
        const urlPattern = /^https?:\/\/.+/;
        return domainPattern.test(val) || urlPattern.test(val);
      },
      {
        message: 'Invalid website URL or domain name',
      }
    ),
  company_address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
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
