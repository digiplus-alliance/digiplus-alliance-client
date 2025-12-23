import useSend from "@/lib/useSend";
import { z } from "zod";

// Define the request payload schema
const createServicePayloadSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  service_type: z.string().min(1, "Service type is required"),
  short_description: z.string().min(1, "Short description is required"),
  long_description: z.string().min(1, "Long description is required"),
  price: z.number().min(0, "Price must be zero or a positive number"), // Changed this
  discounted_price: z.number().positive().optional(),
  pricing_unit: z.string().min(1, "Pricing unit is required"),
  images: z.array(z.instanceof(File)).optional(),
});

// Define the response data schema
const createServiceResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  service_type: z.string(),
  image: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  formatted_price: z.string(),
  discounted_price: z.number().optional(),
  formatted_discounted_price: z.string().optional(),
  pricing_unit: z.string(),
  short_description: z.string(),
  long_description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Type definitions
export type CreateServicePayload = z.infer<typeof createServicePayloadSchema>;
export type CreateServiceResponse = z.infer<typeof createServiceResponseSchema>;

// Custom hook
export const useCreateService = () => {
  return useSend<CreateServicePayload, CreateServiceResponse>({
    url: "services/with-images",
    method: "post",
    hasAuth: true,
    schema: createServiceResponseSchema,
    successMessage: "Service created successfully",
    invalidateKeys: ["services", "all-services"],
  });
};
