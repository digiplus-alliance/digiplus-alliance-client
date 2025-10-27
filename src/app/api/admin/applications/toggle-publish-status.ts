import useSend from "@/lib/useSend";
import { z } from "zod";

// Define the request payload schema
const updatePublishStatusPayloadSchema = z.object({
  isLive: z.boolean(),
});

// Define the response data schema
const updatePublishStatusResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  isLive: z.boolean(),
  published_at: z.string().optional(),
});

// Type definitions
export type UpdatePublishStatusPayload = z.infer<
  typeof updatePublishStatusPayloadSchema
>;
export type UpdatePublishStatusResponse = z.infer<
  typeof updatePublishStatusResponseSchema
>;

// Custom hook that takes the Publish ID as parameter
export const useUpdatePublishStatus = (id: string) => {
  return useSend<UpdatePublishStatusPayload, UpdatePublishStatusResponse>({
    url: `admin/applications/publish/${id}`,
    method: "PATCH",
    hasAuth: true,
    schema: updatePublishStatusResponseSchema,
    successMessage: "Publish status updated successfully",
    invalidateKeys: ["allApplicationForms"],
  });
};
