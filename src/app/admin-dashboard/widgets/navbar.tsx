import Notifications from "@/components/Notifications";
import ProfileMenu from "@/components/profile-menu";
import Searchbar from "@/components/Searchbar";
import React from "react";

interface NavbarProps {
  notificationOpen?: boolean;
  setNotificationOpen?: (open: boolean) => void;
}

export default function Navbar({ notificationOpen, setNotificationOpen }: NavbarProps) {
  return (
    <div className="w-full flex items-center justify-between gap-4 p-2">
      <Searchbar />
      <div className="flex items-center space-x-4">
        <Notifications 
          open={notificationOpen}
          onOpenChange={setNotificationOpen}
        />
        <ProfileMenu />
      </div>
    </div>
  );
}
