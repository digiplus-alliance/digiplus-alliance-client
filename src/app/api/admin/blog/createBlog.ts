import useSend from "@/lib/useSend";

export const useCreateBlog = () => {
  return useSend({
    url: "blogs",
    method: "post",
    hasAuth: true,
    successMessage: "Blog created successfully",
    invalidateKeys: ["blogs"],
  });
};