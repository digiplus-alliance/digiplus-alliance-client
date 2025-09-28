import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { blogPosts, allPosts } from "../data/blog-data";
import OurPartners from "../../widgets/our-partners";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | DigiPlus Alliance Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    keywords: post.tags.join(", "),
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  // Get related posts (excluding current post)
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/landing/blog">
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-80 lg:h-96">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article Header */}
              <div className="p-6 lg:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-black text-white hover:bg-gray-800">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {post.description}
                </p>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime} read
                  </div>
                  {post.author && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-blockquote:border-l-gray-300 prose-blockquote:text-gray-600"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Share Button */}
                <div className="mt-8 pt-6 border-t">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Article
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Articles */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/landing/blog/${relatedPost.id}`}>
                    <div className="flex gap-3 items-start hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        width={80}
                        height={60}
                        className="w-20 h-15 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-2 text-gray-900">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{relatedPost.date}</span>
                          <span>•</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Categories */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {["Innovation", "Research", "News", "Training", "Startups"].map((category) => (
                  <Link key={category} href={`/landing/blog?category=${category.toLowerCase()}`}>
                    <div className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 cursor-pointer">
                      <span className="text-gray-700">{category}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {allPosts.filter(p => p.category.toLowerCase() === category.toLowerCase()).length}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Training", "Innovation", "Africa", "Research", "MSMEs", "Startups", "Digital Hubs", "Empowerment"].map((tag) => (
                  <Badge key={tag} variant="outline" className="hover:bg-gray-100 cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Partners Section */}
        <div className="my-20">
          <OurPartners />
        </div>
      </div>
    </div>
  );
}
