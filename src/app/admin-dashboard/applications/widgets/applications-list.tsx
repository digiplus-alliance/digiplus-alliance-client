"use client";

import { useState } from "react";
import ListApplications from "./edit-application";
import EditApplication from "./edit";

export default function ApplicationsList() {
  const [activeScreen, setActiveScreen] = useState<"list" | "create" | "edit">(
    "list"
  );
  const [formId, setFormId] = useState<string>("");

  const handleEdit = (id: string) => {
    setFormId(id);
    setActiveScreen("edit");
  };

  const renderComponent = () => {
    switch (activeScreen) {
      case "list":
        return <ListApplications onEdit={handleEdit} />;
      case "edit":
        return (
          <EditApplication
            id={formId}
            setActiveScreen={() => setActiveScreen("list")}
          />
        );
      default:
        return <ListApplications onEdit={handleEdit} />;
    }
  };

  return <div className="space-y-4 bg-white rounded-tl-2xl p-4">{renderComponent()}</div>;
}
