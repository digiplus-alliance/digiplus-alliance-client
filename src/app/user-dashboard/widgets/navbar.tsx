'use client';
import Notifications from '@/components/Notifications';
import ProfileMenu from '@/components/profile-menu';
import Searchbar from '@/components/Searchbar';
import React from 'react';

interface NavbarProps {
  notificationOpen?: boolean;
  setNotificationOpen?: (open: boolean) => void;
}

export default function Navbar({ notificationOpen, setNotificationOpen }: NavbarProps) {
  return (
    <div className="w-full hidden md:flex items-center justify-between gap-2 sm:gap-4 p-2 sm:p-3 md:p-4">
      <div className="flex-1 md:block hidden max-w-2xs md:max-w-md lg:max-w-lg">
        <Searchbar />
      </div>
      <div className="flex items-center  space-x-2 sm:space-x-3 md:space-x-4">
        <Notifications
          open={notificationOpen}
          onOpenChange={setNotificationOpen}
        />
        <ProfileMenu />
      </div>
    </div>
  );
}
