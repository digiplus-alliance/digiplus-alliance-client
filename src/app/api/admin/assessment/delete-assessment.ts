import useSend from "@/lib/useSend";
import { z } from "zod";

// Define the deleted items schema
const DeletedItemsSchema = z.object({
  questions: z.number(),
  modules: z.number(),
  recommendations: z.number(),
});

// Define the response data schema
const DeleteAssessmentResponseSchema = z.object({
  deleted_assessment_id: z.string(),
  deleted_assessment_title: z.string(),
  deleted_items: DeletedItemsSchema,
});

// Type definitions
export type DeletedItems = z.infer<typeof DeletedItemsSchema>;
export type DeleteAssessmentResponse = z.infer<typeof DeleteAssessmentResponseSchema>;

// Custom hook that takes the assessment ID as parameter
export const useDeleteAssessment = (id: string) => {
  return useSend<void, DeleteAssessmentResponse>({
    url: `api/assessments/${id}`,
    method: "delete",
    hasAuth: true,
    schema: DeleteAssessmentResponseSchema,
    successMessage: "Assessment deleted successfully",
    invalidateKeys: ["allAssessments"],
  });
};
