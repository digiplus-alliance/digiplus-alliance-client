// Assessment API Hooks
export { useGetAvailableAssessments } from './useGetAvailableAssessments';
export { useGetAssessmentById, type AssessmentByIdData } from './useGetAssessmentById';
export { useSubmitAssessment, type SubmissionData } from './useSubmitAssessment';

// Re-export types for convenience
export type {
  Assessment,
  AssessmentModule,
  AssessmentQuestion,
  AssessmentOption,
  GridColumn,
  GridRow,
  ServiceRecommendation,
  AssessmentSubmissionRequest,
  AssessmentFlowState,
  QuestionResponse,
  AssessmentNavigation,
} from '@/types/assessment';
