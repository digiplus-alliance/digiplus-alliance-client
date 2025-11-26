"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ArticleCard } from "./widgets/ArticleCard";
import { FeaturedArticle } from "./widgets/FeaturedArticle";
import { SidebarArticle } from "./widgets/SideBarArticle";
import { BlogCategoryFilter } from "./widgets/BlogCategoryFilter";
import { BlogSearch } from "./widgets/BlogSearch";
import { BlogPagination } from "./widgets/BlogPagination";
import { BlogPost } from "./data/blog-data";
import { useGetBlogPosts } from "@/app/api/admin/blog/getBlogs";

const POSTS_PER_PAGE = 6;

// Helper function to strip HTML tags for description
const stripHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>/g, "").trim();
};

export default function Blog() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");
  const { data: apiBlogPosts, isLoading, error } = useGetBlogPosts();

  // Transform API data to match BlogPost interface
  const allPosts = useMemo(() => {
    if (!apiBlogPosts) return [];

    return apiBlogPosts
      .filter((post) => post.isPublished) // Only show published posts
      .map((post) => ({
        id: post._id,
        image: post.featuredImageUrls[0] || "/blog/image_one.png", // Use first image or fallback
        title: post.title,
        description: stripHtmlTags(post.content).substring(0, 150) + "...", // Strip HTML and extract first 150 chars
        content: post.content,
        tags: post.tags.filter((tag) => tag.trim() !== ""), // Filter out empty tags
        date: new Date(post.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }), // Format: "15 Jun"
        category: post.tags.find((tag) => tag.trim() !== "") || "General", // Use first non-empty tag as category
        readTime: `${Math.max(
          1,
          Math.ceil(stripHtmlTags(post.content).split(" ").length / 200)
        )}min`, // Estimate read time
        author: post.author,
        authorImage: undefined,
      }));
  }, [apiBlogPosts]);

  // Get featured post (most recent) and sidebar posts (next 3 recent)
  const featuredPost = allPosts[0];
  const sidebarPosts = allPosts.slice(0, 4);

  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize search results when allPosts is loaded
  useEffect(() => {
    if (allPosts.length > 0) {
      setSearchResults(allPosts);
    }
  }, [allPosts]);

  // Filter posts based on category (tag) if provided
  const filteredPosts = category
    ? searchResults.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
      )
    : searchResults;

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset pagination when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchResults]);

  const handleSearchResults = (results: BlogPost[]) => {
    setSearchResults(results);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of articles section
    document
      .getElementById("articles-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-red-600">Failed to load blog posts.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No posts available
  if (!allPosts || allPosts.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-gray-600 text-lg">
              No blog posts available yet.
            </p>
            <p className="text-gray-400">Check back soon for new content!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Top Section */}
      {featuredPost && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <FeaturedArticle {...featuredPost} />
          </div>
          {sidebarPosts.length > 0 && (
            <div className="space-y-3">
              {sidebarPosts.map((post, i) => (
                <SidebarArticle key={post.id} {...post} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search and Filter Section */}
      <div id="articles-section" className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {category
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`
            : "All Articles"}
        </h2>

        <BlogSearch posts={allPosts} onSearchResults={handleSearchResults} />
        <BlogCategoryFilter
          currentCategory={category || undefined}
          posts={allPosts}
        />
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {currentPosts.length > 0 ? startIndex + 1 : 0}-
        {Math.min(endIndex, totalPosts)} of {totalPosts} articles
      </div>

      {/* Article Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {currentPosts.map((article, i) => (
          <ArticleCard key={`${article.id}-${i}`} {...article} />
        ))}
      </div>

      {/* No results message */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {category
              ? `No articles found in the "${category}" category.`
              : "No articles found matching your search."}
          </p>
          <p className="text-gray-400 mt-2">
            {category
              ? "Try browsing other categories or check out all articles."
              : "Try adjusting your search terms or browse all articles."}
          </p>
        </div>
      )}

      {/* Pagination */}
      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
