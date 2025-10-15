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
import { useAssessmentStore } from "@/store/assessment";

type GridColumn = {
  id: string;
  text: string;
  value: string;
};

type GridRow = {
  id: string;
  text: string;
};

type MultipleChoiceGridData = {
  question_no: number;
  question: string;
  descriptions: string;
  grid_columns: GridColumn[];
  grid_rows: GridRow[];
  required_score: number;
  module: string;
  required_option: boolean;
  type: "multiple_choice_grid";
};

interface MultipleChoiceGridQuestionProps {
  questionNo?: number;
  onSave?: (data: MultipleChoiceGridData) => void;
  initialData?: MultipleChoiceGridData;
}

export default function MultipleChoiceGridQuestion({
  questionNo = 1,
  onSave,
  initialData,
}: MultipleChoiceGridQuestionProps) {
  const modules = useAssessmentStore((state) => state.modules);
  const formType = useAssessmentStore((state) => state.formType);
  const moduleOptions = modules.map((mod) => mod.title);

  const [question, setQuestion] = useState(initialData?.question || "");
  const [description, setDescription] = useState(
    initialData?.descriptions || ""
  );
  const [requiredScore, setRequiredScore] = useState<number>(
    initialData?.required_score || 0
  );
  const [selectedModule, setSelectedModule] = useState(
    initialData?.module || ""
  );
  const [requiredOption, setRequiredOption] = useState(
    initialData?.required_option || false
  );

  // Grid columns (header options)
  const [columns, setColumns] = useState<GridColumn[]>(
    initialData?.grid_columns || [
      { id: "col-1", text: "Strongly Disagree", value: "strongly_disagree" },
      { id: "col-2", text: "Disagree", value: "disagree" },
      { id: "col-3", text: "Neutral", value: "neutral" },
      { id: "col-4", text: "Agree", value: "agree" },
      { id: "col-5", text: "Strongly Agree", value: "strongly_agree" },
    ]
  );

  // Grid rows (questions/statements)
  const [rows, setRows] = useState<GridRow[]>(
    initialData?.grid_rows || [
      { id: "row-1", text: "Statement 1" },
      { id: "row-2", text: "Statement 2" },
    ]
  );

  const addColumn = () => {
    const newId = `col-${columns.length + 1}`;
    setColumns([
      ...columns,
      {
        id: newId,
        text: `Option ${columns.length + 1}`,
        value: `option_${columns.length + 1}`,
      },
    ]);
  };

  const removeColumn = (id: string) => {
    if (columns.length > 2) {
      setColumns((prev) => prev.filter((col) => col.id !== id));
    }
  };

  const updateColumn = (id: string, field: keyof GridColumn, value: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === id
          ? {
              ...col,
              [field]: value,
              ...(field === "text" && {
                value: value.toLowerCase().replace(/\s+/g, "_"),
              }),
            }
          : col
      )
    );
  };

  const addRow = () => {
    const newId = `row-${rows.length + 1}`;
    setRows([
      ...rows,
      {
        id: newId,
        text: `Statement ${rows.length + 1}`,
      },
    ]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const updateRow = (id: string, text: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, text } : row))
    );
  };

  const handleSave = () => {
    const data: MultipleChoiceGridData = {
      question_no: questionNo,
      question,
      descriptions: description,
      grid_columns: columns,
      grid_rows: rows,
      required_score: requiredScore,
      module: selectedModule,
      required_option: requiredOption,
      type: "multiple_choice_grid",
    };

    if (onSave) {
      onSave(data);
    } else {
      console.log("Multiple Choice Grid Question Data:", data);
    }
  };

  const isFormValid = () => {
    return (
      question.trim() !== "" &&
      columns.length >= 2 &&
      rows.length >= 1 &&
      columns.every((col) => col.text.trim() !== "") &&
      rows.every((row) => row.text.trim() !== "") &&
      requiredScore >= 0 &&
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

        {/* Grid Columns Configuration */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">
              Grid Columns (Response Options)
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addColumn}
              className="text-[#227C9D] border-[#0E5F7D] bg-transparent"
            >
              Add Column
            </Button>
          </div>
          {columns.map((col) => (
            <div
              key={col.id}
              className="flex items-center gap-3 bg-[#FFF8EB] p-2 rounded-md border border-[#FFA500]"
            >
              <Input
                placeholder="Column header text"
                value={col.text}
                onChange={(e) => updateColumn(col.id, "text", e.target.value)}
                className="flex-1 bg-yellow-50 border-none focus-visible:ring-0"
              />
              {columns.length > 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeColumn(col.id)}
                  className="px-2 py-1 text-red-500 border-red-200 hover:bg-red-50"
                >
                  ×
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Grid Rows Configuration */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">
              Grid Rows (Statements/Sub-questions)
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRow}
              className="text-[#227C9D] border-[#0E5F7D] bg-transparent"
            >
              Add Row
            </Button>
          </div>
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex items-center gap-3 bg-[#EBFBFF] p-2 rounded-md border border-[#0E5F7D]"
            >
              <Input
                placeholder="Row statement/question"
                value={row.text}
                onChange={(e) => updateRow(row.id, e.target.value)}
                className="flex-1 bg-blue-50 border-none focus-visible:ring-0"
              />
              {rows.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeRow(row.id)}
                  className="px-2 py-1 text-red-500 border-red-200 hover:bg-red-50"
                >
                  ×
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Grid Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Grid Preview:
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 bg-gray-100 text-left text-sm">
                    {/* Empty corner cell */}
                  </th>
                  {columns.map((col) => (
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
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="border border-gray-300 p-2 bg-blue-50 text-sm font-medium">
                      {row.text}
                    </td>
                    {columns.map((col) => (
                      <td
                        key={`${row.id}-${col.id}`}
                        className="border border-gray-300 p-2 text-center"
                      >
                        <input
                          type="radio"
                          name={row.id}
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
      </div>

      {/* Right Panel */}
      <div className="w-72 border-[#D6D4D4] rounded-lg p-6 border flex flex-col justify-between">
        <div className="space-y-4 text-gray-600 text-sm">
          {formType === "assessment" && (
            <div className="flex justify-between items-center">
              <span>Required Score</span>
              <Input
                type="number"
                min="0"
                max="99"
                value={requiredScore || ""}
                onChange={(e) =>
                  setRequiredScore(parseInt(e.target.value) || 0)
                }
                className="w-16 h-8 text-right"
                placeholder="0"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium">Module</label>
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                {moduleOptions.map((module, idx) => (
                  <SelectItem key={idx} value={module}>
                    {module}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="required"
              checked={requiredOption}
              onCheckedChange={(checked) =>
                setRequiredOption(checked as boolean)
              }
            />
            <label
              htmlFor="required"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Required
            </label>
          </div>

          <div className="pt-4 border-t">
            <div className="text-xs text-gray-500 space-y-1">
              <p>
                <strong>Columns:</strong> {columns.length}
              </p>
              <p>
                <strong>Rows:</strong> {rows.length}
              </p>
              <p>
                <strong>Total Cells:</strong> {columns.length * rows.length}
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={!isFormValid()}
          className="w-full mt-4 bg-[#227C9D] hover:bg-[#0E5F7D]"
        >
          Save Question
        </Button>
      </div>
    </div>
  );
}
