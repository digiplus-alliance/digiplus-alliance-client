import { Button } from "@/components/ui/button";

export default function EditApplication({
  id,
  setActiveScreen,
}: {
  id: string;
  setActiveScreen: (screen: string) => void;
}) {
  return (
    <div className="p-6 space-y-6 font-secondary rounded-tl-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-primary font-bold">Edit Application</h1>
        <Button variant="outline" onClick={() => setActiveScreen("list")}>
          Back
        </Button>
      </div>
      {/* Form fields for editing an existing application would go here */}
      <p>This is where the edit application form for {id}.</p>
    </div>
  );
}
