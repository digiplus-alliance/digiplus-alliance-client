'use client';

import * as z from 'zod';
import useFetch from '@/lib/useFetch';

// Application type
export type AvailableApplication = {
  id: string;
  welcome_title: string;
  welcome_description?: string;
};

export function useGetAvailableApplications() {
  return useFetch<AvailableApplication[]>({
    url: 'user/applications',
    hasAuth: true,
    schema: z.array(
      z.object({
        id: z.string(),
        welcome_title: z.string(),
        welcome_description: z.string().optional(),
      })
    ),
    queryKey: ['applications', 'available'],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  });
}
