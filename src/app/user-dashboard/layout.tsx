"use client";

import { useState } from "react";
import { AuthGuard } from '@/components/AuthGuard';
import UserSidebar from './widgets/sidebar';
import Navbar from './widgets/navbar';

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleNotificationClick = () => {
    console.log("Notification clicked from sidebar!");
    setNotificationOpen(true);
  };

  return (
    <AuthGuard allowedRoles={['business_owner', 'user']}>
      <div className="relative w-full min-h-screen">
        <UserSidebar onNotificationClick={handleNotificationClick}>
          <Navbar
            notificationOpen={notificationOpen}
            setNotificationOpen={setNotificationOpen}
          />
          <main className="flex flex-col bg-[#EBEBEB] rounded-tl-[20px] sm:rounded-tl-[40px] p-3 sm:p-4 md:p-6 w-full min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-2rem)]">
            {children}
          </main>
        </UserSidebar>
      </div>
    </AuthGuard>
  );
}
