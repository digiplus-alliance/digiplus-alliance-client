"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";

export const ApplicationStatusCountsResponseSchema = z.object({
  Submitted: z.number(),
  "Being Processed": z.number(),
  Approved: z.number(),
  Rejected: z.number(),
  Completed: z.number(),
});

export type ApplicationStatusCountsResponse = z.infer<typeof ApplicationStatusCountsResponseSchema>;

export function useGetApplicationStatusCounts() {
  return useFetch<ApplicationStatusCountsResponse>({
    url: 'user/applications/submissions/status-counts',
    hasAuth: true,
    schema: ApplicationStatusCountsResponseSchema,
    queryKey: ['user', 'applications', 'status-counts'],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
    },
  });
}
