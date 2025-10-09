"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";

export const UserSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
  business_name: z.string().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  profile_picture: z.string().nullable().optional(),
  is_verified: z.boolean(),
  locked_until: z.string().nullable().optional(),
  is_in_recovery: z.boolean().optional(),
  is_verified_for_recovery: z.boolean().optional(),
  login_attempts: z.number().optional(),
  is_active: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number().optional(),
  applications_count: z.number().optional(),
  assessments_count: z.number().optional(),
});

export const AllUsersResponseSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;
export type AllUsersResponse = z.infer<typeof AllUsersResponseSchema>;

export function useGetAllUsers() {
  return useFetch<AllUsersResponse>({
    url: "admin/users",
    hasAuth: true,
    schema: AllUsersResponseSchema,
  });
}
