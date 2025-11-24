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

export const useGetBlogPost = (id?: string | null) =>
  useFetch<BlogPost>({
    url: `blogs/${id}`,
    schema: BlogPostSchema,
    hasAuth: true,
    errorMessage: "Failed to fetch blog post.",
    successMessage: "Blog post loaded.",
    showErrorMessage: true,
    showSuccessMessage: false,
    queryKey: ["blogs", id ?? ""],
    enabled: !!id,
  });
