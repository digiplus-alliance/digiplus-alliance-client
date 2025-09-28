"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BlogPost } from "../data/blog-data";

interface BlogSearchProps {
  posts: BlogPost[];
  onSearchResults: (results: BlogPost[]) => void;
}

export function BlogSearch({ posts, onSearchResults }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      onSearchResults(posts);
      return;
    }

    const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      post.category.toLowerCase().includes(query.toLowerCase())
    );

    onSearchResults(filteredPosts);
  };

  return (
    <div className="relative mb-6 w-1/2">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
