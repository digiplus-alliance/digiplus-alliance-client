import useSend from "@/lib/useSend";
import { z } from "zod";


// Custom hook
export const useCreateApplication = () => {
  return useSend({
    url: "admin/applications",
    method: "post",
    hasAuth: true,
    successMessage: "Application created successfully",
  });
};
