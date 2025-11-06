import useSend from "@/lib/useSend";
import { z } from "zod";

// Define the response data schema
const DeleteBlogResponseSchema = z.object({
  deleted_blog_id: z.string(),
  deleted_blog_title: z.string(),
});

// Type definition
export type DeleteBlogResponse = z.infer<typeof DeleteBlogResponseSchema>;

// Custom hook that takes the blog ID as parameter
export const useDeleteBlog = (id: string) => {
  return useSend<void, DeleteBlogResponse>({
    url: `blogs/${id}`,
    method: "delete",
    hasAuth: true,
    schema: DeleteBlogResponseSchema,
    successMessage: "Blog deleted successfully",
    invalidateKeys: ["blogs"],
  });
};
