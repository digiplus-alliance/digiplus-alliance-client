"use client";
import { useState } from "react";
import CreateService from "./widgets/create-services";
import AllServices from "./widgets/all-services";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const [activeComponent, setActiveComponent] = useState<"create" | "all">(
    "create"
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case "create":
        return <CreateService />;
      case "all":
        return <AllServices />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-4 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      <div>
        <h1 className="text-2xl text-primary font-bold">
          {activeComponent === "create" ? "Create Service" : "All Services"}
        </h1>
      </div>
      <div className="flex gap-4 my-2">
        <Button
          variant="ghost"
          className={`text-[#227C9D] ${
            activeComponent === "create"
              ? "bg-white rounded-t-lg rounded-b-none"
              : ""
          }`}
          onClick={() => setActiveComponent("create")}
        >
          Create Service
        </Button>
        <Button
          variant="ghost"
          className={`text-[#227C9D] ${
            activeComponent === "all"
              ? "bg-white rounded-t-lg rounded-b-none"
              : ""
          }`}
          onClick={() => setActiveComponent("all")}
        >
          All Services
        </Button>
      </div>
      {renderComponent()}
    </div>
  );
}
