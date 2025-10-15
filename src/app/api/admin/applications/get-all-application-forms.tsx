import useFetch from "@/lib/useFetch";
import z from "zod";

// Schema for question options
const QuestionOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
}).passthrough(); 

// Schema for questions (dynamic structure)
const QuestionSchema = z.object({
  type: z.string(), 
  question: z.string(),
  description: z.string().optional(),
  auto_validation: z.string().optional(),
  placeholder: z.string().optional(),
  options: z.array(QuestionOptionSchema).optional(), 
  is_required: z.boolean().optional(),
  step: z.number().optional(),
  module_ref: z.string().optional(),
  data_key: z.string().optional(),
}).passthrough();

// Schema for modules
const ModuleSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  temp_id: z.string(),
  order: z.number(),
}).passthrough();

// Main application form schema
export const ApplicationFormSchema = z.object({
  _id: z.string(),
  welcome_title: z.string(),
  welcome_description: z.string().optional(),
  welcome_instruction: z.string().optional(),
  slug: z.string(),
  questions: z.array(QuestionSchema),
  isLive: z.boolean(),
  modules: z.array(ModuleSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
}).passthrough();

export const AllApplicationFormsSchema = z.array(ApplicationFormSchema);

export type QuestionOption = z.infer<typeof QuestionOptionSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type ApplicationForm = z.infer<typeof ApplicationFormSchema>;
export type AllApplicationForms = z.infer<typeof AllApplicationFormsSchema>;

export const useGetApplicationForms = () =>
  useFetch<AllApplicationForms>({
    url: "admin/applications/forms",
    schema: AllApplicationFormsSchema,
    hasAuth: true,
    errorMessage: "Failed to fetch application forms.",
    showErrorMessage: true,
    showSuccessMessage: false,
    queryKey: ["allApplicationForms"],
  });
