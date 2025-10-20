'use client';

import * as z from 'zod';
import useSend from '@/lib/useSend';

export const CreateApplicationRequestSchema = z.object({
  responses: z.object({}),
  service: z.string().min(1, 'Service is required'),
});

export type CreateApplicationRequest = z.infer<typeof CreateApplicationRequestSchema>;

export const CreateApplicationResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export type CreateApplicationResponse = z.infer<typeof CreateApplicationResponseSchema>;

export function useCreateApplication(slug: string) {
  return useSend<CreateApplicationRequest, CreateApplicationResponse>({
    url: 'user/applications/' + slug + '/submit',
    method: 'post',
    hasAuth: true,
    schema: CreateApplicationResponseSchema,
  });
}
