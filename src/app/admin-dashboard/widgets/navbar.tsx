import Notifications from "@/components/Notifications";
import ProfileMenu from "@/components/profile-menu";
import Searchbar from "@/components/Searchbar";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="w-full flex items-center justify-between gap-4 p-2">
      <Searchbar />
      <div className="flex items-center space-x-10">
        <Notifications />
        <ProfileMenu />
      </div>
    </div>
  );
}
