"use client";

import { Button } from "@/components/ui/button";
import ProfileModal from "./widgets/profile-page";
import { useState } from "react";
import UpdateProfileForm from "./widgets/update-profile-form";

export const Profile = ({
  toggleComponent,
}: {
  toggleComponent: (component: "profile" | "edit") => void;
}) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">Profile</h1>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button onClick={() => toggleComponent("edit")}>Edit Profile</Button>
        </div>
      </div>
      <div className="overflow-x-auto flex justify-center mt-10">
        <ProfileModal />
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const [activeComponent, setActiveComponent] = useState<"profile" | "edit">(
    "profile"
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <Profile toggleComponent={setActiveComponent} />;
      case "edit":
        return <UpdateProfileForm />;
      default:
        return <Profile toggleComponent={setActiveComponent} />;
    }
  };

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl h-full">
      {renderComponent()}
    </div>
  );
}
