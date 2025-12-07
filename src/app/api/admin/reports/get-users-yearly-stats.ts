import useFetch from '@/lib/useFetch';
import z from 'zod';

const YearlyBreakdownSchema = z.object({
  year: z.number(),
  total_users: z.number(),
});

const YearlySummarySchema = z.object({
  total_new_users: z.number(),
  years_with_registrations: z.number(),
  average_users_per_year: z.number(),
});

export const UsersYearlyStatsSchema = z.object({
  start_year: z.number(),
  end_year: z.number(),
  summary: YearlySummarySchema,
  yearly_breakdown: z.array(YearlyBreakdownSchema),
  generated_at: z.string(),
});

export type UsersYearlyStats = z.infer<typeof UsersYearlyStatsSchema>;

export const useGetUsersYearlyStats = (startYear?: number, endYear?: number) => {
  const params = new URLSearchParams();
  if (startYear) params.append('start_year', startYear.toString());
  if (endYear) params.append('end_year', endYear.toString());
  const queryString = params.toString();
  
  return useFetch<UsersYearlyStats>({
    url: queryString 
      ? `admin/users/registration-yearly-range-stats?${queryString}` 
      : 'admin/users/registration-yearly-range-stats',
    schema: UsersYearlyStatsSchema,
    hasAuth: true,
    errorMessage: 'Failed to fetch user yearly registration stats.',
    successMessage: 'User yearly registration stats loaded.',
    showErrorMessage: true,
    showSuccessMessage: false,
  });
};
