import useSend from "@/lib/useSend";

export const useUpdateBlog = (id?: string | null) => {
  return useSend({
    url: `blogs/${id}`,
    method: "PATCH",
    hasAuth: true,
    successMessage: "Blog updated successfully",
    invalidateKeys: ["blogs"],
  });
};