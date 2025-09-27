'use client';

import * as z from 'zod';
import useFetch from '@/lib/useFetch';
import { Service, ServicesFilters } from '@/types/services';

export const ServiceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  service_type: z.string(),
  image: z.string(),
  price: z.number(),
  subtitle: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ServicesResponseSchema = z.array(ServiceSchema);

export type ServicesResponse = z.infer<typeof ServicesResponseSchema>;

export function useGetServices(filters?: ServicesFilters) {
  const queryParams = new URLSearchParams();

  if (filters?.search) {
    queryParams.append('search', filters.search);
  }
  if (filters?.minPrice !== undefined) {
    queryParams.append('minPrice', filters.minPrice.toString());
  }
  if (filters?.maxPrice !== undefined) {
    queryParams.append('maxPrice', filters.maxPrice.toString());
  }

  const queryString = queryParams.toString();
  const url = queryString ? `services?${queryString}` : 'services';

  return useFetch<Service[]>({
    url,
    hasAuth: true,
    schema: ServicesResponseSchema,
    queryKey: ['services', filters ? JSON.stringify(filters) : ''],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  });
}
