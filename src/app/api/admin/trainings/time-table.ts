import useSend from "@/lib/useSend";
import * as z from "zod";

// Define the request payload schema
export const SendTimetablePayloadSchema = z.object({
  start_date: z.string(), 
  end_date: z.string(),  
  file: z.instanceof(File).optional(),
  timetable_url: z.string().optional(),
});

export type SendTimetablePayload = z.infer<typeof SendTimetablePayloadSchema>;

export const useSendTimetable = (trainingName: string) => {
  const encodedTrainingName = encodeURIComponent(trainingName);
  return useSend<SendTimetablePayload, { success: boolean }>({
    url: `admin/applications/trainings/details?trainingName=${encodedTrainingName}`,
    method: "PATCH",
    hasAuth: true,
    successMessage: "Timetable sent to participants successfully",
  });
};
