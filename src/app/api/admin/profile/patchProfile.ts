import useSend from "@/lib/useSend";
import { z } from "zod";

const patchProfilePayloadSchema = z.object({
  email: z.string().email("Invalid email format"),
  phone_number: z.string().min(1, "Phone number is required"),
  website: z.string().url("Invalid website URL"),
});

const patchProfileResponseSchema = z.object({
  email: z.string(),
  phone_number: z.string(),
  website: z.string(),
  message: z.string(),
  success: z.boolean(),
});

// Type definitions
export type PatchProfilePayload = z.infer<typeof patchProfilePayloadSchema>;
export type PatchProfileResponse = z.infer<typeof patchProfileResponseSchema>;

// Custom hook
export const usePatchProfile = () => {
  return useSend<PatchProfilePayload, PatchProfileResponse>({
    url: "/admin/profile",
    method: "patch",
    hasAuth: true,
    schema: patchProfileResponseSchema,
    successMessage: "Profile updated successfully",
  });
};
