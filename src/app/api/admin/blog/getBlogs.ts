import useFetch from "@/lib/useFetch";
import z from "zod";

export const BlogPostSchema = z.object({
  _id: z.string().optional(),
  email: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
  phone_number: z.string().optional(),
  website: z.string().optional(),
  title: z.string().optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

export const useGetBlogPosts = () =>
  useFetch<BlogPost[]>({
    url: "blogs",
    schema: z.union([
      z.object({
        message: z.string(),
        data: z.array(BlogPostSchema),
        success: z.boolean(),
      })
    ]),
    hasAuth: true,
    errorMessage: "Failed to fetch blog posts.",
    successMessage: "Blog posts loaded.",
    showErrorMessage: true,
    showSuccessMessage: false,
  });
