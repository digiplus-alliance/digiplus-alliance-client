import useSend from "@/lib/useSend";

export const useCreateApplication = () => {
  return useSend({
    url: "admin/applications",
    method: "post",
    hasAuth: true,
    successMessage: "Application created successfully",
  });
};
