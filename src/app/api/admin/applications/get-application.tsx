import useFetch from "@/lib/useFetch";

export const useGetApplication = ({ id }: { id: string }) =>
  useFetch({
    url: `admin/applications/${id}`,
    hasAuth: true,
    errorMessage: "Failed to fetch application.",
    showErrorMessage: true,
    showSuccessMessage: false,
    queryKey: ["application", id],
  });
