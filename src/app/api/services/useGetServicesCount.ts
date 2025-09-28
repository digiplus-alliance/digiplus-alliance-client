"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";

export const ServicesCountResponseSchema = z.object({
  count: z.number(),
});

export type ServicesCountResponse = z.infer<typeof ServicesCountResponseSchema>;

export function useGetServicesCount() {
  return useFetch<ServicesCountResponse>({
    url: 'services/count',
    hasAuth: true,
    schema: ServicesCountResponseSchema,
    queryKey: ['services', 'count'],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  });
}
