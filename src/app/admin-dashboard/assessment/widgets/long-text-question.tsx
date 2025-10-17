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

type KeywordScore = {
  keyword: string;
  points: number;
};

type LongTextData = {
  question_no: number;
  question: string;
  descriptions: string;
  answer_placeholder: string;
  min_characters?: number;
  max_characters?: number;
  rows?: number;
  completion_points: number;
  keyword_scoring?: KeywordScore[];
  module: string;
  required_option: boolean;
  type: "long_text";
};

interface LongTextProps {
  questionNo?: number;
  onSave?: (data: LongTextData) => void;
  initialData?: LongTextData;
}

export default function LongTextQuestion({
  questionNo = 1,
  onSave,
  initialData,
}: LongTextProps) {
  const { modules, formType } = useFormStore();
  const moduleOptions = modules.map((mod) => mod.title);
  
  const [question, setQuestion] = useState(initialData?.question || "");
  const [description, setDescription] = useState(initialData?.descriptions || "");
  const [answerPlaceholder, setAnswerPlaceholder] = useState(initialData?.answer_placeholder || "");
  const [minCharacters, setMinCharacters] = useState<number>(initialData?.min_characters || 50);
  const [maxCharacters, setMaxCharacters] = useState<number>(initialData?.max_characters || 1000);
  const [rows, setRows] = useState<number>(initialData?.rows || 5);
  const [completionPoints, setCompletionPoints] = useState<number>(initialData?.completion_points || 0);
  const [keywordScoring, setKeywordScoring] = useState<KeywordScore[]>(initialData?.keyword_scoring || []);
  const [newKeyword, setNewKeyword] = useState("");
  const [newPoints, setNewPoints] = useState<number>(0);
  const [selectedModule, setSelectedModule] = useState(initialData?.module || "");
  const [requiredOption, setRequiredOption] = useState(initialData?.required_option || false);

  const handleAddKeyword = () => {
    if (newKeyword.trim() && newPoints > 0) {
      setKeywordScoring([
        ...keywordScoring,
        { keyword: newKeyword.trim(), points: newPoints },
      ]);
      setNewKeyword("");
      setNewPoints(0);
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywordScoring(keywordScoring.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const data: LongTextData = {
      question_no: questionNo,
      question,
      descriptions: description,
      answer_placeholder: answerPlaceholder,
      min_characters: minCharacters,
      max_characters: maxCharacters,
      rows: rows,
      completion_points: completionPoints,
      keyword_scoring: formType === "assessment" && keywordScoring.length > 0 ? keywordScoring : undefined,
      module: selectedModule,
      required_option: requiredOption,
      type: "long_text",
    };

    if (onSave) {
      onSave(data);
    } else {
      console.log("Long Text Data:", data);
    }
  };

  const isFormValid = () => {
    return (
      question.trim() !== "" &&
      answerPlaceholder.trim() !== "" &&
      minCharacters > 0 &&
      maxCharacters > minCharacters &&
      rows > 0 &&
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

        <div className="mt-4 space-y-4">
          {/* Answer Textarea Field Preview */}
          <div className="bg-[#EBFBFF] p-4 rounded-md border border-[#0E5F7D]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer Field Preview:
            </label>
            <textarea
              placeholder={
                answerPlaceholder ||
                "User will type their detailed answer here..."
              }
              disabled
              rows={rows}
              className="w-full bg-white border border-gray-300 p-3 rounded-md resize-none focus:ring-0 focus:outline-none"
              maxLength={maxCharacters}
            />
            <div className="text-xs text-gray-500 mt-2 flex justify-between">
              <span>Min characters: {minCharacters}</span>
              <span>Max characters: {maxCharacters}</span>
            </div>
          </div>

          {/* Configuration Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Answer Placeholder Configuration */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Answer Placeholder Text:
              </label>
              <Input
                placeholder="e.g., Provide detailed explanation..."
                value={answerPlaceholder}
                onChange={(e) => setAnswerPlaceholder(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Textarea Rows Configuration */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Textarea Height (rows):
              </label>
              <Input
                type="number"
                min="3"
                max="15"
                placeholder="5"
                value={rows || ""}
                onChange={(e) => setRows(parseInt(e.target.value) || 5)}
                className="w-24"
              />
            </div>

            {/* Min Characters Configuration */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Minimum Characters:
              </label>
              <Input
                type="number"
                min="1"
                max="5000"
                placeholder="50"
                value={minCharacters || ""}
                onChange={(e) =>
                  setMinCharacters(parseInt(e.target.value) || 50)
                }
                className="w-24"
              />
            </div>

            {/* Max Characters Configuration */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Maximum Characters:
              </label>
              <Input
                type="number"
                min="10"
                max="10000"
                placeholder="1000"
                value={maxCharacters || ""}
                onChange={(e) =>
                  setMaxCharacters(parseInt(e.target.value) || 1000)
                }
                className="w-24"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-72 border-[#D6D4D4] rounded-lg p-6 border flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4 text-gray-600 text-sm">
          {formType === "assessment" && (
            <>
              <div className="flex justify-between items-center">
                <span>Completion Points</span>
                <Input
                  type="number"
                  min="0"
                  max="99"
                  value={completionPoints || ""}
                  onChange={(e) => setCompletionPoints(parseInt(e.target.value) || 0)}
                  className="w-16 h-8 text-right"
                  placeholder="0"
                />
              </div>

              {/* Keyword Scoring Section */}
              <div className="border-t pt-4 space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Keyword Scoring
                </label>
                
                {/* Existing Keywords List */}
                {keywordScoring.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {keywordScoring.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded border"
                      >
                        <div className="flex-1">
                          <span className="text-xs font-medium text-gray-700">
                            {item.keyword}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({item.points} pts)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(index)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add New Keyword */}
                <div className="space-y-2 border-t pt-2">
                  <Input
                    placeholder="Keyword"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="w-full h-8 text-xs"
                  />
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="99"
                      placeholder="Points"
                      value={newPoints || ""}
                      onChange={(e) => setNewPoints(parseInt(e.target.value) || 0)}
                      className="w-20 h-8 text-xs"
                    />
                    <Button
                      type="button"
                      onClick={handleAddKeyword}
                      disabled={!newKeyword.trim() || newPoints <= 0}
                      className="h-8 text-xs flex-1"
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </>
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
