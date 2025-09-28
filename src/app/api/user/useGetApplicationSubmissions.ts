"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";
import { 
  ApplicationSubmissionsResponseSchema,
  type ApplicationSubmission 
} from "@/types/applications";

export function useGetApplicationSubmissions() {
  return useFetch<ApplicationSubmission[]>({
    url: 'user/applications/submissions',
    hasAuth: true,
    schema: ApplicationSubmissionsResponseSchema,
    queryKey: ['user', 'applications', 'submissions'],
    reactQueryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
    },
  });
}
