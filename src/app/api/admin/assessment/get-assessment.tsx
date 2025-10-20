import useFetch from "@/lib/useFetch";

export const useGetAssessment = ({ id }: { id: string }) =>
  useFetch({
    url: `api/assessments/${id}`,
    hasAuth: true,
    errorMessage: "Failed to fetch assessment.",
    showErrorMessage: true,
    showSuccessMessage: false,
    queryKey: ["assessment", id],
  });
