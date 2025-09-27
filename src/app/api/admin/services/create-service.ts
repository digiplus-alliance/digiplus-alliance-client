import useSend from "@/lib/useSend";
import { z } from "zod";

// Define the request payload schema
const createServicePayloadSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  service_type: z.string().min(1, "Service type is required"),
  image: z.string().url("Invalid image URL"),
  price: z.number().positive("Price must be a positive number"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
});

// Define the response data schema
const createServiceResponseSchema = z.object({
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
export type CreateServicePayload = z.infer<typeof createServicePayloadSchema>;
export type CreateServiceResponse = z.infer<typeof createServiceResponseSchema>;

// Custom hook
export const useCreateService = () => {
  return useSend<CreateServicePayload, CreateServiceResponse>({
    url: "services",
    method: "post",
    hasAuth: true,
    schema: createServiceResponseSchema,
    successMessage: "Service created successfully",
  });
};
