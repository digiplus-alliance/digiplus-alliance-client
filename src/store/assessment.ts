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
  // Optional properties that may apply to various question types
  grid_columns?: Array<{
    id: string;
    text: string;
    value: string;
  }>;
  grid_rows?: Array<{
    id: string;
    text: string;
  }>;
  min_selections?: number;
  acceptedFileTypes?: string[];
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
}

interface LongTextQuestion extends BaseQuestion {
  type: "long_text";
  answer_placeholder: string;
  min_characters?: number;
  max_characters?: number;
  rows?: number;
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
  }>;
  grid_rows: Array<{
    id: string;
    text: string;
  }>;
}

interface FileUploadQuestion extends BaseQuestion {
  type: "file_upload";
  acceptedFileTypes: string[];
  max_file_size?: number; // in MB
  max_files?: number;
  upload_instruction?: string;
}

// Union type for all question types
export type Question =
  | MultipleChoiceQuestion
  | CheckboxQuestion
  | ShortTextQuestion
  | LongTextQuestion
  | DropdownQuestion
  | MultipleChoiceGridQuestion
  | FileUploadQuestion;

export type QuestionType = Question["type"];

// Assessment store interface
interface AssessmentStore {
  formType: FormType;
  welcomeScreen: WelcomeScreenData | null;
  modules: Module[];
  questions: Question[];
  currentQuestionIndex: number;

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
  clearAll: () => void;
  setCurrentQuestionIndex: (index: number) => void;
  getNextQuestionNumber: () => number;
  getQuestionById: (id: string) => Question | undefined;
}

// Create the store
export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  formType: "assessment", // default to assessment
  welcomeScreen: null,
  modules: [],
  questions: [],
  currentQuestionIndex: 0,

  setFormType: (type: FormType) =>
    set({
      formType: type,
    }),

  setWelcomeScreen: (data: WelcomeScreenData) =>
    set({
      welcomeScreen: data,
    }),

  addModule: (module: Module) =>
    set((state) => ({
      modules: [...state.modules, module],
    })),

  updateModule: (id: string, updates: Partial<Module>) =>
    set((state) => ({
      modules: state.modules.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    })),

  removeModule: (id: string) =>
    set((state) => {
      const filtered = state.modules.filter((m) => m.id !== id);
      // Update step numbers after deletion
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
    set((state) => ({
      questions: [...state.questions, question],
    })),

  updateQuestion: (id: string, updatedQuestion: Question) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? updatedQuestion : q
      ),
    })),

  removeQuestion: (id: string) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),

  clearQuestions: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
    }),

  clearAll: () =>
    set({
      formType: "assessment", // reset to default
      welcomeScreen: null,
      modules: [],
      questions: [],
      currentQuestionIndex: 0,
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
}));
