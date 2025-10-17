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
import { Upload, File, X } from "lucide-react";

type FileUploadData = {
  question_no?: number;
  question: string;
  descriptions?: string;
  acceptedFileTypes: string[];
  max_file_size?: number; // in MB
  max_files?: number;
  upload_instruction?: string;
  required_score?: number;
  module: string;
  required_option: boolean;
  type: "file_upload";
};

interface FileUploadQuestionProps {
  questionNo?: number;
  onSave?: (data: FileUploadData) => void;
  initialData?: FileUploadData;
}

// Common file type groups
const FILE_TYPE_PRESETS = {
  documents: {
    label: "Documents",
    types: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
  },
  images: {
    label: "Images",
    types: [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
  },
  spreadsheets: {
    label: "Spreadsheets",
    types: [".xlsx", ".xls", ".csv"],
  },
  presentations: {
    label: "Presentations",
    types: [".ppt", ".pptx"],
  },
  archives: {
    label: "Archives",
    types: [".zip", ".rar", ".7z", ".tar", ".gz"],
  },
  videos: {
    label: "Videos",
    types: [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"],
  },
  audio: {
    label: "Audio",
    types: [".mp3", ".wav", ".aac", ".flac", ".ogg"],
  },
};

export default function FileUploadQuestion({
  questionNo = 1,
  onSave,
  initialData,
}: FileUploadQuestionProps) {
  const { modules, formType } = useFormStore();
  const moduleOptions = modules.map((mod) => mod.title);

  const [question, setQuestion] = useState(initialData?.question || "");
  const [description, setDescription] = useState(
    initialData?.descriptions || ""
  );
  const [uploadInstruction, setUploadInstruction] = useState(
    initialData?.upload_instruction || ""
  );
  const [acceptedFileTypes, setAcceptedFileTypes] = useState<string[]>(
    initialData?.acceptedFileTypes || [".pdf", ".doc", ".docx"]
  );
  const [maxFileSize, setMaxFileSize] = useState<number>(
    initialData?.max_file_size || 10
  );
  const [maxFiles, setMaxFiles] = useState<number>(
    initialData?.max_files || 1
  );
  const [customFileType, setCustomFileType] = useState("");
  const [requiredScore, setRequiredScore] = useState<number>(
    initialData?.required_score || 0
  );
  const [selectedModule, setSelectedModule] = useState(
    initialData?.module || ""
  );
  const [requiredOption, setRequiredOption] = useState(
    initialData?.required_option || false
  );

  const addCustomFileType = () => {
    if (customFileType.trim() !== "") {
      const fileType = customFileType.startsWith(".")
        ? customFileType.trim().toLowerCase()
        : `.${customFileType.trim().toLowerCase()}`;
      
      if (!acceptedFileTypes.includes(fileType)) {
        setAcceptedFileTypes([...acceptedFileTypes, fileType]);
      }
      setCustomFileType("");
    }
  };

  const removeFileType = (type: string) => {
    setAcceptedFileTypes((prev) => prev.filter((t) => t !== type));
  };

  const addFileTypePreset = (preset: keyof typeof FILE_TYPE_PRESETS) => {
    const newTypes = FILE_TYPE_PRESETS[preset].types.filter(
      (type) => !acceptedFileTypes.includes(type)
    );
    setAcceptedFileTypes([...acceptedFileTypes, ...newTypes]);
  };

  const handleSave = () => {
    const data: FileUploadData = {
      // question_no: questionNo,
      question,
      // descriptions: description,
      acceptedFileTypes,
      // max_file_size: maxFileSize,
      // max_files: maxFiles,
      // upload_instruction: uploadInstruction,
      // required_score: requiredScore,
      module: selectedModule,
      required_option: requiredOption,
      type: "file_upload",
    };

    if (onSave) {
      onSave(data);
    } else {
      console.log("File Upload Question Data:", data);
    }
  };

  const isFormValid = () => {
    return (
      question.trim() !== "" &&
      acceptedFileTypes.length > 0 &&
      maxFileSize > 0 &&
      maxFiles > 0 &&
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

        {/* Upload Instruction */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Instructions (Optional):
          </label>
          <Input
            placeholder="e.g., Please upload your resume in PDF format"
            value={uploadInstruction}
            onChange={(e) => setUploadInstruction(e.target.value)}
            className="w-full"
          />
        </div>

        {/* File Type Presets */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Add File Types:
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(FILE_TYPE_PRESETS).map(([key, preset]) => (
              <Button
                key={key}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addFileTypePreset(key as keyof typeof FILE_TYPE_PRESETS)}
                className="text-xs"
              >
                + {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom File Type Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Custom File Type:
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., .pdf or pdf"
              value={customFileType}
              onChange={(e) => setCustomFileType(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomFileType();
                }
              }}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={addCustomFileType}
              variant="outline"
              className="text-[#227C9D] border-[#0E5F7D]"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Accepted File Types Display */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accepted File Types ({acceptedFileTypes.length}):
          </label>
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border min-h-[60px]">
            {acceptedFileTypes.length === 0 ? (
              <p className="text-sm text-gray-400">No file types added yet</p>
            ) : (
              acceptedFileTypes.map((type) => (
                <div
                  key={type}
                  className="flex items-center gap-1 bg-[#EBFBFF] px-3 py-1 rounded-full border border-[#0E5F7D] text-sm"
                >
                  <File className="h-3 w-3" />
                  <span>{type}</span>
                  <button
                    type="button"
                    onClick={() => removeFileType(type)}
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* File Size and Count Limits */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max File Size (MB):
            </label>
            <Input
              type="number"
              min="1"
              max="100"
              value={maxFileSize}
              onChange={(e) => setMaxFileSize(parseInt(e.target.value) || 1)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Files:
            </label>
            <Input
              type="number"
              min="1"
              max="10"
              value={maxFiles}
              onChange={(e) => setMaxFiles(parseInt(e.target.value) || 1)}
              className="w-full"
            />
          </div>
        </div>

        {/* Upload Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Upload Field Preview:
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 mb-1">
              {uploadInstruction || "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-500">
              {acceptedFileTypes.join(", ") || "Any file type"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Max {maxFileSize}MB per file, up to {maxFiles}{" "}
              {maxFiles === 1 ? "file" : "files"}
            </p>
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
                <strong>Accepted Types:</strong> {acceptedFileTypes.length}
              </p>
              <p>
                <strong>Max Size:</strong> {maxFileSize}MB
              </p>
              <p>
                <strong>Max Files:</strong> {maxFiles}
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
