"use client";

import { useAuthStore } from "@/store/auth";
import { Mail, Phone, Globe } from "lucide-react";
import Image from "next/image";

export default function ProfileModal() {
  const { user } = useAuthStore();

  // Generate initials from user name
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U";
    const first = firstName?.charAt(0)?.toUpperCase() || "";
    const last = lastName?.charAt(0)?.toUpperCase() || "";
    return (first + last).slice(0, 2);
  };

  return (
    <div className="max-w-xs w-[25rem] rounded-2xl bg-white items-center p-6">
      {user && (
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#227C9D] to-[#1a5f7a]">
            {user?.profile_picture ? (
              <Image
                src={user.profile_picture}
                alt={user?.first_name + " " + user?.last_name || "User Avatar"}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-xl">
                {getInitials(user?.first_name, user?.last_name)}
              </span>
            )}
          </div>

          {/* Name + Role */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {user?.first_name + " " + user?.last_name}
            </h2>
            <p className="text-sm text-gray-500">
              {user?.role}, {user?.business_name}
            </p>
          </div>

          {/* Status */}
          <span className="px-6 py-1 w-[15rem] rounded-full text-xs font-medium bg-[#EBFFFC] text-[#076C61]">
            {user?.last_login?.slice(0, 25) || "N/A"}
          </span>

          <hr className="w-full border-gray-200" />

          {/* Contact Info */}
          <div className="space-y-3 w-full text-left">
            <div className="flex items-center space-x-2 text-gray-700">
              <Mail size={16} color="#D6D4D4" />
              <span className="text-sm text-[#171616]">{user.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Phone size={16} color="#D6D4D4" />
              <span className="text-sm text-[#171616]">
                {user?.phone_number || "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Globe size={16} color="#D6D4D4" />
              <span className="text-sm text-[#171616]">
                {user?.website || "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
