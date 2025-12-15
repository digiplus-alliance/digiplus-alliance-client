import useSend from "@/lib/useSend";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";

// Define the response schema
const ReadNotificationResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

// Type definitions
export type ReadNotificationResponse = z.infer<typeof ReadNotificationResponseSchema>;

// Custom hook that takes the notification ID as parameter
export const useReadNotification = (id: string) => {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id || "guest";

  return useSend<void, ReadNotificationResponse>({
    url: `notifications/${id}/read`,
    method: "PATCH",
    hasAuth: true,
    schema: ReadNotificationResponseSchema,
    successMessage: "Notification marked as read",
    invalidateKeys: [["allNotifications", userId]],
  });
};
