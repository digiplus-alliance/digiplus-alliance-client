import useFetch from '@/lib/useFetch';
import z from 'zod';

const YearlyBreakdownSchema = z.object({
  year: z.number(),
  total_applications: z.number(),
});

const BreakdownByStatusSchema = z.object({
  status: z.string(),
  count: z.number(),
});

const BreakdownByServiceTypeSchema = z.object({
  service_type: z.string(),
  count: z.number(),
});

const BreakdownByPaymentStatusSchema = z.object({
  payment_status: z.string(),
  count: z.number(),
});

const YearlySummarySchema = z.object({
  total_applications: z.number(),
  years_with_submissions: z.number(),
  average_applications_per_year: z.number(),
});

export const ApplicationsYearlyStatsSchema = z.object({
  start_year: z.number(),
  end_year: z.number(),
  summary: YearlySummarySchema,
  yearly_breakdown: z.array(YearlyBreakdownSchema),
  breakdown_by_status: z.array(BreakdownByStatusSchema),
  breakdown_by_service_type: z.array(BreakdownByServiceTypeSchema),
  breakdown_by_payment_status: z.array(BreakdownByPaymentStatusSchema),
  generated_at: z.string(),
});

export type ApplicationsYearlyStats = z.infer<typeof ApplicationsYearlyStatsSchema>;

export const useGetApplicationsYearlyStats = (startYear?: number, endYear?: number) => {
  const params = new URLSearchParams();
  if (startYear) params.append('start_year', startYear.toString());
  if (endYear) params.append('end_year', endYear.toString());
  const queryString = params.toString();
  
  return useFetch<ApplicationsYearlyStats>({
    url: queryString 
      ? `admin/applications/submission-yearly-range-stats?${queryString}` 
      : 'admin/applications/submission-yearly-range-stats',
    schema: ApplicationsYearlyStatsSchema,
    hasAuth: true,
    errorMessage: 'Failed to fetch application yearly stats.',
    successMessage: 'Application yearly stats loaded.',
    showErrorMessage: true,
    showSuccessMessage: false,
  });
};
