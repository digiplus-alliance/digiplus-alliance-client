"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAssessmentStore } from "@/store/assessment";
import { FormTypeProvider } from "@/store/form-store";
import WelcomePageQuestion from "./welcome-screen";
import AddModule from "./add-module";
import QuestionScreen from "./question-screen";
import { Loader2 } from "lucide-react";
import { useGetAssessment } from "@/app/api/admin/assessment/get-assessment";

interface EditAssessmentFormProps {
  assessmentId: string;
  onBack: () => void;
}

export default function EditAssessmentForm({
  assessmentId,
  onBack,
}: EditAssessmentFormProps) {
  const { data: assessmentData, isPending } = useGetAssessment({
    id: assessmentId,
  });
  // console.log("Assessment Data:", assessmentData);
  const [activePage, setActivePage] = useState<
    "welcome" | "module" | "question"
  >("welcome");

  const {
    setWelcomeScreen,
    setModules,
    clearAll,
    addQuestion,
    setServiceRecommendations,
  } = useAssessmentStore();

  // Load assessment data into store
  useEffect(() => {
    if (assessmentData) {
      // Clear existing data first
      clearAll();

      console.log("Assessment Data:", assessmentData);

      // Set welcome screen data
      if (assessmentData?.assessment) {
        const welcomeData = {
          title: assessmentData.assessment.title,
          description: assessmentData.assessment.description || "",
          instruction: assessmentData.assessment.instruction || "",
        };
        setWelcomeScreen(welcomeData);
      }

      // Set modules data
      if (assessmentData.modules && Array.isArray(assessmentData.modules)) {
        const modules = assessmentData.modules.map((mod: any) => ({
          id: mod.id || `mod-${mod.order}`,
          title: mod.title,
          description: mod.description || "",
          step: mod.order || mod.step,
        }));
        setModules(modules);
      }

      // Set questions data
      if (assessmentData.questions && Array.isArray(assessmentData.questions)) {
        console.log("Loading questions:", assessmentData.questions.length);
        assessmentData.questions.forEach((q: any, index: number) => {
          const questionData = mapAPIQuestionToStoreQuestion(q, index + 1);
          if (questionData) {
            addQuestion(questionData);
          }
        });
      }

      // Set service recommendations
      if (
        assessmentData.service_recommendations &&
        Array.isArray(assessmentData.service_recommendations)
      ) {
        setServiceRecommendations(assessmentData.service_recommendations);
      }
    }
  }, [assessmentData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAll();
    };
  }, []);

  const mapAPIQuestionToStoreQuestion = (
    apiQuestion: any,
    questionNo: number
  ) => {
    const baseQuestion = {
      id: apiQuestion.id || `q-${questionNo}`,
      question_no: questionNo,
      question: apiQuestion.question || "",
      descriptions: apiQuestion.description || "",
      required_score: 0,
      module: apiQuestion.module_ref || "",
      required_option: apiQuestion.is_required || false,
    };

    switch (apiQuestion.type) {
      case "multiple_choice":
        return {
          ...baseQuestion,
          type: "multiple_choice" as const,
          options: (apiQuestion.options || []).map((opt: any, idx: number) => ({
            option: opt.text || String.fromCharCode(65 + idx),
            optiondesc: opt.text || "",
            point_value: opt.points || 0,
          })),
        };

      case "checkbox":
        return {
          ...baseQuestion,
          type: "checkbox" as const,
          options: (apiQuestion.options || []).map((opt: any, idx: number) => ({
            option: opt.text || String.fromCharCode(65 + idx),
            optiondesc: opt.text || "",
            point_value: opt.points || 0,
          })),
          max_selections: apiQuestion.max_selections || 0,
          min_selections: apiQuestion.min_selections || 0,
        };

      case "short_text":
        return {
          ...baseQuestion,
          type: "short_text" as const,
          answer_placeholder: apiQuestion.placeholder || "",
          max_characters: apiQuestion.max_characters || 200,
          min_characters: apiQuestion.min_characters || 10,
          completion_points: apiQuestion.completion_points || 0,
        };

      case "long_text":
        return {
          ...baseQuestion,
          type: "long_text" as const,
          answer_placeholder: apiQuestion.placeholder || "",
          max_characters: apiQuestion.max_characters || 1000,
          min_characters: apiQuestion.min_characters || 50,
          rows: 4,
          completion_points: apiQuestion.completion_points || 0,
          keyword_scoring: apiQuestion.keyword_scoring || [],
        };

      case "dropdown":
        return {
          ...baseQuestion,
          type: "dropdown" as const,
          dropdown_placeholder: apiQuestion.placeholder || "Select an option",
          options: (apiQuestion.options || []).map((opt: any, idx: number) => ({
            option: opt.text || `Option ${idx + 1}`,
            optiondesc: opt.text || "",
            point_value: opt.points || 0,
          })),
        };

      case "multiple_choice_grid":
        return {
          ...baseQuestion,
          type: "multiple_choice_grid" as const,
          grid_columns: apiQuestion.grid_columns || [],
          grid_rows: apiQuestion.grid_rows || [],
        };

      case "file_upload":
        return {
          ...baseQuestion,
          type: "file_upload" as const,
          acceptedFileTypes: apiQuestion.acceptedFileTypes || [],
          max_file_size: apiQuestion.max_file_size || 5,
          max_files: apiQuestion.max_files || 1,
          upload_instruction: apiQuestion.upload_instruction || "",
        };

      case "service_recommendations":
        return {
          ...baseQuestion,
          type: "service_recommendations" as const,
          recommendations: apiQuestion.recommendations || [],
        };

      default:
        return null;
    }
  };

  const navigateToModule = ({
    step,
  }: {
    step: "welcome" | "module" | "question";
  }) => {
    setActivePage(step);
  };

  const renderComponent = () => {
    if (isPending) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-gray-600">Loading assessment...</span>
        </div>
      );
    }

    switch (activePage) {
      case "welcome":
        return (
          <div className="my-16">
            <WelcomePageQuestion
              onSubmit={() => navigateToModule({ step: "module" })}
            />
          </div>
        );
      case "module":
        return (
          <div className="my-16">
            <AddModule
              navigateBack={() => navigateToModule({ step: "welcome" })}
              navigateNext={() => navigateToModule({ step: "question" })}
            />
          </div>
        );
      case "question":
        return (
          <div>
            <QuestionScreen
              navigateBack={() => navigateToModule({ step: "module" })}
              assessmentId={assessmentId}
            />
          </div>
        );
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <FormTypeProvider formType="assessment">
      <div className="p-6 space-y-6 font-secondary rounded-tl-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-primary font-bold">Edit Assessment</h1>
          <Button variant="outline" onClick={onBack}>
            Back to List
          </Button>
        </div>

        {/* Render the appropriate component */}
        {renderComponent()}
      </div>
    </FormTypeProvider>
  );
}
