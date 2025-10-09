'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Icon } from 'react-feather';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useAuthStore } from '@/store/auth';

interface SidebarItem {
  title: string;
  url: string;
  icon: Icon;
  iconLogo?: string;
  onClick?: () => void;
}

interface SidebarLayoutProps extends React.ComponentProps<typeof Sidebar> {
  logoHref?: string;
  navItems: SidebarItem[];
  personalizationItems: SidebarItem[];
  basePath?: string;
  footer?: React.ReactNode;
  showProfileMenu?: boolean;
  profileMenu?: React.ReactNode;
}

export default function SidebarLayout({
  navItems,
  personalizationItems,
  logoHref = '/',
  basePath = '',
  footer,
  showProfileMenu = false,
  profileMenu,
  ...props
}: SidebarLayoutProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { openNotification, setOpenNotification } = useAuthStore();

  return (
    <Sidebar {...props} className="bg-white border-none">
      <SidebarHeader className="p-4 bg-white">
        <Link href={logoHref} className="w-28 lg:w-40">
          <Image src="/mobile-logo.png" alt="App Logo" width={200} height={200} />
        </Link>
      </SidebarHeader>

      <SidebarContent className="grow flex flex-col justify-between h-full px-2 bg-white">
        <SidebarGroup className="py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              <div>
                <h3 className="px-2 text-[#706C6C] font-bold text-sm mb-4">Applications</h3>
                {navItems.map((item) => {
                  const url = `${basePath}/${item.url}`;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
                        <Link
                          href={url}
                          className={cn(
                            'p-2 h-auto !rounded-4xl flex items-center gap-1 hover:bg-[#F1F8F8]',
                            pathname.startsWith(url) && 'bg-[#EBFBFF]'
                          )}
                        >
                          {item.iconLogo && (
                            <Image
                              src={item.iconLogo}
                              alt="Coming Soon"
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          )}
                          <span className="text-sm font-secondary text-[#706C6C]">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </div>
              <div>
                <h3 className="p-2 text-[#706C6C] font-bold text-sm mb-2">Personalization</h3>
                {personalizationItems.map((item) => {
                  const url = `${basePath}/${item.url}`;
                  return (
                    <SidebarMenuItem key={item.title}>
                      {item.onClick ? (
                        <SidebarMenuButton
                          onClick={() => {
                            if (item.onClick) {
                              item.onClick();
                            }
                            setOpenMobile(false);
                          }}
                        >
                          <div
                            className={cn(
                              'h-auto !rounded-4xl flex items-center gap-1 hover:bg-[#F1F8F8] cursor-pointer w-full',
                              pathname.startsWith(url) && 'bg-[#F1F8F8]'
                            )}
                          >
                            {item.iconLogo && (
                              <Image
                                src={item.iconLogo}
                                alt="Coming Soon"
                                width={20}
                                height={20}
                                className="object-contain"
                              />
                            )}
                            <span className="text-sm font-secondary text-[#706C6C]">{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
                          {item.title === 'Notifications' ? (
                            <Button
                              className={cn(
                                'p-2 h-auto !rounded-4xl flex items-center justify-start  font-normal gap-[7px] hover:bg-[#F1F8F8] border-none text-start bg-transparent shadow-none drop-shadow-none cursor-pointer',
                                openNotification && 'bg-[#F1F8F8]'
                              )}
                              onClick={() => setOpenNotification(!openNotification)}
                            >
                              {item.iconLogo && (
                                <Image
                                  src={item.iconLogo}
                                  alt="Coming Soon"
                                  width={20}
                                  height={20}
                                  className="object-contain"
                                />
                              )}
                              <span className="text-sm font-secondary text-[#706C6C]">{item.title}</span>
                            </Button>
                          ) : (
                            <Link
                              href={url}
                              className={cn(
                                'p-2 h-auto !rounded-4xl flex items-center gap-1 hover:bg-[#F1F8F8]',
                                pathname.startsWith(url) && 'bg-[#F1F8F8]'
                              )}
                            >
                              {item.iconLogo && (
                                <Image
                                  src={item.iconLogo}
                                  alt="Coming Soon"
                                  width={20}
                                  height={20}
                                  className="object-contain"
                                />
                              )}
                              <span className="text-sm font-secondary text-[#706C6C]">{item.title}</span>
                            </Link>
                          )}
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent className="space-y-6">
            {showProfileMenu && profileMenu}
            {footer}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
