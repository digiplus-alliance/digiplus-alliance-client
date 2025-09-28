'use client';

import * as z from 'zod';
import useSend from '@/lib/useSend';

export const CreateApplicationRequestSchema = z.object({
  responses: z.object({
    company_name: z.string().min(1, 'Company name is required'),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
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
    reason_for_applying: z.string().min(1, 'Reason for applying is required'),
  }),
  service: z.string().min(1, 'Service is required'),
});

export type CreateApplicationRequest = z.infer<typeof CreateApplicationRequestSchema>;

export const CreateApplicationResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export type CreateApplicationResponse = z.infer<typeof CreateApplicationResponseSchema>;

export function useCreateApplication() {
  return useSend<CreateApplicationRequest, CreateApplicationResponse>({
    url: 'user/applications/apply-for-digiplus-alliance-services/submit',
    method: 'post',
    hasAuth: true,
    schema: CreateApplicationResponseSchema,
  });
}
