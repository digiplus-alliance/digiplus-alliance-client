"use client";

import { useGetAdminProfile } from "@/app/api/admin/profile/getProfile";
import { Mail, Phone, Globe } from "lucide-react";
import Image from "next/image";

const user = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  website: "www.johndoe.com",
  avatar: "/about/team-placeholder-four.png",
  role: "Admin",
  business: "Example Corp",
};

export default function ProfileModal() {
  // const  { isLoading, isError, data } = useGetAdminProfile();

  // console.log("Profile data:", data);


  return (
    <div className="max-w-xs w-[25rem] rounded-2xl bg-white items-center p-6">
      {user && (
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={user.avatar || "/about/team-placeholder-four.png"}
              alt={user.name}
              width={80}
              height={80}
            />
          </div>

          {/* Name + Role */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">
              {user.role}, {user.business}
            </p>
          </div>

          {/* Status */}
          <span className="px-6 py-1 w-[15rem] rounded-full text-xs font-medium bg-[#EBFFFC] text-[#076C61]">
            Online
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
              <span className="text-sm text-[#171616]">{user.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Globe size={16} color="#D6D4D4" />
              <span className="text-sm text-[#171616]">{user.website}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
