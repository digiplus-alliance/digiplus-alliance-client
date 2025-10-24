import useSend from "@/lib/useSend";

export const useCreateAssessment = () => {
  return useSend({
    url: "api/assessments",
    method: "post",
    hasAuth: true,
    successMessage: "Assessment created successfully",
  });
};
