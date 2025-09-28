import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export type RelatedPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
};

export default function RelatedCard({ post }: { post: RelatedPost }) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-40 object-cover"
      />
      <CardContent className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          {post.date} • {post.category} • {post.readTime}
        </p>
        <h3 className="font-semibold line-clamp-2">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
      </CardContent>
    </Card>
  );
}

export function RelatedCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <Skeleton className="w-full h-40" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}
