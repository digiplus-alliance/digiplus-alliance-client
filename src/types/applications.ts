import { z } from 'zod';

// Application Submission Schema
export const ApplicationSubmissionSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  service: z.string(),
  service_type: z.string(),
  payment_amount: z.number(),
  status: z.enum(['Submitted', 'Being Processed', 'Approved', 'Rejected', 'Completed']),
  payment_status: z.enum(['Not Paid', 'Paid', 'Pending', 'Failed']),
  submission_time: z.string(),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
  timetable_url: z.string().nullable(),
  image: z.string().optional(),
});

// Application Submissions Response Schema
export const ApplicationSubmissionsResponseSchema = z.array(ApplicationSubmissionSchema);

// TypeScript Types
export type ApplicationSubmission = z.infer<typeof ApplicationSubmissionSchema>;
export type ApplicationSubmissionsResponse = z.infer<typeof ApplicationSubmissionsResponseSchema>;

// Status type for easier use
export type ApplicationStatus = ApplicationSubmission['status'];
export type PaymentStatus = ApplicationSubmission['payment_status'];
