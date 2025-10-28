"use client";

import * as z from "zod";
import useFetch from "@/lib/useFetch";

export const TrainingApplicationSchema = z.object({
  application_id: z.string(),
  name: z.string(),
  email: z.string(),
  service_type: z.string(),
  service: z.string(),
  status: z.string(),
  submission_time: z.string(),
  payment_status: z.string(),
  payment_amount: z.number(),
  timetable_url: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
});

export const AllTrainingApplicationsResponseSchema = z.array(
  TrainingApplicationSchema
);

export type AllTrainingApplicationsResponse = z.infer<
  typeof AllTrainingApplicationsResponseSchema
>;

interface GetAllTrainingUsersParams {
  trainingName?: string;
}

export function useGetAllTrainingUsers(params?: GetAllTrainingUsersParams) {
  // Build query string from params
  let url = "admin/applications/trainings/participants";

  if (params?.trainingName) {
    const encodedTrainingName = encodeURIComponent(params.trainingName);
    url += `?trainingName=${encodedTrainingName}`;
  }

  return useFetch<AllTrainingApplicationsResponse>({
    url,
    hasAuth: true,
    schema: AllTrainingApplicationsResponseSchema,
  });
}
