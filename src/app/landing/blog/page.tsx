"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArticleCard } from "./widgets/ArticleCard";
import { FeaturedArticle } from "./widgets/FeaturedArticle";
import { SidebarArticle } from "./widgets/SideBarArticle";
import { BlogCategoryFilter } from "./widgets/BlogCategoryFilter";
import { BlogSearch } from "./widgets/BlogSearch";
import { BlogPagination } from "./widgets/BlogPagination";
import { featuredPost, sidebarPosts, allPosts, BlogPost } from "./data/blog-data";

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const searchParams = useSearchParams();
  const category = searchParams?.get('category');
  
  const [searchResults, setSearchResults] = useState<BlogPost[]>(allPosts);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter posts based on category if provided
  const filteredPosts = category 
    ? searchResults.filter(post => post.category.toLowerCase() === category.toLowerCase())
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
    document.getElementById('articles-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Top Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FeaturedArticle {...featuredPost} />
        </div>
        <div className="space-y-3">
          {sidebarPosts.map((post, i) => (
            <SidebarArticle key={i} {...post} />
          ))}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div id="articles-section" className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Articles` : 'All Articles'}
        </h2>
        
        <BlogSearch posts={allPosts} onSearchResults={handleSearchResults} />
        <BlogCategoryFilter currentCategory={category || undefined} />
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {currentPosts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, totalPosts)} of {totalPosts} articles
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
              : "No articles found matching your search."
            }
          </p>
          <p className="text-gray-400 mt-2">
            {category 
              ? "Try browsing other categories or check out all articles."
              : "Try adjusting your search terms or browse all articles."
            }
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
