export type AdminUser = {
  userId: string;
  name: string;
  email: string;
  timestamp: string;
  business_name: string;
  applications_count: number;
  last_login: string;
  profile_picture: string;
  phone: string;
  website: string;
  role: string;
  assessments_count: number;
  created_at: string;
  updated_at: string;
};

export type UserRole = "admin" | "user" | "manager";

export type UserStatus = "active" | "inactive" | "pending";
