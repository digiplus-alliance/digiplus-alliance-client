"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "@/store/form-store";

type ShortTextData = {
  question_no: number;
  question: string;
  descriptions: string;
  answer_placeholder: string;
  min_characters?: number;
  max_characters?: number;
  completion_points: number;
  module: string;
  required_option: boolean;
  type: "short_text";
};

interface ShortTextProps {
  questionNo?: number;
  onSave?: (data: ShortTextData) => void;
  initialData?: ShortTextData;
}

export default function ShortText({
  questionNo = 1,
  onSave,
  initialData,
}: ShortTextProps) {
  const { modules, formType } = useFormStore();
  const moduleOptions = modules.map((mod) => mod.title);

  const [question, setQuestion] = useState(initialData?.question || "");
  const [description, setDescription] = useState(
    initialData?.descriptions || ""
  );
  const [answerPlaceholder, setAnswerPlaceholder] = useState(
    initialData?.answer_placeholder || "Enter your answer here..."
  );
  const [maxCharacters, setMaxCharacters] = useState<number>(
    initialData?.max_characters || 200
  );
  const [minCharacters, setMinCharacters] = useState<number>(
    initialData?.min_characters || 1
  );
  const [completionPoints, setCompletionPoints] = useState<number>(
    initialData?.completion_points || 0
  );
  const [selectedModule, setSelectedModule] = useState(
    initialData?.module || ""
  );
  const [requiredOption, setRequiredOption] = useState(
    initialData?.required_option || false
  );

  const handleSave = () => {
    const data: ShortTextData = {
      question_no: questionNo,
      question,
      descriptions: description,
      answer_placeholder: answerPlaceholder || "Enter your answer here...",
      min_characters: minCharacters,
      max_characters: maxCharacters,
      completion_points: completionPoints,
      module: selectedModule,
      required_option: requiredOption,
      type: "short_text",
    };

    if (onSave) {
      onSave(data);
    } else {
      console.log("Short Text Data:", data);
    }
  };

  const isFormValid = () => {
    return (
      question.trim() !== "" &&
      maxCharacters > 0 &&
      completionPoints >= 0 &&
      selectedModule !== ""
    );
  };

  return (
    <div className="flex gap-6 my-10">
      {/* Left Panel */}
      <div className="flex-1 p-6 border-[#D6D4D4] rounded-lg border">
        <div className="w-full flex flex-row text-left justify-start items-center">
          <div className="text-2xl pb-6 text-gray-500">{questionNo}.</div>
          <textarea
            rows={2}
            placeholder="Ask your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full text-[#7A7A7A] text-left border-none shadow-none resize-none focus:ring-0 focus:outline-none px-4 flex items-center"
          />
        </div>

        <div className="w-full text-center space-y-2">
          <textarea
            rows={2}
            placeholder="Description is optional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-[#7A7A7A] text-left border-none shadow-none resize-none focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="mt-4 space-y-3">
          {/* Answer Input Field Preview */}
          <div className="bg-[#EBFBFF] p-4 rounded-md border border-[#0E5F7D]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer Field Preview:
            </label>
            <Input
              placeholder={
                answerPlaceholder || "User will type their answer here..."
              }
              disabled
              className="w-full bg-white border border-gray-300"
              maxLength={maxCharacters}
            />
            <div className="text-xs text-gray-500 mt-1">
              Max characters: {maxCharacters}
            </div>
          </div>

          {/* Answer Placeholder Configuration */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Answer Placeholder Text (Optional):
            </label>
            <Input
              placeholder="e.g., Enter your answer here..."
              value={answerPlaceholder}
              onChange={(e) => setAnswerPlaceholder(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Default: &quot;Enter your answer here...&quot;
            </p>
          </div>

          {/* Character Limit Configuration */}
          <div className="flex gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Minimum Character:
              </label>
              <Input
                type="number"
                min="1"
                max="10"
                placeholder="10"
                value={minCharacters || ""}
                onChange={(e) =>
                  setMinCharacters(parseInt(e.target.value) || 10)
                }
                className="w-32"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Maximum Character:
              </label>
              <Input
                type="number"
                min="1"
                max="1000"
                placeholder="50"
                value={maxCharacters || ""}
                onChange={(e) =>
                  setMaxCharacters(parseInt(e.target.value) || 100)
                }
                className="w-32"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-72 border-[#D6D4D4] rounded-lg p-6 border flex flex-col justify-between">
        <div className="space-y-4 text-gray-600 text-sm">
          {formType === "assessment" && (
            <div className="flex justify-between items-center">
              <span>Completion Point</span>
              <Input
                type="number"
                min="0"
                max="99"
                value={completionPoints || ""}
                onChange={(e) =>
                  setCompletionPoints(parseInt(e.target.value) || 0)
                }
                className="w-16 h-8 text-right"
                placeholder="0"
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <span>Module</span>
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {moduleOptions.map((module) => (
                  <SelectItem key={module} value={module}>
                    {module}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <span>Required Option</span>
            <Checkbox
              checked={requiredOption}
              onCheckedChange={(checked) =>
                setRequiredOption(checked as boolean)
              }
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleSave}
            disabled={!isFormValid()}
            className="flex-1 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
