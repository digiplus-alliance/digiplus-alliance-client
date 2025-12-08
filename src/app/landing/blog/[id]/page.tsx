"use client";

import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useGetBlogPost } from "@/app/api/admin/blog/getBlog";
import { useGetBlogPosts } from "@/app/api/admin/blog/getBlogs";
import OurPartners from "../../widgets/our-partners";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagramSquare } from "react-icons/fa";
import BlogContentViewer from "@/components/BlogContentViewer";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Helper function to strip HTML tags
const stripHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>/g, "").trim();
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [id, setId] = React.useState<string>("");

  // Unwrap params
  React.useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  const { data: blogPost, isLoading, error } = useGetBlogPost(id);
  const { data: allBlogPosts } = useGetBlogPosts();

  // Share handlers
  const handleShare = (
    platform: "twitter" | "facebook" | "instagram" | "linkedin"
  ) => {
    if (!blogPost) return;

    const url = window.location.href;
    const title = encodeURIComponent(blogPost.title);
    const description = encodeURIComponent(
      stripHtmlTags(blogPost.content).substring(0, 150)
    );

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      instagram: url, // Instagram doesn't support direct sharing via URL, so we'll copy to clipboard
    };

    if (platform === "instagram") {
      // For Instagram, copy the link to clipboard
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("Link copied to clipboard! Share it on Instagram.");
        })
        .catch(() => {
          alert("Failed to copy link. Please copy it manually: " + url);
        });
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  // Loading state
  if (isLoading || !id) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-600">Loading blog post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blogPost) {
    notFound();
  }

  // Transform blog data
  const post = {
    id: blogPost._id,
    image: blogPost.featuredImageUrls[0] || "/blog/image_one.png",
    title: blogPost.title,
    description: stripHtmlTags(blogPost.content).substring(0, 150) + "...",
    content: blogPost.content,
    tags: blogPost.tags.filter((tag) => tag.trim() !== ""),
    date: new Date(blogPost.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    category: blogPost.tags.find((tag) => tag.trim() !== "") || "General",
    readTime: `${Math.max(
      1,
      Math.ceil(stripHtmlTags(blogPost.content).split(" ").length / 200)
    )}min`,
    author: blogPost.author,
  };

  // Get related posts from relatedBlogs or fallback to recent posts
  const relatedPosts =
    blogPost.relatedBlogs && blogPost.relatedBlogs.length > 0
      ? blogPost.relatedBlogs.slice(0, 3).map((related: any) => ({
          id: related._id,
          image: related.featuredImageUrls[0] || "/blog/image_one.png",
          title: related.title,
          description: stripHtmlTags(related.content).substring(0, 120) + "...", // Extract first 120 chars
          date: new Date(related.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          }),
          tag:
            related.tags.find((tag: string) => tag.trim() !== "") || "General",
          readTime: `${Math.max(
            1,
            Math.ceil(stripHtmlTags(related.content).split(" ").length / 200)
          )}min`,
        }))
      : allBlogPosts
          ?.filter((p) => p._id !== blogPost._id && p.isPublished)
          .slice(0, 3)
          .map((p) => ({
            id: p._id,
            image: p.featuredImageUrls[0] || "/blog/image_one.png",
            title: p.title,
            description: stripHtmlTags(p.content).substring(0, 120) + "...", // Extract first 120 chars
            date: new Date(p.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            }),
            tag: p.tags.find((tag: string) => tag.trim() !== "") || "General",
            readTime: `${Math.max(
              1,
              Math.ceil(stripHtmlTags(p.content).split(" ").length / 200)
            )}min`,
          })) || [];

  // Get all unique tags from all posts for the sidebar
  const allTags = Array.from(
    new Set(
      allBlogPosts?.flatMap((p) => p.tags.filter((tag) => tag.trim() !== "")) ||
        []
    )
  ).slice(0, 8); // Show top 8 tags

  // Get all featured images
  const featuredImages = blogPost.featuredImageUrls || [];
  const imageCount = featuredImages.length;

  // Render featured images based on count (like preview modal)
  const renderImages = () => {
    if (imageCount === 0) {
      return (
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No featured image</p>
        </div>
      );
    }

    if (imageCount === 1) {
      // Single image - full width
      return (
        <div className="w-full h-96 relative rounded-lg overflow-hidden">
          <Image
            src={featuredImages[0]}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      );
    }

    if (imageCount === 2) {
      // Two images - 70% : 30% grid
      return (
        <div className="grid grid-cols-[70%_30%] gap-4">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={featuredImages[0]}
              alt="Featured image 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={featuredImages[1]}
              alt="Featured image 2"
              fill
              className="object-cover"
            />
          </div>
        </div>
      );
    }

    if (imageCount >= 3) {
      // Three or more images - 70% : 30% (2 images stacked)
      return (
        <div className="grid grid-cols-[70%_30%] gap-4">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={featuredImages[0]}
              alt="Featured image 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative h-[calc(50%-0.5rem)] rounded-lg overflow-hidden">
              <Image
                src={featuredImages[1]}
                alt="Featured image 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[calc(50%-0.5rem)] rounded-lg overflow-hidden">
              <Image
                src={featuredImages[2]}
                alt="Featured image 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#EBFBFF] font-secondary">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/landing/blog">
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Main Content - Centered */}
        <div className="max-w-6xl mx-auto">
          <article className=" overflow-hidden p-6 lg:p-8">
            {/* Featured Images */}
            <div className="mb-6">{renderImages()}</div>

            {/* Tags, Date, and Author Badges */}
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-6">
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap justify-center items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#CCFFF9] border border-[#4397B6] text-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Date */}
              <div>
                <p className="px-3 py-1 bg-[#CCFFF9] border border-[#4397B6] text-primary rounded-full text-sm">
                  {new Date(blogPost.createdAt).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Author */}
              {post.author && (
                <div>
                  <p className="px-3 py-1 bg-[#CCFFF9] border border-[#4397B6] text-primary rounded-full text-sm">
                    {post.author}
                  </p>
                </div>
              )}
            </div>

            {/* Title */}
            {post.title && (
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary text-center my-4">
                  {post.title}
                </h1>
              </div>
            )}

            {/* Content - Rendered with TipTap */}
            <BlogContentViewer content={post.content} />

            {/* Share Button */}
            <div className="mt-8 pt-6 flex flex-row justify-center">
              <p className="mr-2 text-[#5E5B5B] font-primary">Share: </p>
              <div className="flex gap-4 items-center justify-center">
                <button
                  onClick={() => handleShare("twitter")}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Share on Twitter"
                >
                  <FaSquareXTwitter
                    size={25}
                    className="text-gray-700 hover:text-black"
                  />
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Share on Facebook"
                >
                  <ImFacebook2
                    size={22}
                    className="text-gray-700 hover:text-[#1877F2]"
                  />
                </button>
                <button
                  onClick={() => handleShare("instagram")}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Share on Instagram"
                >
                  <FaInstagramSquare
                    size={25}
                    className="text-gray-700 hover:text-[#E4405F]"
                  />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedin
                    size={25}
                    className="text-gray-700 hover:text-[#0A66C2]"
                  />
                </button>
              </div>
            </div>
          </article>

          {/* Related Articles - Below Main Content */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">
                Related Posts
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/landing/blog/${relatedPost.id}`}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full bg-[#CCF1FF]">
                      <div>
                        <div className="relative h-48 mx-4">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover rounded-2xl"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mx-4 py-2">
                          <span>{relatedPost.date}</span>
                          <span>•</span>
                          <span>{relatedPost.tag}</span>
                          <span>•</span>
                          <span>{relatedPost.readTime}</span>
                        </div>

                        <div className="px-4 my-2">
                          <h3 className="font-semibold text-lg line-clamp-2 text-gray-900 mb-2">
                            {relatedPost.title}
                          </h3>
                        </div>

                        <div>
                          {relatedPost.description && (
                            <p className="text-gray-700 px-4 mb-4 line-clamp-3">
                              {relatedPost.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <OurPartners />
      </div>
    </div>
  );
}
