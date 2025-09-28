"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import RelatedCard, { RelatedCardSkeleton, RelatedPost } from "./RelatedCard";

type Blog = {
  id: string;
  title: string;
  content: string[];
  image: string;
  gallery: string[];
  category: string;
  author: string;
  date: string;
};

export default function BlogContentPage() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBlog({
        id: "1",
        title:
          "GIZ’s Dr. Petra Warnecke in Lagos: Digital Innovation Hubs are pivotal",
        content: [
          "GIZ Nigeria & West Africa recently hosted Dr. Petra Warnecke (Director General of GIZ Africa) to an engaging fireside chat that highlighted the presence of functional Digital Innovation Hubs in Nigeria...",
          "The insightful session was led by one of our esteemed Digital Innovation Hub Lead Partners...",
          "According to Damilola Obidairo: It was a great honor to share our progress...",
          "The Digital Transformation Center Nigeria (DTC Nigeria) is co-funded by the German Federal Ministry...",
        ],
        image: "https://picsum.photos/800/500",
        gallery: [
          "https://picsum.photos/200/200?1",
          "https://picsum.photos/200/200?2",
          "https://picsum.photos/200/200?3",
        ],
        category: "News",
        author: "Name of Author",
        date: "Wednesday June 18, 2025",
      });

      setRelated([
        {
          id: "r1",
          title: "GIZ’s Dr. Petra Warnecke in Lagos",
          excerpt: "GIZ Nigeria & West Africa recently hosted Dr. Petra Warnecke...",
          image: "https://picsum.photos/400/300",
          date: "03 Jun",
          category: "News",
          readTime: "3min",
        },
        {
          id: "r2",
          title: "A Journey Through the Streets",
          excerpt:
            "Between March 4 and 21, 2025, the DigiPlus Alliance Digital Innovation Hub...",
          image: "https://picsum.photos/400/301",
          date: "03 Jun",
          category: "News",
          readTime: "3min",
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Hero */}
      {loading ? (
        <Skeleton className="w-full h-96 rounded-2xl" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <img
            src={blog?.image}
            alt={blog?.title}
            className="rounded-2xl w-full h-96 object-cover lg:col-span-2"
          />
          <div className="flex lg:flex-col gap-4">
            {blog?.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i}`}
                className="rounded-2xl w-full h-28 object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {/* Meta */}
      {loading ? (
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{blog?.category}</Badge>
          <Badge variant="outline">{blog?.date}</Badge>
          <Badge variant="outline">{blog?.author}</Badge>
        </div>
      )}

      {/* Title & Content */}
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>
      ) : (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{blog?.title}</h1>
          {blog?.content.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      )}

      {/* Share */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Share:</span>
        <div className="flex gap-3">
          <Twitter className="w-5 h-5 cursor-pointer hover:text-primary" />
          <Facebook className="w-5 h-5 cursor-pointer hover:text-primary" />
          <Instagram className="w-5 h-5 cursor-pointer hover:text-primary" />
          <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary" />
        </div>
      </div>

      {/* Related Posts */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Related posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <RelatedCardSkeleton key={i} />
              ))
            : related.map((post) => (
                <RelatedCard key={post.id} post={post} />
              ))}
        </div>
      </div>
    </div>
  );
}
