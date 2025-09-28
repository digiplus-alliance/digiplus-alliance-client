"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";
import { 
  AssessmentDetailsResponseSchema,
  type AssessmentDetailsResponse,
  AssessmentSchema,
  AssessmentModuleSchema,
  AssessmentQuestionSchema,
  ServiceRecommendationSchema
} from "@/types/assessment";

// Schema for the API response data structure
const AssessmentByIdDataSchema = z.object({
  assessment: AssessmentSchema,
  modules: z.array(AssessmentModuleSchema),
  questions: z.array(AssessmentQuestionSchema),
  service_recommendations: z.array(ServiceRecommendationSchema),
});

export type AssessmentByIdData = z.infer<typeof AssessmentByIdDataSchema>;

export function useGetAssessmentById(id: string, enabled: boolean = true) {
  return useFetch<AssessmentByIdData>({
    url: `assessments/${id}`,
    hasAuth: true,
    schema: AssessmentByIdDataSchema,
    enabled: enabled && !!id,
    queryKey: ['assessments', id],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  });
}
