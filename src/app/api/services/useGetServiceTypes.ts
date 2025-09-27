"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";

export const ServiceTypesResponseSchema = z.object({
  service_types: z.array(z.string()),
});

export type ServiceTypesResponse = z.infer<typeof ServiceTypesResponseSchema>;

export function useGetServiceTypes() {
  return useFetch<ServiceTypesResponse>({
    url: 'services/types',
    hasAuth: true,
    schema: ServiceTypesResponseSchema,
    queryKey: ['services', 'types'],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 30, // 30 minutes - service types don't change often
    },
  });
}
