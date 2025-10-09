'use client';

import * as z from 'zod';
import useFetch from '@/lib/useFetch';

export const ServiceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  service_type: z.string(),
  image: z.string(),
  images: z.array(z.string()).optional(),
  price: z.number(),
  formatted_price: z.string().optional(),
  discounted_price: z.number().optional(),
  formatted_discounted_price: z.string().optional(),
  pricing_unit: z.string().optional(),
  short_description: z.string().optional(),
  long_description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AllServicesResponseSchema = z.array(ServiceSchema);

export type AllServicesResponse = z.infer<typeof AllServicesResponseSchema>;

export function useGetAllServices() {
  return useFetch<AllServicesResponse>({
    url: 'services',
    hasAuth: true,
    schema: AllServicesResponseSchema,
    queryKey: ['all-services'],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  });
}
