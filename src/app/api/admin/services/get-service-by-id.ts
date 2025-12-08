'use client';

import * as z from 'zod';
import useFetch from '@/lib/useFetch';

// Service type based on the API response
export type Service = {
  _id: string;
  name: string;
  service_type: string;
  image: string;
  images: string[];
  price: number;
  formatted_price: string;
  discounted_price?: number;
  formatted_discounted_price?: string;
  pricing_unit: string;
  short_description: string;
  long_description: string;
  createdAt: string;
  updatedAt: string;
};

// Zod schema for validation
const serviceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  service_type: z.string(),
  image: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  formatted_price: z.string(),
  discounted_price: z.number().optional(),
  formatted_discounted_price: z.string().optional(),
  pricing_unit: z.string(),
  short_description: z.string(),
  long_description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export function useGetServiceById(id: string, enabled: boolean = true) {
  return useFetch<Service>({
    url: `services/${id}`,
    hasAuth: true,
    schema: serviceSchema,
    queryKey: ['service', `service-by-${id}`],
    reactQueryOptions: {
      enabled: enabled && !!id,
      refetchOnWindowFocus: false,
    },
  });
}
