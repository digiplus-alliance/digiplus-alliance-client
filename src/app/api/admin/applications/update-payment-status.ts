import useSend from "@/lib/useSend";
import { z } from "zod";

// Define the request payload schema
const updatePaymentStatusPayloadSchema = z.object({
  paymentStatus: z.string(),
});

// Define the response data schema
const updatePaymentStatusResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  serviceType: z.string(),
  status: z.string(),
  payment_status: z.string(),
  timestamp: z.string(),
});

// Type definitions
export type UpdatePaymentStatusPayload = z.infer<typeof updatePaymentStatusPayloadSchema>;
export type UpdatePaymentStatusResponse = z.infer<typeof updatePaymentStatusResponseSchema>;

// Custom hook that takes the application ID as parameter
export const useUpdatePaymentStatus = (id: string) => {
  return useSend<UpdatePaymentStatusPayload, UpdatePaymentStatusResponse>({
    url: `admin/applications/payment-status/${id}`,
    method: "PATCH",
    hasAuth: true,
    schema: updatePaymentStatusResponseSchema,
    successMessage: "Payment status updated successfully",
    invalidateKeys: ["applicationList"],
  });
};
