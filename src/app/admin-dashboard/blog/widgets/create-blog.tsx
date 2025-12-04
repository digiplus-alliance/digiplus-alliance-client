"use client";
import { Button } from "@/components/ui/button";
import TextEditor from "./rich-text-editor";
import FeatureImg from "./feature-img";
import AddTags from "./add-tags";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import BlogPreview from "./blog-preview";
import { useCreateBlog } from "@/app/api/admin/blog/createBlog";
import { useGetBlogPost } from "@/app/api/admin/blog/getBlog";
import { useUpdateBlog } from "@/app/api/admin/blog/updateBlog";

type ImageData = {
  url: string; // blob URL or regular URL
  file?: File; // actual File object (only for uploaded files)
};

export default function CreateBlog({
  backToMainPage,
  blogId,
}: {
  backToMainPage: () => void;
  blogId?: string | null;
}) {
  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [featuredImages, setFeaturedImages] = useState<ImageData[]>([]);
  const [actionType, setActionType] = useState<"publish" | "draft" | null>(null);
  const { mutate: createBlog, isPending: isLoading } = useCreateBlog();
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog(blogId || undefined);
  const {
    data: blogPost,
    isLoading: blogLoading,
    error,
  } = useGetBlogPost(blogId);

  // Prefill form fields when blog data is fetched
  useEffect(() => {
    if (blogPost && blogId) {
      setTitle(blogPost.title || "");
      setPostContent(blogPost.content || "");
      setTags(blogPost.tags?.join(", ") || "");

      // Convert existing image URLs to ImageData format
      if (blogPost.featuredImageUrls && blogPost.featuredImageUrls.length > 0) {
        const existingImages: ImageData[] = blogPost.featuredImageUrls.map(
          (url) => ({
            url,
          })
        );
        setFeaturedImages(existingImages);
      }
    }
  }, [blogPost, blogId]);

  const onChangePostContent = (content: string) => {
    setPostContent(content);
  };

  const clearFormData = () => {
    setTitle("");
    setPostContent("");
    setTags("");
    setFeaturedImages([]);
  };

  const handlePublish = () => {
    setActionType("publish");
    // Separate files from URLs
    const imageFiles: File[] = [];
    const imageUrls: string[] = [];

    featuredImages.forEach((imageData) => {
      if (imageData.file) {
        // This is an uploaded file
        imageFiles.push(imageData.file);
      } else {
        // This is a regular URL
        imageUrls.push(imageData.url);
      }
    });

    // Create FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", postContent);
    formData.append("isPublished", "true");
    formData.append("tags", tags);

    // Add regular URLs
    imageUrls.forEach((url) => {
      formData.append("featuredImageUrls[]", url);
    });

    // Add files
    imageFiles.forEach((file) => {
      formData.append("featuredImageFiles", file);
    });

    if (blogId) {
      // Update existing blog
      updateBlog(formData as any, {
        onSuccess: () => {
          clearFormData();
          setActionType(null);
        },
        onError: () => {
          setActionType(null);
        },
      });
    } else {
      // Create new blog
      createBlog(formData as any, {
        onSuccess: () => {
          clearFormData();
          setActionType(null);
        },
        onError: () => {
          setActionType(null);
        },
      });
    }
  };

  const handleDraft = () => {
    setActionType("draft");
    // Separate files from URLs
    const imageFiles: File[] = [];
    const imageUrls: string[] = [];

    featuredImages.forEach((imageData) => {
      if (imageData.file) {
        // This is an uploaded file
        imageFiles.push(imageData.file);
      } else {
        // This is a regular URL
        imageUrls.push(imageData.url);
      }
    });

    // Create FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", postContent);
    formData.append("isPublished", "false");
    formData.append("tags", tags);

    // Add regular URLs
    imageUrls.forEach((url) => {
      formData.append("featuredImageUrls[]", url);
    });

    // Add files
    imageFiles.forEach((file) => {
      formData.append("featuredImageFiles", file);
    });

    if (blogId) {
      // Update existing blog
      updateBlog(formData as any, {
        onSuccess: () => {
          clearFormData();
          setActionType(null);
        },
        onError: () => {
          setActionType(null);
        },
      });
    } else {
      // Create new blog
      createBlog(formData as any, {
        onSuccess: () => {
          clearFormData();
          setActionType(null);
        },
        onError: () => {
          setActionType(null);
        },
      });
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  // Show loading skeleton when fetching blog data for editing
  if (blogId && blogLoading) {
    return (
      <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
        <Button onClick={backToMainPage}>Back to Blog List</Button>
        <div className="flex items-start md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl text-primary font-bold">News</h1>
          </div>
          <div className="hidden md:flex md:items-center md:gap-4">
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid lg:grid-cols-[7fr_3fr] gap-6">
          {/* Main content skeleton */}
          <div>
            {/* Title skeleton */}
            <div className="w-full mb-4 p-3 h-14 bg-white rounded animate-pulse"></div>
            {/* Editor skeleton */}
            <div className="w-full h-[400px] bg-white rounded animate-pulse"></div>
          </div>
          {/* Sidebar skeleton */}
          <div className="space-y-6 flex flex-col">
            {/* Featured image skeleton */}
            <div className="bg-white p-4 rounded-lg space-y-3">
              <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            {/* Tags skeleton */}
            <div className="bg-white p-4 rounded-lg space-y-3">
              <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if blog failed to load
  if (blogId && error) {
    return (
      <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
        <Button onClick={backToMainPage}>Back to Blog List</Button>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-red-600">Failed to load blog post.</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      <Button onClick={backToMainPage}>Back to Blog List</Button>
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">News</h1>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button
            variant="ghost"
            className="text-[#3D3A3A]"
            onClick={handleDraft}
            disabled={isLoading || isUpdating}
          >
            {(isLoading || isUpdating) && actionType === "draft"
              ? "Saving as Draft..."
              : "Save as Draft"}
          </Button>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={handlePreview}
          >
            Preview
          </Button>
          <Button onClick={handlePublish} disabled={isLoading || isUpdating}>
            {(isLoading || isUpdating) && actionType === "publish"
              ? "Publishing..."
              : "Publish"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[70%] w-full">
          <Input
            placeholder="Blog Title"
            className="w-full mb-4 p-3 text-xl font-semibold bg-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextEditor
            content={postContent}
            onChangeContent={onChangePostContent}
          />
        </div>
        <div className="space-y-6 flex flex-col w-full lg:w-[30%]">
          <FeatureImg images={featuredImages} setImages={setFeaturedImages} />
          <AddTags tags={tags} setTags={setTags} />
        </div>
      </div>

      {/* Preview Modal */}
      <BlogPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={title}
        content={postContent}
        tags={tags}
        featuredImages={featuredImages}
      />
    </div>
  );
}
