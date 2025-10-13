import useSend from "@/lib/useSend";
import { z } from "zod";

// Define the request payload schema
const updateApplicationStatusPayloadSchema = z.object({
  status: z.string(),
});

// Define the response data schema
const updateApplicationStatusResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  serviceType: z.string(),
  status: z.string(),
  payment_status: z.string(),
  timestamp: z.string(),
});

// Type definitions
export type UpdateApplicationStatusPayload = z.infer<typeof updateApplicationStatusPayloadSchema>;
export type UpdateApplicationStatusResponse = z.infer<typeof updateApplicationStatusResponseSchema>;

// Custom hook that takes the application ID as parameter
export const useUpdateApplicationStatus = (id: string) => {
  return useSend<UpdateApplicationStatusPayload, UpdateApplicationStatusResponse>({
    url: `admin/applications/status/${id}`,
    method: "PATCH",
    hasAuth: true,
    schema: updateApplicationStatusResponseSchema,
    successMessage: "Application status updated successfully",
    invalidateKeys: ["applicationList"],
  });
};
