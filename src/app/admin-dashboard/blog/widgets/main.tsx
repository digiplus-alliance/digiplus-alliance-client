"use client";

import FilterButton from "@/components/FilterButton";
import { Button } from "@/components/ui/button";
import BlogTable from "./blog-table";
import Searchbar from "@/components/Searchbar";
import { useState } from "react";

export default function MainBlogPage({
  createBlogPost,
  editBlogPost,
}: {
  createBlogPost: () => void;
  editBlogPost: (blogId: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">Blog & News</h1>
          <p className="text-[#5E5B5B]">Managing blog/news content</p>
        </div>
        <div className="md:flex md:items-center md:gap-4">
          <Button onClick={() => createBlogPost()}>New Post</Button>
        </div>
      </div>
      <div className="border border-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4 bg-white p-4 rounded-lg">
          <Searchbar
            placeholder="Search blog posts..."
            onSearch={(query) => setSearchQuery(query)}
          />
          <FilterButton
            placeholder="Filter Status"
            options={[
              { label: "All", value: "all" },
              { label: "Published", value: "Published" },
              { label: "Draft", value: "Draft" },
            ]}
            onChange={handleFilterChange}
          />
        </div>
        <BlogTable
          editBlogPost={editBlogPost}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
        />
      </div>
    </div>
  );
}
