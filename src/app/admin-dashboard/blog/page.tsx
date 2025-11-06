"use client";

import { useState } from "react";
import MainBlogPage from "./widgets/main";
import CreateBlog from "./widgets/create-blog";

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("mainpage");
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const renderComponent = () => {
    switch (activeTab) {
      case "mainpage":
        return (
          <div>
            <MainBlogPage
              createBlogPost={() => {
                setSelectedBlogId(null);
                setActiveTab("createblog");
              }}
              editBlogPost={(blogId: string) => {
                setSelectedBlogId(blogId);
                setActiveTab("createblog");
              }}
            />
          </div>
        );
      case "createblog":
        return (
          <div>
            <CreateBlog
              backToMainPage={() => {
                setSelectedBlogId(null);
                setActiveTab("mainpage");
              }}
              blogId={selectedBlogId}
            />
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      {renderComponent()}
    </div>
  );
}
