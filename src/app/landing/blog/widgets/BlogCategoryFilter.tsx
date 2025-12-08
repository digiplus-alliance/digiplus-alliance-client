import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "../data/blog-data";

interface BlogCategoryFilterProps {
  currentCategory?: string;
  posts: BlogPost[];
}

export function BlogCategoryFilter({
  currentCategory,
  posts,
}: BlogCategoryFilterProps) {
  // Get unique tags from all posts (using tags as categories)
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).filter((tag) => tag.trim() !== ""); // Filter out empty tags

  // Count posts per category (tag)
  const getCategoryCount = (category: string) =>
    posts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
    ).length;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link href="/landing/blog">
        <Badge
          variant={!currentCategory ? "default" : "outline"}
          className="hover:bg-gray-100 cursor-pointer"
        >
          All ({posts.length})
        </Badge>
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/landing/blog?category=${category.toLowerCase()}`}
        >
          <Badge
            variant={
              currentCategory === category.toLowerCase() ? "default" : "outline"
            }
            className="hover:bg-gray-100 cursor-pointer"
          >
            {category} ({getCategoryCount(category)})
          </Badge>
        </Link>
      ))}
    </div>
  );
}
