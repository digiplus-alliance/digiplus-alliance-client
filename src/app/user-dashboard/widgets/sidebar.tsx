'use client';
import React from 'react';
import SidebarLayout from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
    iconLogo: '/icons/sidebar-icon-one.svg',
  },
  {
    title: 'Applications',
    url: 'applications',
    icon: Inbox,
    iconLogo: '/icons/sidebar-icon-two.svg',
  },
  {
    title: 'Services',
    url: 'services',
    icon: Settings,
    iconLogo: '/icons/sidebar-icon-two.svg',
  },
  {
    title: 'Assessment',
    url: 'assessment',
    icon: Calendar,
    iconLogo: '/icons/sidebar-icon-two.svg',
  },
  {
    title: 'Assessment Grades',
    url: 'assessment-grades',
    icon: Search,
    iconLogo: '/icons/sidebar-icon-two.svg',
  },
];

const personalizationItems = [
  {
    title: 'Profile',
    url: 'profile',
    icon: Settings,
    iconLogo: '/icons/sidebar-icon-three.svg',
  },
  {
    title: 'Settings',
    url: 'settings',
    icon: Settings,
    iconLogo: '/icons/sidebar-icon-four.svg',
  },
  {
    title: 'Notifications',
    url: 'notifications',
    icon: Settings,
    iconLogo: '/icons/sidebar-icon-three.svg',
  },
];
const UserSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen className="relative _max-w-[1392px] mx-auto">
      <SidebarInset className="fixed top-0 left-0 w-full h-16 bg-white border-b z-10 md:hidden">
        <div className="flex items-center justify-between px-4 h-full">
          <Image src="/mobile-logo.png" alt="App Logo" width={80} height={80} />
          <SidebarTrigger className=" top-4 left-4 z-20" />
        </div>
      </SidebarInset>

      <SidebarLayout
        navItems={items}
        personalizationItems={personalizationItems}
        basePath="/user-dashboard"
        logoHref="/user-dashboard/home"
        showProfileMenu
        className="bg-white"
      />
      <SidebarInset className="overflow-hidden min-w-0 bg-white md:space-y-10 grow flex flex-col">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default UserSidebar;
