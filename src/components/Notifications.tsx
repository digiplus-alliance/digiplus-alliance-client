"use client";

import { CiBellOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { TbSend } from "react-icons/tb";

import SpinnerIcon from "@/components/icons/spinner";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuClose,
} from "./ui/dropdown-menu";

export default function Notifications() {
  const [notifications] = useState<
    { id: number; title: string; description: string; date: string; time: string; section: string; type: "form" | "application" }[]
  >([
    {
      id: 1,
      title: "Innkeeper submitted assessment form",
      description: "Lorem Ipsum",
      date: "Today",
      time: "5.00 pm",
      section: "Today",
      type: "form",
    },
    {
      id: 2,
      title: "Mamaplus Submitted an application form",
      description: "Lorem Ipsum",
      date: "Today",
      time: "11.20 am",
      section: "Today",
      type: "application",
    },
    {
      id: 3,
      title: "Title",
      description: "desc",
      date: "Mon, 12 June",
      time: "",
      section: "Yesterday",
      type: "form",
    },
    {
      id: 4,
      title: "Title",
      description: "desc",
      date: "Mon, 11 June",
      time: "",
      section: "This Week",
      type: "application",
    },
  ]);

  const [isPending] = useState(false);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="group shrink-0 font-secondary lg:bg-[#EBFBFF] w-fit p-1 size-8 rounded-full md:bg-[#EBFBFF] relative">
        <CiBellOn className="text-[#1E293B] size-full" />
        {notifications?.length > 0 && (
          <span className="inline-block size-1.5 absolute right-2 top-1 rounded-full bg-[#EB7A21]" />
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
          {isPending ? (
            <div className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-4 min-h-[100px]">
              <SpinnerIcon color="#008080" /> Loading notifications
            </div>
          ) : notifications.length ? (
            <div className="divide-y">
              {["Today", "Yesterday", "This Week"].map((section) => {
                const sectionItems = notifications.filter((n) => n.section === section);
                if (!sectionItems.length) return null;

                return (
                  <div key={section} className="py-2 px-4">
                    <p className="text-sm text-gray-400 mb-3">{section}</p>
                    <div className="space-y-3">
                      {sectionItems.map((n) => (
                        <DropdownMenuItem
                          key={n.id}
                          className={`flex items-start gap-3 rounded-lg p-3 ${
                            n.section === "Today" && n.id === 1
                              ? "bg-[#EBFBFF]"
                              : ""
                          }`}
                        >
                          <span className="mt-1">
                            {n.type === "form" ? (
                              <LuCalendarDays className="text-gray-500" />
                            ) : (
                              <TbSend className="text-gray-500" />
                            )}
                          </span>
                          <div className="flex flex-col grow">
                            <div className="flex items-center justify-between">
                              <h3
                                className={`text-sm ${
                                  n.id === 1 && n.section === "Today"
                                    ? "font-semibold text-black"
                                    : "font-medium text-gray-700"
                                }`}
                              >
                                {n.title}
                              </h3>
                              {n.time && (
                                <span className="text-xs text-gray-500">{n.time}</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{n.description}</p>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm py-6">
              No notifications yet
            </p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
