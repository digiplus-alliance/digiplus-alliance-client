import useFetch from '@/lib/useFetch';
import z from 'zod';

const ApplicationDetailSchema = z.object({
  _id: z.string(),
  service_type: z.string(),
  status: z.string(),
  payment_status: z.string(),
  created_date: z.string(),
  created_time: z.string(),
});

const MonthlyBreakdownSchema = z.object({
  month: z.string(),
  month_number: z.number(),
  year: z.number(),
  total_applications: z.number(),
  application_details: z.array(ApplicationDetailSchema),
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

const SummarySchema = z.object({
  total_applications: z.number(),
  months_with_submissions: z.number(),
  average_applications_per_month: z.number(),
});

export const ApplicationsMonthlyStatsSchema = z.object({
  year: z.number(),
  summary: SummarySchema,
  monthly_breakdown: z.array(MonthlyBreakdownSchema),
  breakdown_by_status: z.array(BreakdownByStatusSchema),
  breakdown_by_service_type: z.array(BreakdownByServiceTypeSchema),
  breakdown_by_payment_status: z.array(BreakdownByPaymentStatusSchema),
  generated_at: z.string(),
  generated_date: z.string(),
  generated_time: z.string(),
});

export type ApplicationsMonthlyStats = z.infer<typeof ApplicationsMonthlyStatsSchema>;

export const useGetApplicationsMonthlyStats = (year?: number) =>
  useFetch<ApplicationsMonthlyStats>({
    url: year ? `admin/applications/submission-stats?year=${year}` : 'admin/applications/submission-stats',
    schema: ApplicationsMonthlyStatsSchema,
    hasAuth: true,
    errorMessage: 'Failed to fetch application submission stats.',
    successMessage: 'Application submission stats loaded.',
    showErrorMessage: true,
    showSuccessMessage: false,
  });
