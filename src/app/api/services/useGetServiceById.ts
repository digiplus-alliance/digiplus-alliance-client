"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";
import { Service } from "@/types/services";

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

export type ServiceResponse = z.infer<typeof ServiceSchema>;

export function useGetServiceById(id: string, enabled: boolean = true) {
  return useFetch<Service>({
    url: `services/${id}`,
    hasAuth: true,
    schema: ServiceSchema,
    enabled: enabled && !!id,
    queryKey: ['services', id],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  });
}
