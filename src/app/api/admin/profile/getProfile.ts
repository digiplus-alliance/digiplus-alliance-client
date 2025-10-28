import useFetch from '@/lib/useFetch';
import z from 'zod';


export const AdminProfileSchema = z.object({
  _id: z.string(),
  user_id: z.string(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
  phone_number: z.string().optional(),
  website: z.string().optional(),
  business_name: z.string().catch(''),
}).passthrough();

export type AdminProfile = z.infer<typeof AdminProfileSchema>;

export const useGetAdminProfile = () =>
  useFetch<AdminProfile>({
    url: 'profile/admin',
    schema: AdminProfileSchema,
    hasAuth: true,
    errorMessage: 'Failed to fetch admin profile.',
    successMessage: 'Admin profile loaded.',
    showErrorMessage: true,
    showSuccessMessage: false,
  });