"use client";
import { Button } from "@/components/ui/button";
import TextEditor from "./rich-text-editor";
import FeatureImg from "./feature-img";
import AddTags from "./add-tags";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import BlogPreview from "./blog-preview";

export default function CreateBlog({
  backToMainPage,
  blogId,
}: {
  backToMainPage: () => void;
  blogId?: string | null;
}) {
  const handleFilterChange = (value: string) => {
    console.log("Selected filter:", value);
  };

  // Log the blogId when component mounts or when it changes
  // console.log("Editing blog with ID:", blogId);

  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [featuredImages, setFeaturedImages] = useState<string[]>([]);

  const onChangePostContent = (content: string) => {
    setPostContent(content);
  };

  const handlePublish = () => {
    console.log("Title:", title);
    console.log("Content:", postContent);
    console.log("Tags:", tags);
    // backToMainPage();
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">News</h1>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button variant="ghost" className="text-[#3D3A3A]">
            Save as Draft
          </Button>
          {/* <Button variant="ghost" className="text-[#3D3A3A]">
            Schedule
          </Button> */}
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={handlePreview}
          >
            Preview
          </Button>
          <Button onClick={handlePublish}>Publish</Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-[7fr_3fr] gap-6">
        <div>
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
        <div className="space-y-6 flex flex-col">
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
