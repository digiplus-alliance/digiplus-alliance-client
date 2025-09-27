import useSend from "@/lib/useSend";
import { z } from "zod";

const patchProfilePayloadSchema = z.object({
  email: z.string().email("Invalid email format"),
  phone_number: z.string().min(1, "Phone number is required"),
  website: z.string().url("Invalid website URL"),
});

const patchProfileResponseSchema = z.object({
  _id: z.string(),
  user_id: z.string(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
  phone_number: z.string().optional(),
  website: z.string().optional(),
});

// Type definitions
export type PatchProfilePayload = z.infer<typeof patchProfilePayloadSchema>;
export type PatchProfileResponse = z.infer<typeof patchProfileResponseSchema>;

// Custom hook
export const usePatchProfile = () => {
  return useSend<PatchProfilePayload, PatchProfileResponse>({
    url: "admin/profile",
    method: "PATCH",
    hasAuth: true,
    schema: patchProfileResponseSchema,
    successMessage: "Profile updated successfully",
  });
};
