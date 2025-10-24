import useSend from "@/lib/useSend";

export const useUpdateAssessment = (id: string) => {
  return useSend({
    url: `api/assessments/${id}`,
    method: "PATCH",
    hasAuth: true,
    successMessage: "Assessment updated successfully",
    invalidateKeys: ["assessmentList", "allAssessmentForms", `assessment-${id}`, "allAssessments"],
  });
};
