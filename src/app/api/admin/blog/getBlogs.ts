import useFetch from "@/lib/useFetch";
import z from "zod";

export const BlogPostSchema = z.object({
  _id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  authorId: z.string(),
  isPublished: z.boolean(),
  featuredImageUrls: z.array(z.string()),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number().optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

export const useGetBlogPosts = () =>
  useFetch<BlogPost[]>({
    url: "blogs",
    schema: z.array(BlogPostSchema),
    hasAuth: false,
    errorMessage: "Failed to fetch blog posts.",
    successMessage: "Blog posts loaded.",
    showErrorMessage: true,
    showSuccessMessage: false,
    queryKey: ["blogs"],
  });
