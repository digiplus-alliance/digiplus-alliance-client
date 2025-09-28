'use client';
import Notifications from '@/components/Notifications';
import ProfileMenu from '@/components/profile-menu';
import Searchbar from '@/components/Searchbar';
import React from 'react';

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between gap-4 p-2">
      <Searchbar />
      <div className="flex items-center space-x-4">
        <Notifications />
        <ProfileMenu />
      </div>
    </div>
  );
}
