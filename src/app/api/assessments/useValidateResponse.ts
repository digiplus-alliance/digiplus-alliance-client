'use client';

import * as z from 'zod';
import useSend from '@/lib/useSend';

export const ValidationRequestSchema = z.object({
  formId: z.string(),
  formType: z.string(),
  fields: z.array(
    z.object({
      questionIdentifier: z.string(),
      value: z.any(),
    })
  ),
});

export type ValidationRequest = z.infer<typeof ValidationRequestSchema>;

export const ValidationResponseSchema = z.object({
  isValid: z.boolean(),
  totalFields: z.number(),
  validFields: z.number(),
  invalidFields: z.number(),
  formType: z.string(),
  results: z.array(
    z.object({
      isValid: z.boolean(),
      errors: z.array(z.any()),
      field: z.string(),
      formType: z.string(),
    })
  ),
});

export type ValidationResponse = z.infer<typeof ValidationResponseSchema>;

export function useValidateResponse() {
  return useSend<ValidationRequest, ValidationResponse>({
    url: 'validation/validate-batch',
    method: 'post',
    hasAuth: true,
    schema: ValidationResponseSchema,
    invalidateKeys: [['api', 'auth', '/auth/me']],
  });
}
