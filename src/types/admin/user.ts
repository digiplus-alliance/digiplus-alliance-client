export type AdminUser = {
  userId: string;
  name: string;
  email: string;
  timestamp: string;
  business: string;
  applications: string;
  avatar: string;
  phone: string;
  website: string;
  role: string;
  assessment_status: "active" | "inactive" | "pending";
  created_at: string;
  updated_at: string;
};

export type UserRole = "admin" | "user" | "manager";

export type UserStatus = "active" | "inactive" | "pending";
