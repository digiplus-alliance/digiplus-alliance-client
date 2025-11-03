"use client";

import { CiBellOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { TbSend } from "react-icons/tb";
import { AlertCircle } from "lucide-react";

import SpinnerIcon from "@/components/icons/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuClose,
} from "./ui/dropdown-menu";
import { useGetNotifications } from "@/app/api/admin/notifications/get-notifications";
import { Button } from "./ui/button";

interface NotificationsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Notifications({
  open,
  onOpenChange,
}: NotificationsProps) {
  const { data, error, isPending, refetch } = useGetNotifications();

  const notifications = data?.data?.notifications || [];
  const unreadCount = data?.data?.unread_count || 0;
  const isLoading = Boolean(isPending);

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal={false}>
      <DropdownMenuTrigger className="group shrink-0 font-secondary lg:bg-[#EBFBFF] w-fit p-1 size-8 rounded-full md:bg-[#EBFBFF] relative">
        <CiBellOn className="text-[#1E293B] size-full" />
        {unreadCount > 0 && (
          <span className="inline-flex items-center justify-center size-4 absolute -right-1 -top-1 rounded-full bg-[#EB7A21] text-white text-[10px] font-semibold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border border-[#D9D9D9] md:absolute md:-right-[16rem] md:-top-16 font-secondary bg-white w-[90vw] max-w-[400px] rounded-none">
        {/* Header */}
        <div className="flex items-center justify-between relative">
          <h2 className="text-xl text-[#667085] font-normal font-primary py-3 px-4">
            Notification
          </h2>
          <DropdownMenuClose>
            <button className="text-[#6E6D6D] size-4 absolute right-4 top-4 cursor-pointer">
              <IoClose aria-hidden />
            </button>
          </DropdownMenuClose>
        </div>
        <DropdownMenuSeparator className="mx-4" />

        {/* Content */}
        <div className="overflow-y-auto grow max-h-[350px]">
          {(() => {
            // Loading State
            if (isLoading) {
              return (
                <div className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-4 min-h-[100px]">
                  <SpinnerIcon className="text-[#008080]" />
                  <span>Loading notifications</span>
                </div>
              );
            }

            // Error State
            if (error) {
              return (
                <div className="flex flex-col items-center justify-center gap-4 py-8 px-4">
                  <AlertCircle className="h-12 w-12 text-red-500" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Failed to load notifications
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {error instanceof Error
                        ? error.message
                        : "Something went wrong"}
                    </p>
                    <Button
                      onClick={() => refetch()}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              );
            }

            // Empty State
            if (notifications.length === 0) {
              return (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <CiBellOn className="h-16 w-16 text-gray-300 mb-3" />
                  <p className="text-center text-gray-500 text-sm font-medium mb-1">
                    No notifications yet
                  </p>
                  <p className="text-center text-gray-400 text-xs">
                    We'll notify you when something new arrives
                  </p>
                </div>
              );
            }

            // Notifications List
            return (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex items-start gap-3 rounded-none p-4 cursor-pointer ${
                      !notification.is_read ? "bg-[#EBFBFF]" : ""
                    }`}
                  >
                    <span className="mt-1">
                      {notification.type === "assessment_completed" ? (
                        <LuCalendarDays className="text-gray-500 h-5 w-5" />
                      ) : (
                        <TbSend className="text-gray-500 h-5 w-5" />
                      )}
                    </span>
                    <div className="flex flex-col grow min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3
                          className={`text-sm leading-tight ${
                            !notification.is_read
                              ? "font-semibold text-black"
                              : "font-medium text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                          {notification.created_time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400">
                        {notification.created_date}
                      </p>
                      {!notification.is_read && (
                        <span className="inline-block w-2 h-2 rounded-full bg-[#227C9D] mt-2" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            );
          })()}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
