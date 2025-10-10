'use client';

import * as z from 'zod';
import useFetch from '@/lib/useFetch';
import { AssessmentSubmissionHistoryResponseSchema, type AssessmentSubmission } from '@/types/assessment';

export function useGetAssessmentHistorySubmissions() {
  return useFetch({
    url: 'api/assessments/user/submissions',
    hasAuth: true,
    // schema: AssessmentSubmissionHistoryResponseSchema,
    queryKey: ['assessments', 'user', 'submissions'],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
    },
  });
}
