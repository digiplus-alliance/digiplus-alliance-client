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

type Option = {
  option: string;
  optiondesc: string;
  point_value: number;
};

type MultipleChoiceData = {
  question_no: number;
  question: string;
  descriptions: string;
  options: Option[];
  max_selections: number;
  required_score: number;
  module: string;
  required_option: boolean;
  type: "multiple_choice";
};

interface MultipleChoiceProps {
  questionNo?: number;
  onSave?: (data: MultipleChoiceData) => void;
}

const moduleOptions = [
  "Digital Literacy",
  "Business Strategy", 
  "Financial Management",
  "Marketing & Sales",
  "Technology Integration",
  "Leadership & Management",
];

export default function MultipleChoice({ 
  questionNo = 1, 
  onSave 
}: MultipleChoiceProps) {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [requiredScore, setRequiredScore] = useState<number>(0);
  const [selectedModule, setSelectedModule] = useState("");
  const [requiredOption, setRequiredOption] = useState(false);
  const [maxSelections, setMaxSelections] = useState<number>(1);
  
  const [options, setOptions] = useState<Option[]>([
    { option: "A", optiondesc: "", point_value: 0 },
    { option: "B", optiondesc: "", point_value: 0 },
  ]);

  const getNextOptionLetter = (currentLength: number) => {
    return String.fromCharCode(65 + currentLength); // A=65, B=66, C=67, etc.
  };

  const addOption = () => {
    const nextLetter = getNextOptionLetter(options.length);
    setOptions([...options, { 
      option: nextLetter, 
      optiondesc: "", 
      point_value: 0 
    }]);
  };

  const updateOption = (index: number, field: keyof Option, value: string | number) => {
    setOptions((prev) =>
      prev.map((opt, i) => 
        i === index ? { ...opt, [field]: value } : opt
      )
    );
  };

  const removeOption = (index: number) => {
    if (options.length > 2) { 
      setOptions((prev) => {
        const newOptions = prev.filter((_, i) => i !== index);
        // Re-assign letters after removal
        return newOptions.map((opt, i) => ({
          ...opt,
          option: String.fromCharCode(65 + i)
        }));
      });
    }
  };

  const handleSave = () => {
    const data: MultipleChoiceData = {
      question_no: questionNo,
      question,
      descriptions: description,
      options,
      max_selections: maxSelections,
      required_score: requiredScore,
      module: selectedModule,
      required_option: requiredOption,
      type: "multiple_choice"
    };

    if (onSave) {
      onSave(data);
    } else {
      console.log("Multiple Choice Data:", data);
    }
  };

  const isFormValid = () => {
    return (
      question.trim() !== "" &&
      options.every(opt => opt.optiondesc.trim() !== "" && opt.point_value >= 0) &&
      maxSelections >= 1 &&
      maxSelections <= options.length &&
      requiredScore >= 0 &&
      selectedModule !== ""
    );
  };

  return (
    <div className="flex gap-6 my-10">
      {/* Left Panel */}
      <div className="flex-1 p-6 border-[#D6D4D4] rounded-lg border">
        <div className="w-full flex flex-row text-left  justify-start items-center">
          <div className="text-2xl pb-6 text-gray-500">
            {questionNo}.
          </div>
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

        <div className="mt-2 space-y-3">
          {options.map((opt, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-[#EBFBFF] p-2 rounded-md border border-[#0E5F7D]"
            >
              <input type="radio" disabled className="h-4 w-4" />
              <span className="font-medium text-black min-w-[20px]">
                {opt.option}.
              </span>
              <Input
                placeholder="Option description"
                value={opt.optiondesc}
                onChange={(e) => updateOption(index, "optiondesc", e.target.value)}
                className="flex-1 bg-blue-50 border-none focus-visible:ring-0"
              />
              <Input
                type="number"
                placeholder="Points"
                value={opt.point_value || ""}
                onChange={(e) => updateOption(index, "point_value", parseInt(e.target.value) || 0)}
                className="w-20 bg-[#EBFBFF] border border-[#0E5F7D]"
              />
              {options.length > 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeOption(index)}
                  className="px-2 py-1 text-red-500 border-red-200 hover:bg-red-50"
                >
                  ×
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addOption}
            className="text-[#227C9D] border-[#0E5F7D] bg-transparent"
          >
            Add more
          </Button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-72 border-[#D6D4D4] rounded-lg p-6 border flex flex-col justify-between">
        <div className="space-y-4 text-gray-600 text-sm">
          <div className="flex justify-between items-center">
            <span>Required Score</span>
            <Input
              type="number"
              min="0"
              max="99"
              value={requiredScore || ""}
              onChange={(e) => setRequiredScore(parseInt(e.target.value) || 0)}
              className="w-16 h-8 text-right"
              placeholder="0"
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Max Selections</span>
            <Input
              type="number"
              min="1"
              max={options.length}
              value={maxSelections || ""}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                setMaxSelections(Math.max(1, Math.min(value, options.length)));
              }}
              className="w-16 h-8 text-right"
              placeholder="1"
            />
          </div>
          
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
              onCheckedChange={(checked) => setRequiredOption(checked as boolean)}
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
