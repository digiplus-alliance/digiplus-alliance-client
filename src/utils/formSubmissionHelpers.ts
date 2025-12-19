import { cleanObject } from "@/utils/cleanQuestionObject";
import { Question as APIQuestion } from "@/types/questions";
import type {
  Question as StoreQuestion,
  Module,
  WelcomeScreenData,
  ServiceRecommendation,
} from "@/store/form-store";

interface FormSubmissionData {
  welcomeScreen?: WelcomeScreenData | null;
  modules: Module[];
  questions: StoreQuestion[];
  serviceRecommendations: ServiceRecommendation[];
  deletedServiceRecommendations: ServiceRecommendation[];
}

export function buildApplicationPayload(
  data: FormSubmissionData,
  isUpdate: boolean,
  getModifiedAndNewQuestions: () => StoreQuestion[],
  getModifiedAndNewModules: () => Module[],
  getDeletedQuestions: () => StoreQuestion[],
  getDeletedModules: () => Module[]
) {
  // When updating, we need:
  // 1. Modified questions (with data_key, active: true)
  // 2. New questions (without data_key, active: true)
  // 3. Deleted questions (with data_key, active: false)
  const questionsToSend = isUpdate
    ? [...getModifiedAndNewQuestions(), ...getDeletedQuestions()]
    : data.questions;
  const modulesToSend = isUpdate
    ? [...getModifiedAndNewModules(), ...getDeletedModules()]
    : data.modules;

  //   console.log("Building Application Payload:");
  //   console.log("isUpdate:", isUpdate);
  //   console.log("questionsToSend:", questionsToSend);
  //   console.log("Questions with data_key:", questionsToSend.filter(q => q.data_key).map(q => ({ id: q.id, data_key: q.data_key, active: q.active })));
  //   console.log("modulesToSend:", modulesToSend);
  //   console.log("Modules with active status:", modulesToSend.map(m => ({ id: m.id, title: m.title, active: m.active })));

  return {
    welcome_title: data.welcomeScreen?.title,
    welcome_description: data.welcomeScreen?.description,
    welcome_instruction: data.welcomeScreen?.instruction,
    modules: modulesToSend.map((mod) => ({
      temp_id: mod.title.toLowerCase().replace(/\s+/g, "_"),
      title: mod.title,
      description: mod.description,
      order: mod.step,
      active: mod?.active !== undefined ? mod.active : true,
    })),
    questions: questionsToSend.map((q) => {
      const apiQuestion: APIQuestion = {
        type: q?.type,
        question: q?.question,
        description: q?.descriptions,
        placeholder:
          q.type === "short_text" || q.type === "long_text"
            ? q.answer_placeholder
            : q.type === "dropdown"
            ? q.dropdown_placeholder
            : undefined,
        options:
          "options" in q && q.options
            ? q.type === "dropdown"
              ? q.options?.map((opt, idx) => ({
                  id: `opt-${idx + 1}`,
                  text: opt?.optiondesc,
                }))
              : q.options?.map((opt, idx) => ({
                  id: `opt-${idx + 1}`,
                  text: opt?.optiondesc,
                  value: opt?.optiondesc,
                }))
            : undefined,
        grid_columns:
          "grid_columns" in q && q.grid_columns
            ? q.grid_columns.map((col) => ({
                id: col?.id,
                text: col?.text,
              }))
            : undefined,
        grid_rows:
          "grid_rows" in q && q.grid_rows
            ? q.grid_rows.map((row) => ({
                id: row?.id,
                text: row?.text,
              }))
            : undefined,
        min_selections: q?.min_selections,
        max_selections: q.type === "checkbox" ? q.max_selections : undefined,
        min_characters:
          q.type === "long_text" || q.type === "short_text"
            ? q.min_characters
            : undefined,
        max_characters:
          q.type === "short_text" || q.type === "long_text"
            ? q.max_characters
            : undefined,
        is_required: q?.required_option,
        step: q?.module
          ? data.modules.find((m) => m.title === q?.module)?.step
          : 1,
        module_ref: q?.module
          ? q.module.toLowerCase().replace(/\s+/g, "_")
          : undefined,
        accepted_file_types: q?.acceptedFileTypes,
        max_file_size: q.type === "file_upload" ? q.max_file_size : undefined,
        max_files: q.type === "file_upload" ? q.max_files : undefined,
        upload_instruction:
          q.type === "file_upload" ? q.upload_instruction : undefined,
        // Include data_key only for existing questions (those with data_key)
        data_key: q?.data_key ? q.data_key : undefined,
        // Set active based on question state (deleted questions have active: false)
        active: q?.active !== undefined ? q.active : true,
      };

      return cleanObject(apiQuestion);
    }),
  };
}

export function buildAssessmentPayload(
  data: FormSubmissionData,
  isUpdate: boolean,
  getModifiedAndNewQuestions: () => StoreQuestion[],
  getModifiedAndNewModules: () => Module[],
  getDeletedModules: () => Module[],
  getDeletedQuestions: () => StoreQuestion[]
) {
  // When updating, we need:
  // 1. Modified modules (with id, is_active: true)
  // 2. New modules (without id, is_active: true)
  // 3. Deleted modules (with id, is_active: false)
  // 4. Modified and new questions
  // 5. Deleted questions (with id, toDelete: true)
  const questionsToSend = isUpdate
    ? [...getModifiedAndNewQuestions(), ...getDeletedQuestions()]
    : data.questions;
  const modulesToSend = isUpdate
    ? [...getModifiedAndNewModules(), ...getDeletedModules()]
    : data.modules;

  return {
    title: data.welcomeScreen?.title || "New Assessment",
    description:
      data.welcomeScreen?.description ||
      "Evaluate your digital transformation readiness",
    instruction:
      data.welcomeScreen?.instruction ||
      "Please complete all sections honestly",
    modules: modulesToSend.map((mod) => {
      // Existing modules have MongoDB ObjectId (24 char hex string)
      // New modules have either 'mod-' prefix or timestamp (numeric string)
      const isExistingModule =
        mod.id &&
        !mod.id.startsWith("mod-") &&
        mod.id.length === 24 &&
        /^[a-f0-9]{24}$/i.test(mod.id);
      
      const isBeingDeleted = isExistingModule && mod?.active === false;
      
      // If deleting, only send id and toDelete
      if (isBeingDeleted) {
        return {
          id: mod.id,
          toDelete: true,
        };
      }
      
      // Otherwise, send full module data
      return {
        ...(isExistingModule ? { id: mod.id } : {}),
        temp_id: `mod-${mod.title.toLowerCase().replace(/\s+/g, "_")}`,
        title: mod.title,
        description: mod.description,
        order: mod.step,
      };
    }),
    questions: questionsToSend
      .filter((q) => q.type !== "service_recommendations")
      .map((q) => {
        // Check if this is an existing question (has MongoDB ObjectId)
        const isExistingQuestion =
          q.id &&
          !q.id.startsWith("q-") &&
          q.id.length === 24 &&
          /^[a-f0-9]{24}$/i.test(q.id);

        const isBeingDeleted = isExistingQuestion && q?.active === false;
        
        // If deleting, only send id and toDelete
        if (isBeingDeleted) {
          return {
            id: q.id,
            toDelete: true,
          };
        }

        const apiQuestion: APIQuestion = {
          // Include id for existing questions
          ...(isExistingQuestion ? { id: q.id } : {}),
          type: q?.type,
          question: q?.question,
          description: q?.descriptions,
          instruction: q?.descriptions,
          placeholder:
            q.type === "short_text" || q.type === "long_text"
              ? q.answer_placeholder
              : q.type === "dropdown"
              ? q.dropdown_placeholder
              : undefined,
          options:
            "options" in q && q.options
              ? q.type === "dropdown"
                ? q.options?.map((opt, idx) => ({
                    id: `opt-${idx + 1}`,
                    text: opt?.optiondesc,
                    points: opt?.point_value || 0,
                  }))
                : q.options?.map((opt, idx) => ({
                    id: `opt-${idx + 1}`,
                    text: opt?.optiondesc,
                    points: opt?.point_value || 0,
                  }))
              : undefined,
          keyword_scoring:
            "keyword_scoring" in q &&
            Array.isArray(q.keyword_scoring) &&
            q.keyword_scoring.length > 0
              ? q.keyword_scoring.map((kw: any) => ({
                  keyword: kw?.keyword,
                  points: kw?.points || 0,
                }))
              : undefined,
          grid_columns:
            "grid_columns" in q && q.grid_columns
              ? q.grid_columns.map((col) => ({
                  id: col?.id,
                  text: col?.text,
                  ...("points" in col &&
                    col?.points !== undefined && { points: col.points }),
                }))
              : undefined,
          grid_rows:
            "grid_rows" in q && q.grid_rows
              ? q.grid_rows.map((row) => ({
                  id: row?.id,
                  text: row?.text,
                  ...("weight" in row &&
                    row?.weight !== undefined && { weight: row.weight }),
                }))
              : undefined,
          min_selections: q?.min_selections,
          max_selections: q.type === "checkbox" ? q.max_selections : undefined,
          min_characters:
            q.type === "long_text" || q.type === "short_text"
              ? q.min_characters
              : undefined,
          max_characters:
            q.type === "short_text" || q.type === "long_text"
              ? q.max_characters
              : undefined,
          completion_points:
            q.type === "short_text" || q.type === "long_text"
              ? "completion_points" in q
                ? q.completion_points || 0
                : 0
              : undefined,
          is_required: q?.required_option,
          step: q?.module
            ? data.modules.find((m) => m.title === q?.module)?.step
            : 1,
          ...(q?.module &&
            (() => {
              const selectedModule = data.modules.find(
                (m) => m.title === q?.module
              );
              const isExistingModule =
                selectedModule?.id &&
                !selectedModule.id.startsWith("mod-") &&
                selectedModule.id.length === 24 &&
                /^[a-f0-9]{24}$/i.test(selectedModule.id);
              return isExistingModule 
                ? { module_id: selectedModule.id } 
                : { 
                    module_id: `mod-${q?.module.toLowerCase().replace(/\s+/g, "_")}`,
                    module_ref: `mod-${q?.module.toLowerCase().replace(/\s+/g, "_")}`
                  };
            })()),
          allowed_file_types: q?.acceptedFileTypes,
          max_file_size: q.type === "file_upload" ? q.max_file_size : undefined,
          max_files: q.type === "file_upload" ? q.max_files : undefined,
          upload_instruction:
            q.type === "file_upload" ? q.upload_instruction : undefined,
        };
        return cleanObject(apiQuestion);
      }),
    service_recommendations:
      data.serviceRecommendations.length > 0 || data.deletedServiceRecommendations.length > 0
        ? [
            ...data.serviceRecommendations.map((rec) => {
              // Check if this is an existing recommendation (has id from backend)
              const isExistingRecommendation = rec.id;

              return {
                // For existing recommendations, include id for updates
                ...(isExistingRecommendation ? { id: rec.id } : {}),
                service_name: rec.service_name,
                description: rec.description,
                min_points: rec.min_points,
                max_points: rec.max_points,
                levels: rec.levels,
              };
            }),
            // Add deleted service recommendations with toDelete flag
            ...data.deletedServiceRecommendations.map((rec) => ({
              id: rec.id,
              toDelete: true,
            })),
          ]
        : undefined,
  };
}
