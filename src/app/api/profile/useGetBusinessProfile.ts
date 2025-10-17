'use client';

import * as z from 'zod';
import useFetch from '@/lib/useFetch';
import { useAuthStore } from '@/store/auth';

// Business Profile Response Schema
export const BusinessProfileResponseSchema = z.object({
  business_name: z.string(),
  industry: z.string().optional(),
  email: z.string().email(),
  phone_number: z.string().optional(),
  company_website: z.string().optional(),
  company_address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  message: z.string(),
  success: z.boolean(),
});

export type BusinessProfileResponse = z.infer<typeof BusinessProfileResponseSchema>;

// Business Profile Data Schema (without message and success)
export const BusinessProfileDataSchema = z.object({
  business_name: z.string(),
  industry: z.string().optional(),
  email: z.string().email(),
  phone_number: z.string().optional(),
  company_website: z.string().optional(),
  company_address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  logo_url: z.string().optional(),
});

export type BusinessProfileData = z.infer<typeof BusinessProfileDataSchema>;

export function useGetBusinessProfile() {
  const { user } = useAuthStore();

  return useFetch<BusinessProfileData>({
    url: user?.role === 'admin' ? '/profile/admin' : 'profile/business',
    hasAuth: true,
    schema: BusinessProfileDataSchema,
    queryKey: ['profile', 'business'],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
    },
  });
}
