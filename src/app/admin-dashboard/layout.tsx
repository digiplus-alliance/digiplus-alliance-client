'use client';

import SidebarLayout from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import Image from 'next/image';
import Navbar from './widgets/navbar';

const items = [
  {
    title: 'Dashboard',
    url: 'home',
    icon: Home,
    iconLogo: '/icons/sidebar-icon-one.svg',
  },
  {
    title: 'Users',
    url: 'users',
    icon: Inbox,
    iconLogo: '/icons/sidebar-icon-two.svg',
  },
  {
    title: 'Assessment',
    url: 'assessment',
    icon: Calendar,
    iconLogo: '/icons/sidebar-icon-two.svg',
  },
  {
    title: 'Applications',
    url: 'applications',
    icon: Search,
    iconLogo: '/icons/sidebar-icon-two.svg',
  },
  {
    title: 'Trainings',
    url: 'trainings',
    icon: Settings,
    iconLogo: '/icons/sidebar-icon-two.svg',
  },
  {
    title: 'Blog',
    url: 'blog',
    icon: Settings,
    iconLogo: '/icons/sidebar-icon-two.svg',
  },
];

const personalizationItems = [
  {
    title: 'Notifications',
    url: 'notifications',
    icon: Settings,
    iconLogo: '/icons/sidebar-icon-three.svg',
  },
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
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider defaultOpen className="relative _max-w-[1392px] mx-auto">
        <SidebarInset className="fixed top-0 left-0 w-full h-16 bg-background border-b z-10 md:hidden">
          <div className="flex items-center justify-between px-4 h-full">
            <Image src="/mobile-logo.png" alt="App Logo" width={80} height={80} />
            <SidebarTrigger className=" top-4 left-4 z-20" />
          </div>
        </SidebarInset>

        <SidebarLayout
          navItems={items}
          personalizationItems={personalizationItems}
          basePath="/corporate-dashboard"
          logoHref="/corporate-dashboard/home"
          showProfileMenu
        />
        <SidebarInset className="overflow-hidden min-w-0 bg-white p-4 md:space-y-10 grow flex flex-col">
          <main className="flex flex-col mt-16 md:mt-0  h-[calc(100vh-4rem)] md:h-[calc(100vh-2.5rem)] overflow-auto max-w-7xl w-full">
            <Navbar />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
