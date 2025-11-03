"use client";

import { useState } from "react";
import MainBlogPage from "./widgets/main";
import CreateBlog from "./widgets/create-blog";
import { set } from "zod";

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("mainpage");

  const renderComponent = () => {
    switch (activeTab) {
      case "mainpage":
        return (
          <div>
            <MainBlogPage createBlogPost={() => setActiveTab("createblog")} />
          </div>
        );
      case "createblog":
        return (
          <div>
            <CreateBlog backToMainPage={() => setActiveTab("mainpage")} />
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
