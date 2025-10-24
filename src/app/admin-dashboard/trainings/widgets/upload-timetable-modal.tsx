"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, UploadCloud } from "lucide-react";

type UploadFileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (file?: File, link?: string) => void;
  currentFile?: File;
  currentLink?: string;
};

export default function UploadFileDialog({
  open,
  onOpenChange,
  onUpload,
  currentFile,
  currentLink,
}: UploadFileDialogProps) {
  const [file, setFile] = React.useState<File | null>(currentFile ?? null);
  const [link, setLink] = React.useState(currentLink ?? "");

  // Sync state when dialog opens with current values
  React.useEffect(() => {
    if (open) {
      setFile(currentFile ?? null);
      setLink(currentLink ?? "");
    }
  }, [open, currentFile, currentLink]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 10 * 1024 * 1024, // 10 MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
  });

  const handleSubmit = () => {
    onUpload(file ?? undefined, link || undefined);
    onOpenChange(false);
  };

  const handleClearFile = () => {
    setFile(null);
  };

  const handleClearLink = () => {
    setLink("");
  };

  const hasContent = file || link.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl bg-white">
        <DialogHeader className="flex justify-between items-start">
          <DialogTitle className="text-lg font-medium text-[#706C6C] text-start">
            Upload file
          </DialogTitle>
        </DialogHeader>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={` rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-red-400 bg-red-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-10 w-10 text-gray-500" />
          <div className="mt-2 flex flex-row justify-center items-center gap-2">
            <p className=" font-medium">{file ? file.name : "Choose file"}</p>
            {file && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearFile();
                }}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {!file && <p className="text-sm text-gray-500">or drag here</p>}
          </div>
          <p className="text-xs text-gray-400 mt-1">Size limit: 10mb</p>
        </div>

        {/* Link input */}
        <div>
          <label className="text-sm text-gray-600">Use link</label>
          <div className="relative">
            <Input
              placeholder="https://"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 pr-10"
            />
            {link && (
              <button
                onClick={handleClearLink}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 transition-colors"
                title="Clear link"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Action button */}
        <Button
          className="w-full mt-4"
          onClick={handleSubmit}
          disabled={!hasContent}
        >
          {hasContent ? (
            <div className="flex items-center gap-2">
              <span>✓</span>
              Insert to all participants table
            </div>
          ) : (
            "Select file or link to continue"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
