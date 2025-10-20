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
export type AllApplicationsResponse = z.infer<
  typeof AllApplicationsResponseSchema
>;

interface UseGetAllApplicationsOptions {
  service_type?: string;
}

export function useGetAllApplications(options?: UseGetAllApplicationsOptions) {
  const queryString = options?.service_type
    ? `?service_type=${encodeURIComponent(options.service_type)}`
    : "";
  const url = `admin/applications/list${queryString}`;

  return useFetch<AllApplicationsResponse>({
    url,
    hasAuth: true,
    schema: AllApplicationsResponseSchema,
    queryKey: ["applicationList"],
  });
}
