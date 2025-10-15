"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAssessmentStore } from "./assessment";
import { useApplicationStore } from "./application";
import type {
  FormType,
  WelcomeScreenData,
  Module,
  Question,
  QuestionType,
} from "./assessment";

// Export types from assessment store (they're identical in both stores)
export type { FormType, WelcomeScreenData, Module, Question, QuestionType };

/**
 * Context to hold the current formType
 * This allows child components to know which store to use
 */
const FormTypeContext = createContext<FormType | null>(null);

/**
 * Provider component that wraps form builders and sets the formType context
 * Usage:
 *   <FormTypeProvider formType="assessment">
 *     <AssessmentBuilder />
 *   </FormTypeProvider>
 */
export const FormTypeProvider = ({
  formType,
  children,
}: {
  formType: FormType;
  children: ReactNode;
}) => {
  return (
    <FormTypeContext.Provider value={formType}>
      {children}
    </FormTypeContext.Provider>
  );
};

/**
 * Hook to get the current formType from context
 * Throws error if used outside FormTypeProvider
 */
export const useFormType = () => {
  const formType = useContext(FormTypeContext);
  if (formType === null) {
    throw new Error("useFormType must be used within a FormTypeProvider");
  }
  return formType;
};

/**
 * Unified store hook that automatically routes to the correct store
 * based on the FormTypeContext. Components don't need to know which store
 * they're using - it's determined by the parent FormTypeProvider.
 * 
 * Usage in component:
 *   const { welcomeScreen, setWelcomeScreen, modules, questions, ... } = useFormStore();
 */
export const useFormStore = () => {
  const formType = useFormType();
  
  // Get both stores
  const assessmentStore = useAssessmentStore();
  const applicationStore = useApplicationStore();

  // Return the appropriate store based on formType from context
  return formType === "assessment" ? assessmentStore : applicationStore;
};
