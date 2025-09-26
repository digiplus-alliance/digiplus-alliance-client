"use client";

import { ArrowRight } from "lucide-react";
import PasswordChange from "./widgets/reset-password";
import { useState } from "react";

export const Setting = ({
  toggleComponent,
}: {
  toggleComponent: (component: "profile" | "edit") => void;
}) => {
  return (
    <div className="p-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl h-full">
      {/* Header */}
      <div className="flex items-start md:items-center md:justify-between">
        <h1 className="text-2xl text-primary font-bold">Settings</h1>
      </div>

      <div
        className="mt-10 p-6 flex items-center cursor-pointer"
        onClick={() => toggleComponent("edit")}
      >
        <div className="">
          <h3 className="text-lg font-semibold">Reset Password</h3>
          <p className="text-sm text-gray-500">
            Reset your password here and secure your account
          </p>
        </div>
        <ArrowRight className="mt-4 text-gray-400 ml-10" />
      </div>
    </div>
  );
};

export default function Settings() {
  const [activeComponent, setActiveComponent] = useState<"profile" | "edit">(
    "profile"
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <Setting toggleComponent={setActiveComponent} />;
      case "edit":
        return <PasswordChange className="max-w-lg"/>;
      default:
        return <Setting toggleComponent={setActiveComponent} />;
    }
  };

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl h-full">
      {renderComponent()}
    </div>
  );
}
