import { z } from 'zod';

// Assessment Option Schema
export const AssessmentOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  value: z.number().optional(),
  points: z.number().optional(),
  points_description: z.string().optional(),
});

// Grid Column Schema
export const GridColumnSchema = z.object({
  id: z.string(),
  text: z.string(),
  value: z.number().optional(),
  points: z.number().optional(),
  points_description: z.string().optional(),
});

// Grid Row Schema
export const GridRowSchema = z.object({
  id: z.string(),
  text: z.string(),
  weight: z.number().optional(),
});

// Assessment Question Schema
export const AssessmentQuestionSchema = z.object({
  _id: z.string(),
  assessment_id: z.string(),
  module_id: z.string().optional(),
  module_ref: z.string().optional(),
  type: z.enum([
    'welcome_screen',
    'module_title',
    'multiple_choice',
    'checkbox',
    'short_text',
    'long_text',
    'dropdown',
    'multiple_choice_grid',
  ]),
  question: z.string(),
  options: z.array(AssessmentOptionSchema).default([]),
  grid_columns: z.array(GridColumnSchema).default([]),
  grid_rows: z.array(GridRowSchema).default([]),
  is_required: z.boolean().default(false),
  step: z.number(),
  required_score: z.number().default(0),
  is_active: z.boolean().default(true),
  created_at: z.string(),
  updated_at: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
  // Optional fields for different question types
  welcome_title: z.string().optional(),
  welcome_message: z.string().optional(),
  button_text: z.string().optional(),
  module_title: z.string().optional(),
  module_description: z.string().optional(),
  description: z.string().optional(),
  instruction: z.string().optional(),
  placeholder: z.string().optional(),
  max_length: z.number().optional(),
  min_length: z.number().optional(),
  rows: z.number().optional(),
  min_selections: z.number().optional(),
  max_selections: z.number().optional(),
  max_points: z.number().optional(),
  scoring_categories: z.array(z.string()).optional(),
  data_key: z.string().optional(),
});

// Assessment Module Schema
export const AssessmentModuleSchema = z.object({
  _id: z.string(),
  assessment_id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  order: z.number(),
  is_active: z.boolean().default(true),
  created_at: z.string(),
  updated_at: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
  max_points: z.number().optional(),
  temp_id: z.string().optional(),
});

// Assessment Schema
export const AssessmentSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  instruction: z.string().optional(),
  is_active: z.boolean().default(true),
  created_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
  total_possible_points: z.number().default(0),
});

// Service Recommendation Schema
export const ServiceRecommendationSchema = z.object({
  _id: z.string(),
  assessment_id: z.string(),
  service_id: z.string(),
  service_name: z.string(),
  description: z.string(),
  min_points: z.number(),
  max_points: z.number(),
  levels: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

// Available Assessments Response Schema
export const AvailableAssessmentsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(AssessmentSchema),
});

// Assessment Details Response Schema
export const AssessmentDetailsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    assessment: AssessmentSchema,
    modules: z.array(AssessmentModuleSchema),
    questions: z.array(AssessmentQuestionSchema),
    service_recommendations: z.array(ServiceRecommendationSchema),
  }),
});

// Assessment Submission Request Schema
export const AssessmentSubmissionRequestSchema = z.object({
  assessment_id: z.string(),
  user_id: z.string(),
  responses: z.record(z.string(), z.union([z.string(), z.array(z.string()), z.record(z.string(), z.string())])),
});

// Assessment Submission Response Schema
export const AssessmentSubmissionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      submission_id: z.string().optional(),
      user_score: z.number().optional(),
      recommended_services: z.array(ServiceRecommendationSchema).optional(),
      user_level: z.string().optional(),
      percentage_score: z.number().optional(),
      total_possible_points: z.number().optional(),
      assessment_title: z.string().optional(),
    })
    .optional(),
});

// TypeScript Types
export type AssessmentOption = z.infer<typeof AssessmentOptionSchema>;
export type GridColumn = z.infer<typeof GridColumnSchema>;
export type GridRow = z.infer<typeof GridRowSchema>;
export type AssessmentQuestion = z.infer<typeof AssessmentQuestionSchema>;
export type AssessmentModule = z.infer<typeof AssessmentModuleSchema>;
export type Assessment = z.infer<typeof AssessmentSchema>;
export type ServiceRecommendation = z.infer<typeof ServiceRecommendationSchema>;
export type AvailableAssessmentsResponse = z.infer<typeof AvailableAssessmentsResponseSchema>;
export type AssessmentDetailsResponse = z.infer<typeof AssessmentDetailsResponseSchema>;
export type AssessmentSubmissionRequest = z.infer<typeof AssessmentSubmissionRequestSchema>;
export type AssessmentSubmissionResponse = z.infer<typeof AssessmentSubmissionResponseSchema>;

// Assessment Flow State Types
export interface AssessmentFlowState {
  currentAssessmentId: string | null;
  currentQuestionIndex: number;
  responses: Record<string, any>;
  isSubmitting: boolean;
  isCompleted: boolean;
}

// Question Response Types
export type QuestionResponse = string | string[] | Record<string, string>;

// Assessment Navigation Types
export interface AssessmentNavigation {
  canGoBack: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  currentStep: number;
  totalSteps: number;
}

//Assessment Submissions History
export const AssessmentSubmissionHistoryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      _id: z.string(),
      user_id: z.string(),
      assessment_id: z.string(),
      answers: z.array(
        z.object({
          question_id: z.string(),
          answer: z.union([z.string(), z.array(z.string()), z.record(z.string(), z.string())]),
        })
      ),
      user_score: z.number(),
      max_possible_score: z.number(),
      percentage_score: z.number(),
      recommended_services: z.array(ServiceRecommendationSchema),

      completed_at: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      __v: z.number(),
    })
    .array(),
});

export type AssessmentSubmission = z.infer<typeof AssessmentSubmissionHistoryResponseSchema>;
export type AssessmentSubmissionHistoryResponse = z.infer<typeof AssessmentSubmissionHistoryResponseSchema>;
