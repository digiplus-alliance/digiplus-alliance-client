import useFetch from "@/lib/useFetch";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";

// Notification metadata schema
const NotificationMetadataSchema = z.object({
  assessment_id: z.string().optional(),
  score: z.number().optional(),
  action_url: z.string().optional(),
}).passthrough(); // Allow additional metadata fields

// Single notification schema
const NotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  type: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  is_read: z.boolean(),
  read_at: z.string().nullable().optional(),
  metadata: NotificationMetadataSchema.optional(),
  created_at: z.string(),
  created_date: z.string(),
  created_time: z.string(),
});

// Pagination schema
const PaginationSchema = z.object({
  current_page: z.number(),
  per_page: z.number(),
  total_items: z.number(),
  total_pages: z.number(),
  has_next_page: z.boolean(),
  has_previous_page: z.boolean(),
});

// Response data schema
const NotificationsDataSchema = z.object({
  notifications: z.array(NotificationSchema),
  pagination: PaginationSchema,
  unread_count: z.number(),
});

// Full response schema - make fields optional to handle both wrapped and direct responses
const NotificationsResponseSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  data: NotificationsDataSchema.optional(),
  // Also support direct response (data fields at root level)
  notifications: z.array(NotificationSchema).optional(),
  pagination: PaginationSchema.optional(),
  unread_count: z.number().optional(),
}).transform((data) => {
  // If data is wrapped in a data field, return it
  if (data.data) {
    return data.data;
  }
  // If data is at root level, return it as NotificationsData
  if (data.notifications) {
    return {
      notifications: data.notifications,
      pagination: data.pagination!,
      unread_count: data.unread_count!,
    };
  }
  // Fallback to empty state
  return {
    notifications: [],
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0,
      has_next_page: false,
      has_previous_page: false,
    },
    unread_count: 0,
  };
});

// Type exports
export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationMetadata = z.infer<typeof NotificationMetadataSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type NotificationsData = z.infer<typeof NotificationsDataSchema>;
export type NotificationsResponse = z.infer<typeof NotificationsResponseSchema>;

export const useGetNotifications = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id || "guest";

  return useFetch<NotificationsResponse>({
    url: "notifications",
    hasAuth: true,
    schema: NotificationsResponseSchema,
    errorMessage: "Failed to fetch notifications.",
    successMessage: "Notifications loaded.",
    showErrorMessage: true,
    showSuccessMessage: false,
    queryKey: ["allNotifications", userId],
  });
};
