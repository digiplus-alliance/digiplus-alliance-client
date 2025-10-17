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
import { cleanObject } from "@/utils/cleanQuestionObject";
import { Question as APIQuestion } from "@/types/questions";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateAssessment } from "@/app/api/admin/assessment/create-assessment";

interface PreviewModalProps {
  showPreview: boolean;
  onClose: () => void;
  applicationId?: string;
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
}: PreviewModalProps) {
  const {
    formType,
    welcomeScreen,
    modules,
    questions,
    serviceRecommendations,
    clearQuestions,
    clearAll,
  } = useFormStore();

  const { mutate: createApplication, isPending: isCreating } =
    useCreateApplication();
  const { mutate: updateApplication, isPending: isUpdating } = applicationId
    ? useUpdateApplication(applicationId)
    : { mutate: () => {}, isPending: false };
  const { mutate: createAssessment, isPending: isCreatingAssessment } =
    useCreateAssessment();
  const router = useRouter();

  const isPending = isCreating || isUpdating || isCreatingAssessment;

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
      const payload = {
        welcome_title: welcomeScreen?.title,
        welcome_description: welcomeScreen?.description,
        welcome_instruction: welcomeScreen?.instruction,
        modules: modules.map((mod) => ({
          temp_id: `mod-${mod.step}`,
          title: mod.title,
          description: mod.description,
          order: mod.step,
        })),
        questions: questions.map((q) => {
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
                      text: opt?.option,
                      value: opt?.option.toLowerCase().replace(/\s+/g, "_"),
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
            max_selections:
              q.type === "checkbox" ? q.max_selections : undefined,
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
              ? modules.find((m) => m.title === q?.module)?.step
              : 1,
            module_ref: q?.module,
            acceptedFileTypes: q?.acceptedFileTypes,
            max_file_size:
              q.type === "file_upload" ? q.max_file_size : undefined,
            max_files: q.type === "file_upload" ? q.max_files : undefined,
            upload_instruction:
              q.type === "file_upload" ? q.upload_instruction : undefined,
          };

          return cleanObject(apiQuestion);
        }),
      };

      const mutationFn = applicationId ? updateApplication : createApplication;

      mutationFn(payload, {
        onSuccess: () => {
          onClose();
          clearQuestions();
          clearAll();
          router.push("/admin-dashboard/applications");
        },
      });
      return;
    } else if (formType === "assessment") {
      const payload = {
        title: welcomeScreen?.title || "New Assessment",
        description:
          welcomeScreen?.description ||
          "Evaluate your digital transformation readiness",
        instruction:
          welcomeScreen?.instruction || "Please complete all sections honestly",
        modules: modules.map((mod) => ({
          temp_id: `mod-${mod.title.toLowerCase().replace(/\s+/g, "_")}`,
          title: mod.title,
          description: mod.description,
          order: mod.step,
        })),
        questions: questions
          .filter((q) => q.type !== "service_recommendations") // Exclude service_recommendations from questions
          .map((q) => {
            const apiQuestion: APIQuestion = {
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
                        text: opt?.option,
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
              max_selections:
                q.type === "checkbox" ? q.max_selections : undefined,
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
                ? modules.find((m) => m.title === q?.module)?.step
                : 1,
              module_ref: `mod-${(q?.module)
                .toLowerCase()
                .replace(/\s+/g, "_")}`,
              acceptedFileTypes: q?.acceptedFileTypes,
              max_file_size:
                q.type === "file_upload" ? q.max_file_size : undefined,
              max_files: q.type === "file_upload" ? q.max_files : undefined,
              upload_instruction:
                q.type === "file_upload" ? q.upload_instruction : undefined,
              isActive: true,
            };
            return cleanObject(apiQuestion);
          }),
        // Add service_recommendations as a separate top-level field
        service_recommendations:
          serviceRecommendations.length > 0
            ? serviceRecommendations.map((rec) => ({
                service_id: rec.service_id,
                service_name: rec.service_name,
                description: rec.description,
                min_points: rec.min_points,
                max_points: rec.max_points,
                levels: rec.levels,
              }))
            : undefined,
      };

      // {payload && console.log("Assessment Payload:", payload?.modules[0].temp_id, payload?.questions[0].module_ref)}

      console.log("Assessment Payload:", payload);

      createAssessment(payload, {
        onSuccess: () => {
          onClose();
          clearQuestions();
          clearAll();
          router.push("/admin-dashboard/assessments");
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
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        <div className="p-6 space-y-6">
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
          <Button variant="default" className="m-2" onClick={handleFinalSave}>
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
