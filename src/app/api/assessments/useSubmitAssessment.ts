"use client";

import * as z from "zod";
import useSend from "@/lib/useSend";
import { 
  AssessmentSubmissionRequestSchema,
  AssessmentSubmissionResponseSchema,
  type AssessmentSubmissionRequest,
  type AssessmentSubmissionResponse
} from "@/types/assessment";

// Response data schema for the submission
const SubmissionDataSchema = z.object({
  submission_id: z.string().optional(),
  score: z.number().optional(),
  recommendations: z.array(z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
  })).optional(),
});

export type SubmissionData = z.infer<typeof SubmissionDataSchema>;

export const useSubmitAssessment = () => {
  return useSend<AssessmentSubmissionRequest, SubmissionData>({
    url: "assessments/submit",
    method: "post",
    hasAuth: true,
    schema: SubmissionDataSchema,
    successMessage: "Assessment submitted successfully",
    invalidateKeys: [['assessments']],
  });
};
