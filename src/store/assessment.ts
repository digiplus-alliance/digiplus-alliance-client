import { create } from "zustand";

// Form type
export type FormType = "assessment" | "application";

// Welcome screen data interface
export interface WelcomeScreenData {
  title: string;
  description?: string;
  instruction?: string;
}

// Module interface
export interface Module {
  id: string;
  title: string;
  description?: string;
  step: number;
  active?: boolean; // For marking modules as active/inactive
}

// Base question interface
interface BaseQuestion {
  id: string;
  question_no: number;
  question: string;
  descriptions: string;
  required_score: number;
  module: string;
  required_option: boolean;
  data_key?: string; // For existing questions from the API
  active?: boolean; // For marking questions as active/inactive
  // Optional properties that may apply to various question types
  grid_columns?: Array<{
    id: string;
    text: string;
    value: string;
    points?: number;
  }>;
  grid_rows?: Array<{
    id: string;
    text: string;
    weight?: number;
  }>;
  min_selections?: number;
  acceptedFileTypes?: string[];
  recommendations?: Array<{
    id: string;
    service_id: string;
    service_name: string;
    description: string;
    min_points: number;
    max_points: number;
    levels: string[];
  }>;
}

// Question type specific interfaces
interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple_choice";
  options: Array<{
    option: string;
    optiondesc: string;
    point_value: number;
  }>;
}

interface CheckboxQuestion extends BaseQuestion {
  type: "checkbox";
  options: Array<{
    option: string;
    optiondesc: string;
    point_value: number;
  }>;
  max_selections: number;
}

interface ShortTextQuestion extends BaseQuestion {
  type: "short_text";
  answer_placeholder: string;
  max_characters?: number;
  min_characters?: number;
  completion_points?: number;
}

interface LongTextQuestion extends BaseQuestion {
  type: "long_text";
  answer_placeholder: string;
  min_characters?: number;
  max_characters?: number;
  rows?: number;
  completion_points?: number;
  keyword_scoring?: Array<{
    keyword: string;
    points: number;
  }>;
}

interface DropdownQuestion extends BaseQuestion {
  type: "dropdown";
  options: Array<{
    option: string;
    optiondesc: string;
    point_value: number;
  }>;
  dropdown_placeholder: string;
}

interface MultipleChoiceGridQuestion extends BaseQuestion {
  type: "multiple_choice_grid";
  grid_columns: Array<{
    id: string;
    text: string;
    value: string;
    points?: number;
  }>;
  grid_rows: Array<{
    id: string;
    text: string;
    weight?: number;
  }>;
}

interface FileUploadQuestion extends BaseQuestion {
  type: "file_upload";
  acceptedFileTypes: string[];
  max_file_size?: number; // in MB
  max_files?: number;
  upload_instruction?: string;
}

interface ServiceRecommendationsQuestion extends BaseQuestion {
  type: "service_recommendations";
  recommendations: Array<{
    id: string;
    service_id: string;
    service_name: string;
    description: string;
    min_points: number;
    max_points: number;
    levels: string[];
  }>;
}

// Union type for all question types
export type Question =
  | MultipleChoiceQuestion
  | CheckboxQuestion
  | ShortTextQuestion
  | LongTextQuestion
  | DropdownQuestion
  | MultipleChoiceGridQuestion
  | FileUploadQuestion
  | ServiceRecommendationsQuestion;

export type QuestionType = Question["type"];

// Service Recommendation type (separate from questions)
export type ServiceRecommendation = {
  id?: string; // For existing service recommendations from the database
  service_id: string;
  service_name: string;
  description: string;
  min_points: number;
  max_points: number;
  levels: string[];
  active?: boolean; // For marking recommendations as active/inactive (deleted)
};

// Assessment store interface
interface AssessmentStore {
  formType: FormType;
  welcomeScreen: WelcomeScreenData | null;
  modules: Module[];
  questions: Question[];
  serviceRecommendations: ServiceRecommendation[];
  currentQuestionIndex: number;
  // Track original questions when editing
  originalQuestions: Question[];
  // Track which questions have been modified or are new
  modifiedQuestionIds: Set<string>;
  newQuestionIds: Set<string>;
  // Track deleted questions (for marking as inactive)
  deletedQuestions: Question[];
  // Track original modules when editing
  originalModules: Module[];
  // Track which modules have been modified or are new
  modifiedModuleIds: Set<string>;
  newModuleIds: Set<string>;
  // Track deleted modules (for marking as inactive)
  deletedModules: Module[];
  // Track deleted service recommendations (for marking as inactive)
  deletedServiceRecommendations: ServiceRecommendation[];

  // Actions
  setFormType: (type: FormType) => void;
  setWelcomeScreen: (data: WelcomeScreenData) => void;
  addModule: (module: Module) => void;
  updateModule: (id: string, updates: Partial<Module>) => void;
  removeModule: (id: string) => void;
  setModules: (modules: Module[]) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, question: Question) => void;
  removeQuestion: (id: string) => void;
  clearQuestions: () => void;
  setServiceRecommendations: (recommendations: ServiceRecommendation[]) => void;
  removeServiceRecommendation: (id: string) => void;
  getDeletedServiceRecommendations: () => ServiceRecommendation[];
  clearAll: () => void;
  setCurrentQuestionIndex: (index: number) => void;
  getNextQuestionNumber: () => number;
  getQuestionById: (id: string) => Question | undefined;
  // New actions for tracking question changes
  setOriginalQuestions: (questions: Question[]) => void;
  getModifiedAndNewQuestions: () => Question[];
  getDeletedQuestions: () => Question[];
  markQuestionAsModified: (id: string) => void;
  markQuestionAsNew: (id: string) => void;
  resetChangeTracking: () => void;
  // New actions for tracking module changes
  setOriginalModules: (modules: Module[]) => void;
  getModifiedAndNewModules: () => Module[];
  getDeletedModules: () => Module[];
  markModuleAsModified: (id: string) => void;
  markModuleAsNew: (id: string) => void;
}

// Create the store
export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  formType: "assessment", 
  welcomeScreen: null,
  modules: [],
  questions: [],
  serviceRecommendations: [],
  currentQuestionIndex: 0,
  originalQuestions: [],
  modifiedQuestionIds: new Set<string>(),
  newQuestionIds: new Set<string>(),
  deletedQuestions: [],
  originalModules: [],
  modifiedModuleIds: new Set<string>(),
  newModuleIds: new Set<string>(),
  deletedModules: [],
  deletedServiceRecommendations: [],

  setFormType: (type: FormType) =>
    set({
      formType: type,
    }),

  setWelcomeScreen: (data: WelcomeScreenData) =>
    set({
      welcomeScreen: data,
    }),

  addModule: (module: Module) =>
    set((state) => {
      const newModuleIds = new Set(state.newModuleIds);
      // Check if this is a truly new module (not in original modules)
      const isOriginalModule = state.originalModules.some(m => m.id === module.id);
      if (!isOriginalModule) {
        newModuleIds.add(module.id);
      }
      return {
        modules: [...state.modules, module],
        newModuleIds,
      };
    }),

  updateModule: (id: string, updates: Partial<Module>) =>
    set((state) => {
      const modifiedModuleIds = new Set(state.modifiedModuleIds);
      const isOriginalModule = state.originalModules.some(m => m.id === id);
      const isNewModule = state.newModuleIds.has(id);
      
      // Only mark as modified if it's an original module (not a new one)
      if (isOriginalModule && !isNewModule) {
        modifiedModuleIds.add(id);
      }
      
      return {
        modules: state.modules.map((m) =>
          m.id === id ? { ...m, ...updates } : m
        ),
        modifiedModuleIds,
      };
    }),

  removeModule: (id: string) =>
    set((state) => {
      const moduleToRemove = state.modules.find((m) => m.id === id);
      const isOriginalModule = state.originalModules.some((m) => m.id === id);
      
      // If it's an original module, mark it as deleted (inactive)
      if (isOriginalModule && moduleToRemove) {
        const filtered = state.modules.filter((m) => m.id !== id);
        return {
          modules: filtered.map((module, index) => ({
            ...module,
            step: index + 1,
          })),
          deletedModules: [...state.deletedModules, { ...moduleToRemove, active: false }],
        };
      }
      
      // If it's a new module, just remove it
      const filtered = state.modules.filter((m) => m.id !== id);
      return {
        modules: filtered.map((module, index) => ({
          ...module,
          step: index + 1,
        })),
      };
    }),

  setModules: (modules: Module[]) =>
    set({
      modules,
    }),

  addQuestion: (question: Question) =>
    set((state) => {
      const newQuestionIds = new Set(state.newQuestionIds);
      // Check if this is a truly new question (not in original questions)
      const isOriginalQuestion = state.originalQuestions.some(q => q.id === question.id);
      if (!isOriginalQuestion) {
        newQuestionIds.add(question.id);
      }
      return {
        questions: [...state.questions, question],
        newQuestionIds,
      };
    }),

  updateQuestion: (id: string, updatedQuestion: Question) =>
    set((state) => {
      const modifiedQuestionIds = new Set(state.modifiedQuestionIds);
      const isOriginalQuestion = state.originalQuestions.some(q => q.id === id);
      const isNewQuestion = state.newQuestionIds.has(id);
      
      // Only mark as modified if it's an original question (not a new one)
      if (isOriginalQuestion && !isNewQuestion) {
        modifiedQuestionIds.add(id);
      }
      
      return {
        questions: state.questions.map((q) =>
          q.id === id ? updatedQuestion : q
        ),
        modifiedQuestionIds,
      };
    }),

  removeQuestion: (id: string) =>
    set((state) => {
      const questionToRemove = state.questions.find((q) => q.id === id);
      const isOriginalQuestion = state.originalQuestions.some((q) => q.id === id);
      
      // If it's an original question, mark it as deleted (inactive)
      if (isOriginalQuestion && questionToRemove) {
        return {
          questions: state.questions.filter((q) => q.id !== id),
          deletedQuestions: [...state.deletedQuestions, { ...questionToRemove, active: false }],
        };
      }
      
      // If it's a new question, just remove it
      return {
        questions: state.questions.filter((q) => q.id !== id),
      };
    }),

  clearQuestions: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
    }),

  setServiceRecommendations: (recommendations: ServiceRecommendation[]) =>
    set({
      serviceRecommendations: recommendations,
    }),

  removeServiceRecommendation: (id: string) =>
    set((state) => {
      const recToRemove = state.serviceRecommendations.find((r) => r.id === id);
      if (!recToRemove) return state;
      
      return {
        serviceRecommendations: state.serviceRecommendations.filter((r) => r.id !== id),
        deletedServiceRecommendations: [
          ...state.deletedServiceRecommendations,
          { ...recToRemove, active: false },
        ],
      };
    }),

  getDeletedServiceRecommendations: () => {
    const { deletedServiceRecommendations } = get();
    return deletedServiceRecommendations;
  },

  clearAll: () =>
    set({
      formType: "assessment", // reset to default
      welcomeScreen: null,
      modules: [],
      questions: [],
      serviceRecommendations: [],
      currentQuestionIndex: 0,
      originalQuestions: [],
      modifiedQuestionIds: new Set<string>(),
      newQuestionIds: new Set<string>(),
      deletedQuestions: [],
      originalModules: [],
      modifiedModuleIds: new Set<string>(),
      newModuleIds: new Set<string>(),
      deletedModules: [],
      deletedServiceRecommendations: [],
    }),

  setCurrentQuestionIndex: (index: number) =>
    set({
      currentQuestionIndex: index,
    }),

  getNextQuestionNumber: () => {
    const { questions } = get();
    return questions.length + 1;
  },

  getQuestionById: (id: string) => {
    const { questions } = get();
    return questions.find((q) => q.id === id);
  },

  // Methods for tracking question changes
  setOriginalQuestions: (questions: Question[]) =>
    set({
      originalQuestions: questions,
      modifiedQuestionIds: new Set<string>(),
      newQuestionIds: new Set<string>(),
    }),

  getModifiedAndNewQuestions: () => {
    const { questions, modifiedQuestionIds, newQuestionIds } = get();
    // Return only questions that are modified or new
    return questions.filter(
      (q) => modifiedQuestionIds.has(q.id) || newQuestionIds.has(q.id)
    );
  },

  getDeletedQuestions: () => {
    const { deletedQuestions } = get();
    return deletedQuestions;
  },

  markQuestionAsModified: (id: string) =>
    set((state) => {
      const modifiedQuestionIds = new Set(state.modifiedQuestionIds);
      const isNewQuestion = state.newQuestionIds.has(id);
      // Only mark as modified if it's not a new question
      if (!isNewQuestion) {
        modifiedQuestionIds.add(id);
      }
      return { modifiedQuestionIds };
    }),

  markQuestionAsNew: (id: string) =>
    set((state) => {
      const newQuestionIds = new Set(state.newQuestionIds);
      newQuestionIds.add(id);
      return { newQuestionIds };
    }),

  resetChangeTracking: () =>
    set({
      modifiedQuestionIds: new Set<string>(),
      newQuestionIds: new Set<string>(),
      modifiedModuleIds: new Set<string>(),
      newModuleIds: new Set<string>(),
    }),

  // Methods for tracking module changes
  setOriginalModules: (modules: Module[]) =>
    set({
      originalModules: modules,
      modifiedModuleIds: new Set<string>(),
      newModuleIds: new Set<string>(),
    }),

  getModifiedAndNewModules: () => {
    const { modules, modifiedModuleIds, newModuleIds } = get();
    // Return only modules that are modified or new
    return modules.filter(
      (m) => modifiedModuleIds.has(m.id) || newModuleIds.has(m.id)
    );
  },

  getDeletedModules: () => {
    const { deletedModules } = get();
    return deletedModules;
  },

  markModuleAsModified: (id: string) =>
    set((state) => {
      const modifiedModuleIds = new Set(state.modifiedModuleIds);
      const isNewModule = state.newModuleIds.has(id);
      // Only mark as modified if it's not a new module
      if (!isNewModule) {
        modifiedModuleIds.add(id);
      }
      return { modifiedModuleIds };
    }),

  markModuleAsNew: (id: string) =>
    set((state) => {
      const newModuleIds = new Set(state.newModuleIds);
      newModuleIds.add(id);
      return { newModuleIds };
    }),
}));
