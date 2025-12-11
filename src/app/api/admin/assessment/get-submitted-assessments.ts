"use client";

import useFetch from "@/lib/useFetch";
import z from "zod";

// Schema for assessment in submission
const SubmissionAssessmentSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  total_possible_points: z.number(),
  is_published: z.boolean(),
}).passthrough();

// Schema for user in submission
const SubmissionUserSchema = z.object({
  _id: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
  business_name: z.string().optional(),
  profile_picture: z.string().optional(),
}).passthrough();

// Schema for scores in submission
const SubmissionScoresSchema = z.object({
  user_score: z.number(),
  max_possible_score: z.number(),
  percentage_score: z.number(),
}).passthrough();

// Schema for individual submission
const SubmissionSchema = z.object({
  submission_id: z.string(),
  assessment: SubmissionAssessmentSchema,
  user: SubmissionUserSchema,
  scores: SubmissionScoresSchema,
  completed_at: z.string(),
  completed_date: z.string(),
  completed_time: z.string(),
}).passthrough();

// Schema for pagination
const PaginationSchema = z.object({
  current_page: z.number(),
  per_page: z.number(),
  total_items: z.number(),
  total_pages: z.number(),
  has_next_page: z.boolean(),
  has_previous_page: z.boolean(),
}).passthrough();

// Schema for statistics
const StatisticsSchema = z.object({
  total_submissions: z.number(),
  average_score: z.number(),
  highest_score: z.number(),
  lowest_score: z.number(),
  average_percentage: z.number(),
}).passthrough();

// Schema for the main response (API returns data wrapped in a data field)
const SubmittedAssessmentsResponseSchema = z.object({
  submissions: z.array(SubmissionSchema),
  pagination: PaginationSchema,
  statistics: StatisticsSchema,
  filters_applied: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  generated_at: z.string(),
}).passthrough();

// Type exports
export type SubmissionAssessment = z.infer<typeof SubmissionAssessmentSchema>;
export type SubmissionUser = z.infer<typeof SubmissionUserSchema>;
export type SubmissionScores = z.infer<typeof SubmissionScoresSchema>;
export type Submission = z.infer<typeof SubmissionSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type Statistics = z.infer<typeof StatisticsSchema>;
export type SubmittedAssessmentsResponse = z.infer<
  typeof SubmittedAssessmentsResponseSchema
>;

// Hook to get all submitted assessments
export function useGetAllSubmittedAssessments({
  page,
  limit,
  searchQuery,
}: {
  page: number;
  limit: number;
  searchQuery?: string;
}) {
  const url = `api/assessments/admin/submitted-assessments?page=${page}&limit=${limit}${
    searchQuery ? `&search=${searchQuery}` : ""
  }`;

  return useFetch<SubmittedAssessmentsResponse>({
    url,
    // queryKey: ["submitted-assessments", String(page), String(limit), searchQuery || ""],
    schema: SubmittedAssessmentsResponseSchema,
    hasAuth: true,
    errorMessage: "Failed to fetch submitted assessments.",
    showErrorMessage: true,
    showSuccessMessage: false,
  });
}
