'use client';

import useFetch from '@/lib/useFetch';
import z from 'zod';

// Schema for assessment statistics
const AssessmentStatisticsSchema = z.object({
  total_questions: z.number(),
  total_modules: z.number(),
  total_possible_points: z.number(),
  service_recommendations_count: z.number(),
});

// Schema for individual assessment
const AssessmentSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  is_active: z.boolean(),
  created_by: z.string(),
  total_possible_points: z.number(),
  is_published: z.boolean(),
  is_submitted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
  statistics: AssessmentStatisticsSchema,
}).passthrough();

// Schema for the response array
export const AllAssessmentsResponseSchema = z.array(AssessmentSchema);

// Type exports
export type AssessmentStatistics = z.infer<typeof AssessmentStatisticsSchema>;
export type Assessment = z.infer<typeof AssessmentSchema>;
export type AllAssessmentsResponse = z.infer<typeof AllAssessmentsResponseSchema>;

// Hook to get all assessments
export function useGetAllAssessments() {
  return useFetch<AllAssessmentsResponse>({
    url: 'api/assessments',
    schema: AllAssessmentsResponseSchema,
    hasAuth: true,
    errorMessage: 'Failed to fetch assessments.',
    showErrorMessage: true,
    showSuccessMessage: false,
    queryKey: ['allAssessments'],
  });
}
