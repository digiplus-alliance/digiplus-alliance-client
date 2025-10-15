import { useGetApplicationForms } from "@/app/api/admin/applications/get-all-application-forms";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function ListApplications({
  onEdit,
}: {
  onEdit: (id: string) => void;
}) {
  const { data, error, isLoading } = useGetApplicationForms();

  const handleEdit = (formId: string) => {
    console.log("Edit form:", formId);
    onEdit(formId);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 font-secondary rounded-tl-2xl">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6 font-secondary rounded-tl-2xl">
        <p className="text-red-500">
          Error:{" "}
          {error instanceof Error
            ? error.message
            : "Failed to load application forms"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.map((form) => (
        <div
          key={form._id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">
              {form.welcome_title}
            </h3>
            {form.welcome_description && (
              <p className="text-sm text-gray-600 mt-1">
                {form.welcome_description}
              </p>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(form._id)}
            className="ml-4 flex items-center gap-2"
          >
            <Pencil size={16} />
            Edit
          </Button>
        </div>
      ))}

      {(!data || data.length === 0) && (
        <p className="text-gray-500 italic text-center py-8">
          No application forms available
        </p>
      )}
    </div>
  );
}
