"use client";
import { Button } from "@/components/ui/button";

export default function CreateBlog({
  backToMainPage,
}: {
  backToMainPage: () => void;
}) {
  const handleFilterChange = (value: string) => {
    console.log("Selected filter:", value);
  };
  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">News</h1>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button variant="ghost" className="text-[#3D3A3A]">Save as Draft</Button>
          <Button variant="ghost" className="text-[#3D3A3A]">Schedule</Button>
          <Button variant="outline" className="bg-transparent">Preview</Button>
          <Button onClick={backToMainPage}>Publish</Button>
        </div>
      </div>
    </div>
  );
}
