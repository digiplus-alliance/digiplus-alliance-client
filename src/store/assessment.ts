import { create } from 'zustand';

// Base question interface
interface BaseQuestion {
  id: string;
  question_no: number;
  question: string;
  descriptions: string;
  required_score: number;
  module: string;
  required_option: boolean;
}

// Question type specific interfaces
interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple_choice";
  options: Array<{
    option: string;
    optiondesc: string;
    point_value: number;
  }>;
  max_selections: number;
}

interface CheckboxQuestion extends BaseQuestion {
  type: "checkbox_question";
  options: Array<{
    option: string;
    optiondesc: string;
    point_value: number;
  }>;
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
  type: "dropdown_question";
  options: Array<{
    option: string;
    optiondesc: string;
    point_value: number;
  }>;
  dropdown_placeholder: string;
}

// Union type for all question types
export type Question = 
  | MultipleChoiceQuestion 
  | CheckboxQuestion 
  | ShortTextQuestion 
  | LongTextQuestion 
  | DropdownQuestion;

export type QuestionType = Question['type'];

// Assessment store interface
interface AssessmentStore {
  questions: Question[];
  currentQuestionIndex: number;
  
  // Actions
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, question: Question) => void;
  removeQuestion: (id: string) => void;
  clearQuestions: () => void;
  setCurrentQuestionIndex: (index: number) => void;
  getNextQuestionNumber: () => number;
  getQuestionById: (id: string) => Question | undefined;
}

// Create the store
export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,

  addQuestion: (question: Question) => set((state) => ({
    questions: [...state.questions, question]
  })),

  updateQuestion: (id: string, updatedQuestion: Question) => set((state) => ({
    questions: state.questions.map(q => 
      q.id === id ? updatedQuestion : q
    )
  })),

  removeQuestion: (id: string) => set((state) => ({
    questions: state.questions.filter(q => q.id !== id)
  })),

  clearQuestions: () => set({
    questions: [],
    currentQuestionIndex: 0
  }),

  setCurrentQuestionIndex: (index: number) => set({
    currentQuestionIndex: index
  }),

  getNextQuestionNumber: () => {
    const { questions } = get();
    return questions.length + 1;
  },

  getQuestionById: (id: string) => {
    const { questions } = get();
    return questions.find(q => q.id === id);
  }
}));
