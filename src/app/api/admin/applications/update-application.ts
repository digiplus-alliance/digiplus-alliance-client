import useSend from "@/lib/useSend";

export const useUpdateApplication = (id: string) => {
  return useSend({
    url: `admin/applications/${id}`,
    method: "PATCH",
    hasAuth: true,
    successMessage: "Application updated successfully",
    invalidateKeys: ["applicationList", "allApplicationForms", `application-${id}`],
  });
};
