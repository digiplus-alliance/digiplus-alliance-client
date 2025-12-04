import useFetch from '@/lib/useFetch';
import z from 'zod';

const SubmissionDetailSchema = z.object({
  assessment_name: z.string(),
  user_score: z.number(),
  max_possible_score: z.number(),
  percentage_score: z.number(),
  completed_date: z.string(),
  completed_time: z.string(),
});

const MonthlyBreakdownSchema = z.object({
  month: z.string(),
  year: z.number(),
  average_score: z.number(),
  submissions: z.number(),
  submission_details: z.array(SubmissionDetailSchema),
});

const SummarySchema = z.object({
  total_submissions: z.number(),
  overall_average_score: z.number(),
  months_with_submissions: z.number(),
});

export const AssessmentMonthlyStatsSchema = z.object({
  year: z.number(),
  summary: SummarySchema,
  monthly_breakdown: z.array(MonthlyBreakdownSchema),
  generated_at: z.string(),
  generated_date: z.string(),
  generated_time: z.string(),
});

export type AssessmentMonthlyStats = z.infer<typeof AssessmentMonthlyStatsSchema>;

export const useGetAssessmentMonthlyStats = (year?: number) =>
  useFetch<AssessmentMonthlyStats>({
    url: year ? `api/assessments/stats?year=${year}` : 'api/assessments/stats',
    schema: AssessmentMonthlyStatsSchema,
    hasAuth: true,
    errorMessage: 'Failed to fetch assessment submission stats.',
    successMessage: 'Assessment submission stats loaded.',
    showErrorMessage: true,
    showSuccessMessage: false,
  });