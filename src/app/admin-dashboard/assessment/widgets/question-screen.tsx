"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  useFormStore,
  type Question,
  type QuestionType,
} from "@/store/form-store";
import MultipleChoice from "./multiple-choice";
import ShortText from "./short-text";
import LongTextQuestion from "./long-text-question";
import DropDownQuestion from "./drop-down-question";
import CheckboxQuestion from "./checkbox-question";
import PreviewModal from "./preview-modal";
import { Lock, Edit2, Trash2, Eye, AlertCircle } from "lucide-react";
import MultipleChoiceGridQuestion from "./multiple-choice-grid-question";
import FileUploadQuestion from "./file-upload-question";
import ServiceRecommendation from "./service-recommendation";
import { useCreateApplication } from "@/app/api/admin/applications/create-application";
import { useUpdateApplication } from "@/app/api/admin/applications/update-application";
import { useCreateAssessment } from "@/app/api/admin/assessment/create-assessment";
import { useUpdateAssessment } from "@/app/api/admin/assessment/edit-assessment";
import {
  buildApplicationPayload,
  buildAssessmentPayload,
} from "@/utils/formSubmissionHelpers";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

type ActiveQuestionType = QuestionType | null;

interface ActiveQuestion {
  id: string;
  type: QuestionType;
  isLocked: boolean;
}

export default function QuestionScreen({
  navigateBack,
  applicationId,
  assessmentId,
}: {
  navigateBack?: () => void;
  applicationId?: string;
  assessmentId?: string;
}) {
  const {
    formType,
    welcomeScreen,
    modules,
    questions,
    serviceRecommendations,
    addQuestion,
    updateQuestion,
    removeQuestion,
    clearQuestions,
    clearAll,
    setServiceRecommendations,
    removeServiceRecommendation,
    getModifiedAndNewQuestions,
    setOriginalQuestions,
    getModifiedAndNewModules,
    getDeletedQuestions,
    getDeletedModules,
    getDeletedServiceRecommendations,
  } = useFormStore();

  const { mutate: createApplication, isPending: isCreating } =
    useCreateApplication();
  const { mutate: updateApplication, isPending: isUpdating } = applicationId
    ? useUpdateApplication(applicationId)
    : { mutate: () => {}, isPending: false };
  const { mutate: createAssessment, isPending: isCreatingAssessment } =
    useCreateAssessment();
  const { mutate: updateAssessment, isPending: isUpdatingAssessment } =
    assessmentId
      ? useUpdateAssessment(assessmentId)
      : { mutate: () => {}, isPending: false };

  const router = useRouter();

  const isPending =
    isCreating || isUpdating || isCreatingAssessment || isUpdatingAssessment;

  const [activeQuestions, setActiveQuestions] = useState<ActiveQuestion[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [questionsWithoutModule, setQuestionsWithoutModule] = useState<string[]>([]);

  // Load questions from store on mount ONLY (not on every question change)
  useEffect(() => {
    if (!isInitialized) {
      if (questions.length > 0) {
        const loadedQuestions = questions.map((q) => ({
          id: q.id,
          type: q.type,
          isLocked: applicationId || assessmentId ? true : false,
        }));
        
        // Check if there are service recommendations to add
        const hasServiceRecs = questions.some(q => q.type === "service_recommendations");
        
        // If service recommendations exist in questions, they're already included above
        // If service recommendations exist in the store but not in questions array, add them
        if (serviceRecommendations.length > 0 && !hasServiceRecs) {
          // Add service recommendations as a pseudo-question
          loadedQuestions.push({
            id: "service_recommendations",
            type: "service_recommendations",
            isLocked: applicationId || assessmentId ? true : false,
          });
        }
        
        setActiveQuestions(loadedQuestions);
      } else {
        // If no questions in store, start with one empty question
        setActiveQuestions([
          { id: generateId(), type: "multiple_choice", isLocked: false },
        ]);
      }
      setIsInitialized(true);
    }
  }, [questions, serviceRecommendations, applicationId, assessmentId, isInitialized]);

  // Reset activeQuestions when store is cleared (e.g., after successful submission)
  useEffect(() => {
    if (isInitialized && questions.length === 0 && activeQuestions.length > 0) {
      // Store was cleared, reset to initial state
      setActiveQuestions([
        { id: generateId(), type: "multiple_choice", isLocked: false },
      ]);
    }
  }, [questions.length, isInitialized, activeQuestions.length]);

  // Check for questions without modules whenever questions or modules change
  useEffect(() => {
    // Find questions whose module no longer exists in the modules array
    const questionsWithoutMods = questions
      .filter((q) => {
        // Skip service recommendations
        if (q.type === "service_recommendations") return false;
        // Check if question has a module assigned
        if (!q.module) return true;
        // Check if that module exists in the current modules array
        const moduleExists = modules.some((m) => m.title === q.module);
        return !moduleExists;
      })
      .map((q) => q.id);

    setQuestionsWithoutModule(questionsWithoutMods);
  }, [questions, modules]);

  const handleClearAllQuestions = () => {
    clearQuestions();
    setActiveQuestions([
      { id: generateId(), type: "multiple_choice", isLocked: false },
    ]);
  };

  const baseQuestionTypes: {
    label: string;
    value: QuestionType;
  }[] = [
    { label: "Multiple Choice", value: "multiple_choice" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Short Text", value: "short_text" },
    { label: "Long Text", value: "long_text" },
    { label: "Dropdown", value: "dropdown" },
    { label: "Multiple Choice Grid", value: "multiple_choice_grid" },
    { label: "File Upload", value: "file_upload" },
  ];

  const assessmentOnlyTypes: {
    label: string;
    value: QuestionType;
  }[] = [
    { label: "Service Recommendations", value: "service_recommendations" },
  ];

  // Conditionally include service_recommendations for assessments
  const questionTypes =
    formType === "assessment"
      ? [...baseQuestionTypes, ...assessmentOnlyTypes]
      : baseQuestionTypes;

  const handleQuestionSave = (questionId: string, questionData: any) => {
    // console.log("Saving question:", questionId, questionData);

    // Handle service_recommendations separately (not stored in questions array)
    if (questionData.type === "service_recommendations") {
      // Service recommendations are handled by the component itself via setServiceRecommendations
      // Just lock the question
      setActiveQuestions((prev) =>
        prev.map((q) => (q.id === questionId ? { ...q, isLocked: true } : q))
      );
      return;
    }

    // Check if question already exists in store
    const existingQuestion = questions.find((q) => q.id === questionId);

    const questionWithId: Question = {
      ...questionData,
      id: questionId,
      // Preserve data_key if it exists (for existing questions)
      data_key: existingQuestion?.data_key || questionData.data_key,
      active: true, // All saved questions are active by default
    };

    // console.log("Existing question data_key:", existingQuestion?.data_key);
    // console.log("Question to save with data_key:", questionWithId.data_key);

    if (existingQuestion) {
      // Update existing question - this will properly track it as modified
      updateQuestion(questionId, questionWithId);
    } else {
      // Add new question
      addQuestion(questionWithId);
    }

    // Lock the current question
    setActiveQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, isLocked: true } : q))
    );
    console.log("Question locked:", questionId);
  };

  const handleQuestionTypeChange = (
    questionId: string,
    newType: QuestionType
  ) => {
    setActiveQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, type: newType } : q))
    );
  };

  const addNewQuestion = () => {
    const newQuestion: ActiveQuestion = {
      id: generateId(),
      type: "multiple_choice",
      isLocked: false,
    };
    setActiveQuestions((prev) => [...prev, newQuestion]);
  };

  const unlockQuestion = (questionId: string) => {
    // Just unlock for editing - keep data in store
    setActiveQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, isLocked: false } : q))
    );
  };

  const removeActiveQuestion = (questionId: string) => {
    // Check if it's a service_recommendations type
    const questionToRemove = activeQuestions.find((q) => q.id === questionId);

    if (questionToRemove?.type === "service_recommendations") {
      // Clear service recommendations from store
      setServiceRecommendations([]);
    } else {
      // Remove from questions store
      removeQuestion(questionId);
    }

    // Remove from active questions
    setActiveQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const renderQuestionComponent = (
    questionId: string,
    type: QuestionType,
    isLocked: boolean,
    questionNumber: number
  ) => {
    // Get existing question data from store if available
    const existingQuestion = questions.find((q) => q.id === questionId);

    const commonProps = {
      questionNo: questionNumber,
      onSave: (data: any) => handleQuestionSave(questionId, data),
      initialData: existingQuestion, // Pass existing data to prefill
      formType: formType, // Pass the form type from store
      isLocked: isLocked, // Pass the locked state
    };

    if (isLocked) {
      const savedQuestion = questions.find((q) => q.id === questionId);
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-gray-100/80 z-10 rounded-lg flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
              <Lock className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium">
                {type === "service_recommendations" ? "Recommendations Saved" : "Question Saved"}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => unlockQuestion(questionId)}
                className="ml-2"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </Button>
              {type !== "service_recommendations" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeActiveQuestion(questionId)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}
            </div>
          </div>
          {renderQuestionByType(type, commonProps)}
        </div>
      );
    }

    return renderQuestionByType(type, commonProps);
  };

  const renderQuestionByType = (type: QuestionType, props: any) => {
    switch (type) {
      case "multiple_choice":
        return <MultipleChoice {...props} />;
      case "checkbox":
        return <CheckboxQuestion {...props} />;
      case "short_text":
        return <ShortText {...props} />;
      case "long_text":
        return <LongTextQuestion {...props} />;
      case "dropdown":
        return <DropDownQuestion {...props} />;
      case "multiple_choice_grid":
        return <MultipleChoiceGridQuestion {...props} />;
      case "file_upload":
        return <FileUploadQuestion {...props} />;
      case "service_recommendations":
        return <ServiceRecommendation {...props} />;
      default:
        return <MultipleChoice {...props} />;
    }
  };

  const validateQuestionsHaveModules = (): boolean => {
    if (questionsWithoutModule.length > 0) {
      toast.error(
        `${questionsWithoutModule.length} question(s) without module. Please add modules to all questions.`
      );
      return false;
    }
    return true;
  };

  const handleFinalSave = () => {
    // Validate questions have modules
    if (!validateQuestionsHaveModules()) {
      return;
    }

    if (formType === "application") {
      const payload = buildApplicationPayload(
        {
          welcomeScreen,
          modules,
          questions,
          serviceRecommendations,
          deletedServiceRecommendations: getDeletedServiceRecommendations(),
        },
        !!applicationId,
        getModifiedAndNewQuestions,
        getModifiedAndNewModules,
        getDeletedQuestions,
        getDeletedModules
      );
      // console.log("Payload", payload);

      const mutationFn = applicationId ? updateApplication : createApplication;

      mutationFn(payload, {
        onSuccess: () => {
          clearQuestions();
          clearAll();
          router.push("/admin-dashboard/applications");
        },
      });
    } else if (formType === "assessment") {
      const payload = buildAssessmentPayload(
        {
          welcomeScreen,
          modules,
          questions,
          serviceRecommendations,
          deletedServiceRecommendations: getDeletedServiceRecommendations(),
        },
        !!assessmentId,
        getModifiedAndNewQuestions,
        getModifiedAndNewModules,
        getDeletedModules,
        getDeletedQuestions
      );

      console.log("Payload", payload)

      const mutationFn = assessmentId ? updateAssessment : createAssessment;

      mutationFn(payload, {
        onSuccess: () => {
          clearQuestions();
          clearAll();
          router.push("/admin-dashboard/assessment");
        },
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Warning Banner for Questions without Module */}
      {questionsWithoutModule.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 font-medium">
            {questionsWithoutModule.length} question(s) without a module assigned. Please add modules to all questions before submitting.
          </p>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assessment Builder</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview ({questions.length})
          </Button>
          {questions.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAllQuestions}
              className="text-red-600 hover:text-red-700"
            >
              Clear All Questions
            </Button>
          )}
        </div>
      </div>

      {/* Active Questions */}
      <div className="space-y-8">
        {activeQuestions.map((activeQuestion, index) => {
          const questionNumber = index + 1;
          const isMissingModule = questionsWithoutModule.includes(activeQuestion.id);
          const borderColor = isMissingModule ? "border-red-400 border-2" : "border";
          const bgColor = isMissingModule ? "bg-red-50" : "bg-gray-50";

          return (
            <div key={activeQuestion.id} className="space-y-4">
              {/* Missing Module Warning */}
              {isMissingModule && (
                <div className="bg-red-50 border border-red-300 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-700 text-sm font-medium">
                    Question {questionNumber} is missing a module. Please select a module for this question.
                  </p>
                </div>
              )}

              {/* Question Type Selector */}
              {!activeQuestion.isLocked && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 mr-2 py-2">
                    Question {questionNumber} Type:
                  </span>
                  {questionTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={
                        activeQuestion.type === type.value
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="text-xs rounded-2xl"
                      onClick={() =>
                        handleQuestionTypeChange(activeQuestion.id, type.value)
                      }
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* Question Component */}
              <div className={`${borderColor} rounded-lg p-1 ${bgColor}`}>
                {renderQuestionComponent(
                  activeQuestion.id,
                  activeQuestion.type,
                  activeQuestion.isLocked,
                  questionNumber
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add More Question Button */}
      <div className="flex justify-center items-center space-x-4 pt-4">
        <Button onClick={navigateBack}>Back</Button>
        <Button
          onClick={addNewQuestion}
          size="lg"
          className="bg-[#227C9D] hover:bg-[#1a5f7a]"
        >
          Add Another Question
        </Button>

        {/* <Button
          variant="outline"
          onClick={() => setShowPreview(true)}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Preview ({questions.length})
        </Button> */}
        <Button 
          variant="default" 
          className="m-2" 
          onClick={handleFinalSave}
          disabled={questionsWithoutModule.length > 0}
          title={questionsWithoutModule.length > 0 ? "Please add modules to all questions" : ""}
        >
          {isPending
            ? applicationId
              ? "Updating..."
              : "Saving..."
            : assessmentId
            ? "Update Form"
            : "Save Form"}
        </Button>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        showPreview={showPreview}
        onClose={() => setShowPreview(false)}
        applicationId={applicationId}
        assessmentId={assessmentId}
      />
    </div>
  );
}
