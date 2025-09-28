import useSend from "@/lib/useSend";
import { z } from "zod";

// Define the request payload schema (without ID since it goes in URL)
const updateServicePayloadSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  service_type: z.string().min(1, "Service type is required"),
  image: z.string().url("Invalid image URL"),
  price: z.number().positive("Price must be a positive number"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
});

// Define the response data schema
const updateServiceResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  service_type: z.string(),
  image: z.string(),
  price: z.number(),
  subtitle: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Type definitions
export type UpdateServicePayload = z.infer<typeof updateServicePayloadSchema>;
export type UpdateServiceResponse = z.infer<typeof updateServiceResponseSchema>;

// Custom hook that takes the service ID as parameter
export const useUpdateService = (serviceId: string) => {
  return useSend<UpdateServicePayload, UpdateServiceResponse>({
    url: `services/${serviceId}`,
    method: "PATCH",
    hasAuth: true,
    schema: updateServiceResponseSchema,
    successMessage: "Service updated successfully",
  });
};
