"use client";
import { useGetBlogPosts } from "@/app/api/admin/blog/getBlogs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "react-feather";
import { Skeleton } from "@/components/ui/skeleton";

function BlogPostSkeleton() {
  return (
    <div className="flex items-center justify-between p-2 border rounded-md">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-16 rounded-2xl" />
        </div>
      </div>
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export default function RecentBlog() {
  const router = useRouter();
  const { data: blogPosts, isLoading, error } = useGetBlogPosts();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogPostSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (error) {
      console.error("Blog posts error:", error);
      return (
        <div className="text-center py-6">
          <p className="text-sm text-red-500 mb-2">Error loading blog posts</p>
          <p className="text-xs text-gray-400">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        </div>
      );
    }

    if (!blogPosts || blogPosts.length === 0) {
      return <p className="text-sm text-gray-500">No blog posts available.</p>;
    }

    return (
      <div className="space-y-3">
        {blogPosts.slice(0, 4).map((blogPost, i) => (
          <div
            key={blogPost._id || i}
            className="flex items-center justify-between p-2 border rounded-md"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/about/team-placeholder-four.png"
                alt="author"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <div>
                <p className="font-normal text-base">
                  {blogPost.title || "No Title"}
                </p>
                <span
                  className={`text-xs text-gray-400 bg-[#F5F5F5] px-2 py-1 rounded-2xl`}
                >
                  No Status
                </span>
              </div>
            </div>
            <span className="text-xs text-[#B8B8B8]">
              {blogPost.createdAt
                ? new Date(blogPost.createdAt).toLocaleDateString()
                : "No date"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <h3 className="font-normal text-[#171616] ">Blog Post</h3>
        <button
          className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex"
          onClick={() => router.push("/admin-dashboard/blog")}
        >
          See all{" "}
          <span className="inline-block ml-1">
            <ArrowRight size={16} />
          </span>
        </button>
      </div>
      {renderContent()}
    </div>
  );
}
