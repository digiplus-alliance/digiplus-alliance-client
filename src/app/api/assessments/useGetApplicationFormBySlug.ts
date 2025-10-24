'use client';

import * as z from 'zod';
import useFetch from '@/lib/useFetch';
import {
  AssessmentDetailsResponseSchema,
  type AssessmentDetailsResponse,
  AssessmentSchema,
  AssessmentModuleSchema,
  AssessmentQuestionSchema,
  ServiceRecommendationSchema,
} from '@/types/assessment';

// Schema for the API response data structure
const ApplicationBySlugDataSchema = z.object({
  modules: z.array(AssessmentModuleSchema),
  questions: z.array(AssessmentQuestionSchema),
  service_recommendations: z.array(ServiceRecommendationSchema),
  welcome_title: z.string(),
  welcome_description: z.string(),
  welcome_instruction: z.string(),
  slug: z.string(),
  _id: z.string(),
});

export type ApplicationBySlugData = z.infer<typeof ApplicationBySlugDataSchema>;

export function useGetApplicationBySlug(slug: string, enabled: boolean = true) {
  return useFetch<ApplicationBySlugData>({
    url: `user/applications/${slug}/questions`,
    hasAuth: true,
    // schema: ApplicationBySlugDataSchema,
    enabled: enabled && !!slug,
    queryKey: ['user', 'applications', slug],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  });
}
