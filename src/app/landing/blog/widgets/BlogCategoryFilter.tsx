import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { allPosts } from "../data/blog-data";

interface BlogCategoryFilterProps {
  currentCategory?: string;
}

export function BlogCategoryFilter({ currentCategory }: BlogCategoryFilterProps) {
  // Get unique categories from all posts
  const categories = Array.from(new Set(allPosts.map(post => post.category)));
  
  // Count posts per category
  const getCategoryCount = (category: string) => 
    allPosts.filter(post => post.category === category).length;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link href="/landing/blog">
        <Badge 
          variant={!currentCategory ? "default" : "outline"}
          className="hover:bg-gray-100 cursor-pointer"
        >
          All ({allPosts.length})
        </Badge>
      </Link>
      {categories.map((category) => (
        <Link key={category} href={`/landing/blog?category=${category.toLowerCase()}`}>
          <Badge 
            variant={currentCategory === category.toLowerCase() ? "default" : "outline"}
            className="hover:bg-gray-100 cursor-pointer"
          >
            {category} ({getCategoryCount(category)})
          </Badge>
        </Link>
      ))}
    </div>
  );
}
