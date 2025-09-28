// User API Hooks
export { useCreateApplication } from './useCreateApplication';
export { useGetApplicationStatusCounts } from './useGetApplicationStatusCounts';
export { useGetApplicationSubmissions } from './useGetApplicationSubmissions';

// Re-export types for convenience
export type {
  CreateApplicationRequest,
  CreateApplicationResponse,
} from './useCreateApplication';

export type {
  ApplicationStatusCountsResponse,
} from './useGetApplicationStatusCounts';

export type {
  ApplicationSubmission,
  ApplicationSubmissionsResponse,
} from '@/types/applications';
