"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";
import { 
  AvailableAssessmentsResponseSchema,
  type AvailableAssessmentsResponse,
  type Assessment
} from "@/types/assessment";

export function useGetAvailableAssessments() {
  return useFetch<Assessment[]>({
    url: 'assessments/available',
    hasAuth: true,
    schema: z.array(z.object({
      _id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      instruction: z.string().optional(),
      total_possible_points: z.number().default(0),
    })),
    queryKey: ['assessments', 'available'],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  });
}
