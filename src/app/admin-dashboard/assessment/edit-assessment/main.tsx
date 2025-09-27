import { Button } from "@/components/ui/button";

export default function EditAssessment({toggleComponent}: { toggleComponent: (component: "current" | "edit" | "list") => void }) {
  return (
    <div >
      <h1>Edit Assessment Component</h1>
      <Button onClick={() => toggleComponent("edit")}>Edit Assessment</Button>
    </div>
  );
}