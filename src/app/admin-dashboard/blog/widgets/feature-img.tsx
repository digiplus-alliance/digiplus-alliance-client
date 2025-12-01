"use client";
import { useState, useRef } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ImageData = {
  url: string; // blob URL or regular URL
  file?: File; // actual File object (only for uploaded files)
};

export default function FeatureImg({
  images,
  setImages,
}: {
  images: ImageData[];
  setImages: (images: ImageData[]) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check maximum images limit
      if (images.length >= 3) {
        alert("Maximum 3 images allowed");
        return;
      }
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit");
        return;
      }
      setFile(selectedFile);
      setLink(""); // Clear link if file is uploaded

      // Create preview URL
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClearLink = () => {
    setLink("");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      // Check maximum images limit
      if (images.length >= 3) {
        alert("Maximum 3 images allowed");
        return;
      }
      if (droppedFile.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit");
        return;
      }
      setFile(droppedFile);
      setLink("");

      // Create preview URL
      const objectUrl = URL.createObjectURL(droppedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSave = () => {
    // Check maximum images limit before saving
    if (images.length >= 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    if (file) {
      // Save the file with its blob URL for preview
      setImages([...images, { url: previewUrl, file: file }]);
      setFile(null);
      setPreviewUrl("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else if (link) {
      // Save the link URL without a file
      setImages([...images, { url: link }]);
      setLink("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleClearAll = () => {
    // Clear all saved images and revoke blob URLs
    images.forEach((imgData) => {
      if (imgData.url.startsWith("blob:")) {
        URL.revokeObjectURL(imgData.url);
      }
    });
    setImages([]);

    // Clear current selection
    handleClearFile();
    handleClearLink();
  };

  return (
    <div className="p-4 space-y-4 font-secondary bg-[#FFFFFF] rounded-sm border shadow-md border-[#C4C4C4] h-fit">
      <p className="text-[#8F8F8F] text-xs text-center">
        Kindly upload files according to hierarchy (Maximum 3 images)
      </p>

      {/* File upload area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="p-6 cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <BsCloudUpload className="mx-auto text-[#3D3A3A] mb-2" size={40} />

        <div className="flex flex-col justify-center items-center gap-2">
          <p className="font-medium text-sm text-[#7A7A7A]">
            {file ? file.name : "Choose featured image"}
          </p>
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
        <p className="text-xs text-gray-400 mt-2 text-center">
          Size limit: 10mb
        </p>
      </div>

      {/* Link input */}
      <div>
        <label className="text-sm text-gray-600">Use link</label>
        <div className="relative">
          <Input
            placeholder="https://"
            value={link}
            onChange={(e) => {
              const newLink = e.target.value;
              setLink(newLink);
              if (newLink) {
                setFile(null); // Clear file if link is entered
              }
            }}
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

      <div className="flex justify-center gap-2">
        {images.length > 0 && (
          <Button
            variant="outline"
            onClick={handleClearAll}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            Clear All
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={handleSave}
          disabled={(!file && !link) || images.length >= 3}
          className="bg-[#3D3A3A] text-white hover:bg-gray-500 disabled:opacity-50"
        >
          Add Image
        </Button>
      </div>

      {/* Display saved images */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">
            Selected Images ({images.length})
          </p>
          <div className="space-y-2">
            {images.map((img, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-50 p-2 rounded"
              >
                <span className="text-xs text-gray-600 flex-1">
                  Image {index + 1}
                </span>
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                  title="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
