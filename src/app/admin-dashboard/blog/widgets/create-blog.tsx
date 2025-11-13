"use client";
import { Button } from "@/components/ui/button";
import TextEditor from "./rich-text-editor";

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
  console.log("Editing blog with ID:", blogId);

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
          <Button variant="ghost" className="text-[#3D3A3A]">
            Schedule
          </Button>
          <Button variant="outline" className="bg-transparent">
            Preview
          </Button>
          <Button onClick={backToMainPage}>Publish</Button>
        </div>
      </div>
      <div>
        <TextEditor />
      </div>
    </div>
  );
}
