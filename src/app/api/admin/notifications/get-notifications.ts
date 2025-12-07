import useFetch from "@/lib/useFetch";
import { z } from "zod";

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
  read_at: z.string().nullable(),
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

// Full response schema
const NotificationsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: NotificationsDataSchema,
});

// Type exports
export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationMetadata = z.infer<typeof NotificationMetadataSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type NotificationsData = z.infer<typeof NotificationsDataSchema>;
export type NotificationsResponse = z.infer<typeof NotificationsResponseSchema>;

export const useGetNotifications = () =>
  useFetch<NotificationsResponse>({
    url: "notifications",
    hasAuth: true,
    schema: NotificationsResponseSchema,
    errorMessage: "Failed to fetch notifications.",
    successMessage: "Notifications loaded.",
    showErrorMessage: true,
    showSuccessMessage: false,
  });
