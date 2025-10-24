import { ChevronDown, LogOut } from 'react-feather';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLogout } from '@/lib/logout';
import { useAuthStore } from '@/store/auth';
import { useGetBusinessProfile } from '@/app/api/profile';

export default function ProfileMenu({ className }: { className?: string }) {
  const { mutate: logoutMutate } = useLogout();
  const { user } = useAuthStore();
  const { data: businessProfile } = useGetBusinessProfile();

  const handleLogout = () => {
    logoutMutate();
  };

  const userName = user?.first_name + ' ' + user?.last_name || businessProfile?.business_name;
  const role = user?.role;

  const avatarUrl = '',
    name = 'EN';

  const getInitials = (name?: string) => {
    if (!name) return '';
    return name.slice(0, 1);
  };

  const getRole = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'business_owner':
        return 'Business Owner';
      default:
        return 'User';
    }
  };

  const initials = getInitials(user?.first_name + ' ' + user?.last_name || businessProfile?.business_name);
  return (
    <div className={cn('flex relative items-center', className)}>
      <Avatar className="flex">
        <AvatarImage src={user?.profile_picture || businessProfile?.logo_url || avatarUrl} alt={name} />
        <AvatarFallback className="text-[#176E8E] bg-[#EBFBFF] text-base font-normal font-inter ">
          {initials}
        </AvatarFallback>
      </Avatar>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="group shrink-0 font-secondary ">
          <>
            <span className="px-2 py-2 flex text-xs items-center gap-4 justify-between">
              <span className="flex flex-col text-start max-sm:hidden">
                <span className="text-sm text-[#171616] font-inter">{userName}</span>
              </span>
              <ChevronDown className="text-black size-4 shrink-0 group-data-[state=open]:rotate-180 transition-transform ease-in" />
            </span>
          </>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border border-[#D9D9D9] rounded-2xl p-6 font-secondary bg-white w-64">
          <div className="flex flex-col gap-2 items-center pb-3">
            <Avatar className="hidden lg:flex">
              <AvatarImage src={user?.profile_picture || businessProfile?.logo_url || avatarUrl} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-sm">{userName}</span>
              <span className="text-xs text-[#6E6D6D]">{getRole(role)}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Button
                type="button"
                className="w-full gap-4 justify-start px-0"
                variant="ghost"
                onClick={() => handleLogout()}
              >
                <LogOut className="!size-5 text-[#6E6D6D]" />
                <span>Logout</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
