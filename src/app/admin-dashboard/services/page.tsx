"use client";
import { useState } from "react";
import CreateService from "./widgets/create-services";
import AllServices from "./widgets/all-services";
import ServicesTableView from "./widgets/services-table-view";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const [activeComponent, setActiveComponent] = useState<"create" | "all">(
    "all"
  );
  const [viewMode, setViewMode] = useState<"board" | "table">("board");
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const handleEditService = (serviceId: string) => {
    setEditingServiceId(serviceId);
    setActiveComponent("create");
  };

  const handleBackToList = () => {
    setEditingServiceId(null);
    setActiveComponent("all");
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "create":
        return <CreateService serviceId={editingServiceId} onBack={handleBackToList} />;
      case "all":
        return viewMode === "board" ? (
          <AllServices onEdit={handleEditService} />
        ) : (
          <ServicesTableView onEdit={handleEditService} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-4 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      <div>
        <h1 className="text-2xl text-primary font-bold">
          {activeComponent === "create" 
            ? editingServiceId 
              ? "Edit Service" 
              : "Create Service" 
            : "All Services"}
        </h1>
      </div>
      <div className="flex flex-row justify-between items-center">
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
        {activeComponent === "all" && (
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "board" ? "default" : "ghost"}
              className={viewMode === "board" ? "bg-[#227C9D] text-white" : ""}
              onClick={() => setViewMode("board")}
            >
              Board
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              className={viewMode === "table" ? "bg-[#227C9D] text-white" : ""}
              onClick={() => setViewMode("table")}
            >
              Table
            </Button>
          </div>
        )}
      </div>
      {renderComponent()}
    </div>
  );
}
