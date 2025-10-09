"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";

export const ApplicationSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  image: z.string().optional(),
  service: z.string(),
  service_type: z.string(),
  status: z.string(),
  timestamp: z.string(),
  payment_status: z.string(),
});

export const AllApplicationsResponseSchema = z.array(ApplicationSchema);

export type Application = z.infer<typeof ApplicationSchema>;
export type AllApplicationsResponse = z.infer<typeof AllApplicationsResponseSchema>;

export function useGetAllApplications() {
  return useFetch<AllApplicationsResponse>({
    url: "admin/applications/list",
    hasAuth: true,
    schema: AllApplicationsResponseSchema,
  });
}
