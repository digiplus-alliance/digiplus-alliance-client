import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminUser } from "@/types/admin/user";
import { Mail, Phone, Globe } from "lucide-react";
import Image from "next/image";

type Props = {
  userInfoModalOpen: boolean;
  setUserInfoModalOpen: (open: boolean) => void;
  selectedUser?: AdminUser | null;
};

export default function UserInfoModal({
  userInfoModalOpen,
  setUserInfoModalOpen,
  selectedUser,
}: Props) {
  return (
    <Dialog open={userInfoModalOpen} onOpenChange={setUserInfoModalOpen}>
      <DialogContent className="max-w-xs w-[25rem] rounded-2xl bg-white fixed bottom-4 right-4 top-auto left-auto translate-x-0 translate-y-0 m-0">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#706C6C] font-normal">
            Profile
          </DialogTitle>
        </DialogHeader>

        {selectedUser && (
          <div className="flex flex-col items-center space-y-4 text-center">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
              {selectedUser.profile_picture ? (
                <Image
                  src={selectedUser.profile_picture}
                  alt={selectedUser.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#EBFBFF] flex items-center justify-center text-2xl font-semibold text-[#227C9D]">
                  {selectedUser.name
                    ? selectedUser.name
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()
                    : "NA"}
                </div>
              )}
            </div>

            {/* Name + Role */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedUser.name}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedUser.role}, {selectedUser.business_name}
              </p>
            </div>

            {/* Status */}
            <span className="px-6 py-1 w-[20rem] rounded-full text-xs font-medium bg-[#EBFFFC] text-[#076C61]">
              Last login: {selectedUser.last_login || "No recent login"}
            </span>

            <hr className="w-full border-gray-200" />

            {/* Contact Info */}
            <div className="space-y-3 w-full text-left">
              <div className="flex items-center space-x-2 text-gray-700">
                <Mail size={16} color="#D6D4D4" />
                <span className="text-sm text-[#171616]">
                  {selectedUser.email}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Phone size={16} color="#D6D4D4" />
                <span className="text-sm text-[#171616]">
                  {selectedUser.phone}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Globe size={16} color="#D6D4D4" />
                <span className="text-sm text-[#171616]">
                  {selectedUser.website}
                </span>
              </div>
            </div>

            <hr className="w-full border-gray-200" />

            {/* Status tags */}
            <div className="flex flex-col space-y-3 w-full">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-[#706C6C] text-start">Assessment</p>
                <div className="px-6 py-1 w-[15rem] rounded-full text-xs font-medium bg-[#EBFFFC] text-[#076C61] items-center flex justify-center">
                  {selectedUser.assessments_count}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-[#706C6C] text-start">
                  Applications
                </p>
                <div className="px-6 py-1 w-[15rem] rounded-full text-xs font-medium bg-[#EBFFFC] text-[#076C61] items-center flex justify-center">
                  {selectedUser.applications_count}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
