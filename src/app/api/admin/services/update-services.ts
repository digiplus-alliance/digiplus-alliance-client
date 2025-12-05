import useSend from "@/lib/useSend";
import { z } from "zod";

// Define the request payload schema (without ID since it goes in URL)
const updateServicePayloadSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  service_type: z.string().min(1, "Service type is required"),
  short_description: z.string().min(1, "Short description is required"),
  long_description: z.string().min(1, "Long description is required"),
  price: z.number().positive("Price must be a positive number"),
  discounted_price: z.number().positive().optional(),
  pricing_unit: z.string().min(1, "Pricing unit is required"),
  images: z.array(z.instanceof(File)).optional(),
});

// Define the response data schema
const updateServiceResponseSchema = z.object({
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
export type UpdateServicePayload = z.infer<typeof updateServicePayloadSchema>;
export type UpdateServiceResponse = z.infer<typeof updateServiceResponseSchema>;

// Custom hook that takes the service ID as parameter
export const useUpdateService = (serviceId: string) => {
  return useSend<UpdateServicePayload, UpdateServiceResponse>({
    url: `services/${serviceId}/with-images`,
    method: "PATCH",
    hasAuth: true,
    schema: updateServiceResponseSchema,
    successMessage: "Service updated successfully",
    invalidateKeys: ["services", `services/${serviceId}`, "all-services", `service-by-${serviceId}`],
  });
};
