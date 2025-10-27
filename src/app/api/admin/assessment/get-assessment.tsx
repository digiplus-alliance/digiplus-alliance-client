import useFetch from "@/lib/useFetch";
import * as z from "zod";
import {
  AssessmentSchema,
  AssessmentModuleSchema,
  AssessmentQuestionSchema,
  ServiceRecommendationSchema,
} from "@/types/assessment";

// Schema for the API response data structure
const AssessmentDataSchema = z.object({
  assessment: AssessmentSchema,
  modules: z.array(AssessmentModuleSchema),
  questions: z.array(AssessmentQuestionSchema),
  service_recommendations: z.array(ServiceRecommendationSchema),
});

export type AssessmentData = z.infer<typeof AssessmentDataSchema>;

export const useGetAssessment = ({ id }: { id: string }) =>
  useFetch<AssessmentData>({
    url: `api/assessments/${id}`,
    hasAuth: true,
    schema: AssessmentDataSchema,
    errorMessage: "Failed to fetch assessment.",
    showErrorMessage: true,
    showSuccessMessage: false,
    queryKey: ["assessment", id],
  });
