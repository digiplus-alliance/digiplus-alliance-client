import useFetch from '@/lib/useFetch';
import z from 'zod';

const UserDetailSchema = z.object({
  _id: z.string().optional(),
  user_id: z.string().optional(),
  email: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
  phone_number: z.string().optional(),
  website: z.string().optional(),
  business_name: z.string().optional(),
}).passthrough();

const MonthlyBreakdownSchema = z.object({
  month: z.string(),
  month_number: z.number(),
  year: z.number(),
  total_users: z.number(),
  user_details: z.array(UserDetailSchema),
});

const SummarySchema = z.object({
  total_new_users: z.number(),
  months_with_registrations: z.number(),
  average_users_per_month: z.number(),
});

export const UsersMonthlyStatsSchema = z.object({
  year: z.number(),
  summary: SummarySchema,
  monthly_breakdown: z.array(MonthlyBreakdownSchema),
  generated_at: z.string(),
  generated_date: z.string(),
  generated_time: z.string(),
});

export type UsersMonthlyStats = z.infer<typeof UsersMonthlyStatsSchema>;

export const useGetUsersMonthlyStats = (year?: number) =>
  useFetch<UsersMonthlyStats>({
    url: year ? `reports/users-monthly-stats?year=${year}` : 'admin/users/registration-stats',
    schema: UsersMonthlyStatsSchema,
    hasAuth: true,
    errorMessage: 'Failed to fetch user registration stats.',
    successMessage: 'User registration stats loaded.',
    showErrorMessage: true,
    showSuccessMessage: false,
  });