"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";

export const MetricsSchema = z.object({
  totalUsers: z.number(),
  totalApplications: z.number(),
  totalAssessmentsCompleted: z.number(),
});

export const AllMetricsResponseSchema = MetricsSchema;

export type AllMetricsResponse = z.infer<typeof AllMetricsResponseSchema>;

export function useGetAllMetrics() {
  return useFetch<AllMetricsResponse>({
    url: "admin/users/metrics",
    hasAuth: true,
    schema: AllMetricsResponseSchema,
  });
}
