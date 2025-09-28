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
};

export default function UploadFileDialog({
  open,
  onOpenChange,
  onUpload,
}: UploadFileDialogProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [link, setLink] = React.useState("");

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl bg-white">
        <DialogHeader className="flex justify-between items-start">
          <DialogTitle className="text-lg font-medium text-[#706C6C] text-start">Upload file</DialogTitle>
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
            <p className=" font-medium">
              {file ? file.name : "Choose file"}
            </p>
            <p className="text-sm text-gray-500">
              or drag here
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Size limit: 10mb
          </p>
        </div>

        {/* Link input */}
        <div>
          <label className="text-sm text-gray-600">Use link</label>
          <Input
            placeholder="https://"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Action button */}
        <Button
          className="w-full mt-4"
          onClick={handleSubmit}
        >
          Insert to all participants table
        </Button>
      </DialogContent>
    </Dialog>
  );
}
