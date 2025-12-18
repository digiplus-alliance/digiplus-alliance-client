"use client";

import { useEffect, useState } from "react";
import { useGetApplication } from "@/app/api/admin/applications/get-application";
import { Button } from "@/components/ui/button";
import { useApplicationStore } from "@/store/application";
import { FormTypeProvider } from "@/store/form-store";
import WelcomePageQuestion from "../../assessment/widgets/welcome-screen";
import AddModule from "../../assessment/widgets/add-module";
import QuestionScreen from "../../assessment/widgets/question-screen";
import { Loader2 } from "lucide-react";

export default function EditApplication({
  id,
  setActiveScreen,
}: {
  id: string;
  setActiveScreen: (screen: string) => void;
}) {
  const { data: application, isLoading } = useGetApplication({ id });
  const [activePage, setActivePage] = useState<
    "welcome" | "module" | "question"
  >("welcome");

  const { setWelcomeScreen, setModules, clearAll, addQuestion, setOriginalQuestions, setOriginalModules } =
    useApplicationStore();

  // Load application data into store
  useEffect(() => {
    const appData = application as any;
    if (appData) {
      // Clear existing data first
      clearAll();

      // console.log("Application Data:", application);

      // Set welcome screen data
      if (appData?.welcome_title) {
        const welcomeData = {
          title: appData.welcome_title,
          description: appData.welcome_description || "",
          instruction: appData.welcome_instruction || "",
        };
        setWelcomeScreen(welcomeData);
      }

      // Set modules data
      if (appData.modules && Array.isArray(appData.modules)) {
        const modules = appData.modules.map((mod: any) => ({
          id: mod.id || mod.temp_id || `mod-${mod.order}`,
          title: mod.title,
          description: mod.description || "",
          step: mod.order || mod.step,
          active: mod.active, // All loaded modules are active
        }));
        setModules(modules);
        // Set original modules for change tracking
        setOriginalModules(modules);
      }

      // Set questions data
      const loadedQuestions: any[] = [];
      if (appData.questions && Array.isArray(appData.questions)) {
        // console.log("Loading questions:", appData.questions.length);
        appData.questions.forEach((q: any, index: number) => {
          const questionData = mapAPIQuestionToStoreQuestion(q, index + 1);
          if (questionData) {
            addQuestion(questionData);
            loadedQuestions.push(questionData);
          }
        });
        // Set original questions for change tracking
        setOriginalQuestions(loadedQuestions);
      }
    }
  }, [application]);

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
    // Convert module_ref back to module title
    let moduleTitle = "";
    if (apiQuestion.module_ref && application) {
      const appData = application as any;
      if (appData.modules && Array.isArray(appData.modules)) {
        // module_ref is in format "mod-module_title" or just the title
        // First try to find by exact title match
        let matchingModule = appData.modules.find((mod: any) => 
          mod.title === apiQuestion.module_ref
        );
        
        // If not found, try to match by transformed title
        if (!matchingModule) {
          matchingModule = appData.modules.find((mod: any) => {
            const transformedTitle = mod.title.toLowerCase().replace(/\s+/g, "_");
            return transformedTitle === apiQuestion.module_ref || 
                   `mod-${transformedTitle}` === apiQuestion.module_ref;
          });
        }
        
        moduleTitle = matchingModule?.title || "";
      }
    }

    const baseQuestion = {
      id: apiQuestion.id || `q-${questionNo}`,
      question_no: questionNo,
      question: apiQuestion.question || "",
      descriptions: apiQuestion.description || "",
      required_score: 0,
      module: moduleTitle,
      required_option: apiQuestion.is_required !== undefined ? apiQuestion.is_required : false,
      data_key: apiQuestion.data_key || undefined, // Preserve data_key from API (undefined if not present)
      active: true, // All loaded questions are active
    };

    switch (apiQuestion.type) {
      case "multiple_choice":
        return {
          ...baseQuestion,
          type: "multiple_choice" as const,
          options: (apiQuestion.options || []).map((opt: any, idx: number) => ({
            option: opt.text || String.fromCharCode(65 + idx),
            optiondesc: opt.text || "",
            point_value: 0,
          })),
        };

      case "checkbox":
        return {
          ...baseQuestion,
          type: "checkbox" as const,
          options: (apiQuestion.options || []).map((opt: any, idx: number) => ({
            option: opt.text || String.fromCharCode(65 + idx),
            optiondesc: opt.text || "",
            point_value: 0,
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
        };

      case "long_text":
        return {
          ...baseQuestion,
          type: "long_text" as const,
          answer_placeholder: apiQuestion.placeholder || "",
          max_characters: apiQuestion.max_characters || 1000,
          min_characters: apiQuestion.min_characters || 50,
          rows: 4,
        };

      case "dropdown":
        return {
          ...baseQuestion,
          type: "dropdown" as const,
          dropdown_placeholder: apiQuestion.placeholder || "Select an option",
          options: (apiQuestion.options || []).map((opt: any, idx: number) => ({
            option: opt.text || `Option ${idx + 1}`,
            optiondesc: opt.text || "",
            point_value: 0,
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
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-gray-600">Loading application...</span>
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
              applicationId={id}
            />
          </div>
        );
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <FormTypeProvider formType="application">
      <div className="p-6 space-y-6 font-secondary rounded-tl-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-primary font-bold">Edit Application</h1>
          <Button variant="outline" onClick={() => setActiveScreen("list")}>
            Back to List
          </Button>
        </div>

        {/* Render the appropriate component */}
        {renderComponent()}
      </div>
    </FormTypeProvider>
  );
}
