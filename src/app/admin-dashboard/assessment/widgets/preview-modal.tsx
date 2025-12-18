"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useFormStore,
  type Question as StoreQuestion,
  type QuestionType,
} from "@/store/form-store";
import { useCreateApplication } from "@/app/api/admin/applications/create-application";
import { useUpdateApplication } from "@/app/api/admin/applications/update-application";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateAssessment } from "@/app/api/admin/assessment/create-assessment";
import { useUpdateAssessment } from "@/app/api/admin/assessment/edit-assessment";
import {
  buildApplicationPayload,
  buildAssessmentPayload,
} from "@/utils/formSubmissionHelpers";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

interface PreviewModalProps {
  showPreview: boolean;
  onClose: () => void;
  applicationId?: string;
  assessmentId?: string;
}

const questionTypes: {
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
  { label: "Service Recommendations", value: "service_recommendations" },
];

export default function PreviewModal({
  showPreview,
  onClose,
  applicationId,
  assessmentId,
}: PreviewModalProps) {
  const {
    formType,
    welcomeScreen,
    modules,
    questions,
    serviceRecommendations,
    clearQuestions,
    clearAll,
    getModifiedAndNewQuestions,
    getModifiedAndNewModules,
    getDeletedQuestions,
    getDeletedModules,
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

  const [questionsWithoutModule, setQuestionsWithoutModule] = useState<string[]>([]);

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

  const getQuestionTypeLabel = (type: QuestionType): string => {
    return (
      questionTypes.find((qt) => qt.value === type)?.label || "Multiple Choice"
    );
  };

  const renderSavedQuestionPreview = (question: StoreQuestion) => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{question.question}</h3>
            {question.descriptions && (
              <p className="text-gray-600">{question.descriptions}</p>
            )}
            <div className="space-y-2 mt-4">
              {question.options?.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`preview-${question.id}`}
                    disabled
                    className="h-4 w-4"
                  />
                  <label className="text-sm">
                    {option.option}
                    {option.optiondesc && (
                      <span className="text-gray-500 ml-2">
                        - {option.optiondesc}
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{question.question}</h3>
            {question.descriptions && (
              <p className="text-gray-600">{question.descriptions}</p>
            )}
            <div className="space-y-2 mt-4">
              {question.options?.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input type="checkbox" disabled className="h-4 w-4" />
                  <label className="text-sm">
                    {option.option}
                    {option.optiondesc && (
                      <span className="text-gray-500 ml-2">
                        - {option.optiondesc}
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "dropdown":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{question.question}</h3>
            {question.descriptions && (
              <p className="text-gray-600">{question.descriptions}</p>
            )}
            <select
              disabled
              className="mt-4 w-full p-2 border rounded-md bg-gray-50"
            >
              <option>
                {question.dropdown_placeholder || "Select an option"}
              </option>
              {question.options?.map((option, idx) => (
                <option key={idx} value={option.option}>
                  {option.option}
                </option>
              ))}
            </select>
          </div>
        );

      case "short_text":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{question.question}</h3>
            {question.descriptions && (
              <p className="text-gray-600">{question.descriptions}</p>
            )}
            <input
              type="text"
              disabled
              placeholder={question.answer_placeholder || "Your answer"}
              className="mt-4 w-full p-2 border rounded-md bg-gray-50"
            />
            {question.max_characters && (
              <p className="text-xs text-gray-500">
                Max {question.max_characters} characters
              </p>
            )}
            {question.min_characters && (
              <p className="text-xs text-gray-500">
                Min {question.min_characters} characters
              </p>
            )}
          </div>
        );

      case "long_text":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{question.question}</h3>
            {question.descriptions && (
              <p className="text-gray-600">{question.descriptions}</p>
            )}
            <textarea
              disabled
              rows={question.rows || 4}
              placeholder={question.answer_placeholder || "Your answer"}
              className="mt-4 w-full p-2 border rounded-md bg-gray-50 resize-none"
            />
            {(question.min_characters || question.max_characters) && (
              <p className="text-xs text-gray-500">
                {question.min_characters && `Min ${question.min_characters}`}
                {question.min_characters && question.max_characters && " - "}
                {question.max_characters && `Max ${question.max_characters}`}
                {" characters"}
              </p>
            )}
          </div>
        );

      case "multiple_choice_grid":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{question.question}</h3>
            {question.descriptions && (
              <p className="text-gray-600">{question.descriptions}</p>
            )}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 bg-gray-100 text-left text-sm">
                      {/* Empty corner cell */}
                    </th>
                    {question.grid_columns?.map((col) => (
                      <th
                        key={col.id}
                        className="border border-gray-300 p-2 bg-yellow-100 text-center text-sm font-medium"
                      >
                        {col.text}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {question.grid_rows?.map((row) => (
                    <tr key={row.id}>
                      <td className="border border-gray-300 p-2 bg-blue-50 text-sm font-medium">
                        {row.text}
                      </td>
                      {question.grid_columns?.map((col) => (
                        <td
                          key={`${row.id}-${col.id}`}
                          className="border border-gray-300 p-2 text-center"
                        >
                          <input
                            type="radio"
                            name={`preview-${question.id}-${row.id}`}
                            disabled
                            className="h-4 w-4"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "file_upload":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{question.question}</h3>
            {question.descriptions && (
              <p className="text-gray-600">{question.descriptions}</p>
            )}
            {question.upload_instruction && (
              <p className="text-sm text-blue-600 italic">
                {question.upload_instruction}
              </p>
            )}
            <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 mb-1">
                {question.upload_instruction ||
                  "Click to upload or drag and drop"}
              </p>
              {question.acceptedFileTypes &&
                question.acceptedFileTypes.length > 0 && (
                  <p className="text-xs text-gray-500">
                    {question.acceptedFileTypes.join(", ")}
                  </p>
                )}
              <p className="text-xs text-gray-500 mt-1">
                {question.max_file_size &&
                  `Max ${question.max_file_size}MB per file`}
                {question.max_file_size && question.max_files && ", "}
                {question.max_files &&
                  `up to ${question.max_files} ${
                    question.max_files === 1 ? "file" : "files"
                  }`}
              </p>
            </div>
          </div>
        );

      case "service_recommendations":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{question.question}</h3>
            {question.descriptions && (
              <p className="text-gray-600">{question.descriptions}</p>
            )}
            <div className="space-y-3 mt-4">
              {question.recommendations?.map((rec, idx) => (
                <div
                  key={rec.id}
                  className="border border-[#FFA500] bg-[#FFF8EB] p-4 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {rec.service_name}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {rec.min_points} - {rec.max_points} points
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {rec.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {rec.levels?.map((level) => (
                      <Badge
                        key={level}
                        variant="secondary"
                        className="text-xs bg-[#227C9D] text-white"
                      >
                        {level}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleFinalSave = () => {
    if (formType === "application") {
      const payload = buildApplicationPayload(
        {
          welcomeScreen,
          modules,
          questions,
          serviceRecommendations,
        },
        !!applicationId,
        getModifiedAndNewQuestions,
        getModifiedAndNewModules,
        getDeletedQuestions,
        getDeletedModules,
      );

      // console.log("Application Payload:", payload);

      const mutationFn = applicationId ? updateApplication : createApplication;

      mutationFn(payload, {
        onSuccess: () => {
          onClose();
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
        },
        !!assessmentId,
        getModifiedAndNewQuestions,
        getModifiedAndNewModules,
        getDeletedModules,
        getDeletedQuestions
      );

      // console.log("Assessment Payload:", payload);

      const mutationFn = assessmentId ? updateAssessment : createAssessment;

      mutationFn(payload, {
        onSuccess: () => {
          onClose();
          clearQuestions();
          clearAll();
          router.push("/admin-dashboard/assessment");
        },
      });
    }
  };

  if (!showPreview) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Assessment Preview</h2>
            <div>
              <Button
                variant="default"
                className="m-2"
                onClick={handleFinalSave}
              >
                {isPending
                  ? applicationId
                    ? "Updating..."
                    : "Saving..."
                  : applicationId
                  ? "Update"
                  : "Save"}
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Warning Banner for Questions without Module */}
          {questionsWithoutModule.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 font-medium">
                {questionsWithoutModule.length} question(s) without a module assigned. Please go back and add modules to all questions before submitting.
              </p>
            </div>
          )}

          {questions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No questions saved yet.
            </p>
          ) : (
            questions.map((question, index) => (
              <Card key={question.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        Question {question.question_no}
                      </CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">
                          {getQuestionTypeLabel(question.type)}
                        </Badge>
                        {question.required_option && (
                          <Badge variant="destructive">Required</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Render the actual question preview */}
                  {renderSavedQuestionPreview(question)}

                  {/* Question metadata */}
                  <div className="bg-gray-50 p-3 rounded text-sm mt-4 border-t">
                    <div className="grid grid-cols-2 gap-2">
                      <p>
                        <strong>Module:</strong> {question.module}
                      </p>
                      <p>
                        <strong>Completion Points:</strong>{" "}
                        {"completion_points" in question
                          ? question.completion_points
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <div className="border-t p-4 flex items-center justify-center">
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
              : applicationId
              ? "Update"
              : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
