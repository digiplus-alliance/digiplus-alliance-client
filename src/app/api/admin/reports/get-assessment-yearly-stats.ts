import useFetch from '@/lib/useFetch';
import z from 'zod';

const YearlyBreakdownSchema = z.object({
  year: z.number(),
  average_score: z.number(),
  submissions: z.number(),
});

const YearlySummarySchema = z.object({
  total_submissions: z.number(),
  years_with_submissions: z.number(),
});

export const AssessmentYearlyStatsSchema = z.object({
  start_year: z.number(),
  end_year: z.number(),
  summary: YearlySummarySchema,
  yearly_breakdown: z.array(YearlyBreakdownSchema),
  generated_at: z.string(),
});

export type AssessmentYearlyStats = z.infer<typeof AssessmentYearlyStatsSchema>;

export const useGetAssessmentYearlyStats = (startYear?: number, endYear?: number) => {
  const params = new URLSearchParams();
  if (startYear) params.append('start_year', startYear.toString());
  if (endYear) params.append('end_year', endYear.toString());
  const queryString = params.toString();
  
  return useFetch<AssessmentYearlyStats>({
    url: queryString
      ? `api/assessments/yearlyRangeStats?${queryString}`
      : 'api/assessments/yearlyRangeStats',
    schema: AssessmentYearlyStatsSchema,
    hasAuth: true,
    errorMessage: 'Failed to fetch assessment yearly stats.',
    successMessage: 'Assessment yearly stats loaded.',
    showErrorMessage: true,
    showSuccessMessage: false,
  });
};
