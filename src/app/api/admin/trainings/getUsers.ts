import useFetch from "@/lib/useFetch";

export function useGetAllTrainingUsers() {
  return useFetch({
    url: "admin/applications/trainings/participants",
    hasAuth: true,
  });
}
