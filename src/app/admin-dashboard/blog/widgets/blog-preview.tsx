"use client";
import BlogContentViewer from "@/components/BlogContentViewer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

type ImageData = {
  url: string;
  file?: File;
};

export default function BlogPreview({
  isOpen,
  onClose,
  title,
  content,
  tags,
  featuredImages,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  tags: string;
  featuredImages: ImageData[];
}) {
  // Parse tags (comma-separated)
  const tagArray = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  // Separate blob URLs (uploaded files) from regular URLs (links)
  const uploadedImages = featuredImages.filter((imgData) =>
    imgData.url.startsWith("blob:")
  );
  const imageLinks = featuredImages.filter(
    (imgData) => !imgData.url.startsWith("blob:")
  );

  // Determine image layout based on count
  const imageCount = uploadedImages.length;

  const renderImages = () => {
    if (imageCount === 0) {
      return (
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No featured image</p>
        </div>
      );
    }

    if (imageCount === 1) {
      // Single image - full width
      return (
        <div className="w-full h-96 relative rounded-lg overflow-hidden">
          <Image
            src={uploadedImages[0].url}
            alt="Featured image"
            fill
            className="object-cover"
            unoptimized={uploadedImages[0].url.startsWith("blob:")}
          />
        </div>
      );
    }

    if (imageCount === 2) {
      // Two images - 70% : 30% grid
      return (
        <div className="grid grid-cols-[70%_30%] gap-4">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={uploadedImages[0].url}
              alt="Featured image 1"
              fill
              className="object-cover"
              unoptimized={uploadedImages[0].url.startsWith("blob:")}
            />
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={uploadedImages[1].url}
              alt="Featured image 2"
              fill
              className="object-cover"
              unoptimized={uploadedImages[1].url.startsWith("blob:")}
            />
          </div>
        </div>
      );
    }

    if (imageCount >= 3) {
      // Three or more images - 70% : 30% (2 images stacked)
      return (
        <div className="grid grid-cols-[70%_30%] gap-4">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={uploadedImages[0].url}
              alt="Featured image 1"
              fill
              className="object-cover"
              unoptimized={uploadedImages[0].url.startsWith("blob:")}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative h-[calc(50%-0.5rem)] rounded-lg overflow-hidden">
              <Image
                src={uploadedImages[1].url}
                alt="Featured image 2"
                fill
                className="object-cover"
                unoptimized={uploadedImages[1].url.startsWith("blob:")}
              />
            </div>
            <div className="relative h-[calc(50%-0.5rem)] rounded-lg overflow-hidden">
              <Image
                src={uploadedImages[2].url}
                alt="Featured image 3"
                fill
                className="object-cover"
                unoptimized={uploadedImages[2].url.startsWith("blob:")}
              />
            </div>
          </div>
        </div>
      );
    }
  };
  const [author] = useState("John Doe");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Blog Preview</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 font-secondary">
          {/* Featured Images */}
          <div className="space-y-4">
            {/* <h3 className="text-sm font-semibold text-gray-600">Featured Image</h3> */}
            {renderImages()}
          </div>

          {/* Image Links */}
          {imageLinks.length > 0 && (
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700">
                Image Links
              </h3>
              <div className="space-y-1">
                {imageLinks.map((imgData, index) => (
                  <div
                    key={index}
                    className="text-sm text-blue-600 hover:text-blue-800 break-all"
                  >
                    <a
                      href={imgData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {imgData.url}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4">
            {/* Tags */}
            {tagArray.length > 0 && (
              <div className="space-y-2">
                {/* <h3 className="text-sm font-semibold text-gray-600">Tags</h3> */}
                <div className="flex flex-wrap justify-center items-center gap-2">
                  {tagArray.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#CCFFF9] border border-[#4397B6] text-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="px-3 py-1 bg-[#CCFFF9] border border-[#4397B6] text-primary rounded-full text-sm">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              {/* Author */}
              {author && (
                <p className="px-3 py-1 bg-[#CCFFF9] border border-[#4397B6] text-primary rounded-full text-sm">
                  {author}
                </p>
              )}
            </div>
          </div>

          {/* Title */}
          {title && (
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-primary text-center my-4">
                {title}
              </h1>
            </div>
          )}

          {/* Content - Rendered with TipTap */}
          {content ? <BlogContentViewer content={content} /> : <p>No content available</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
