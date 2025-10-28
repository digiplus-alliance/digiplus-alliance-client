import useSend from "@/lib/useSend";
import { z } from "zod";

// Define the deleted items schema
const DeletedItemsSchema = z.object({
  questions: z.number(),
  modules: z.number(),
  recommendations: z.number(),
});

// Define the response data schema
const DeleteApplicationResponseSchema = z.array(
  z.object({
    deleted_application_id: z.string(),
    deleted_application_title: z.string(),
    deleted_items: DeletedItemsSchema,
  })
);

// Type definitions
export type DeletedItems = z.infer<typeof DeletedItemsSchema>;
export type DeleteApplicationResponse = z.infer<
  typeof DeleteApplicationResponseSchema
>;

// Custom hook that takes the application ID as parameter
export const useDeleteApplication = (id: string) => {
  return useSend<void, DeleteApplicationResponse>({
    url: `admin/applications/${id}`,
    method: "delete",
    hasAuth: true,
    schema: DeleteApplicationResponseSchema,
    successMessage: "Application deleted successfully",
    invalidateKeys: ["allApplications", "allApplicationForms"],
  });
};
