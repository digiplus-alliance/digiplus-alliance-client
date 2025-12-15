"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { useFormStore, type Module } from "@/store/form-store";

// Zod validation schema
const welcomeFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

type WelcomeFormData = z.infer<typeof welcomeFormSchema>;

interface WelcomePageQuestionProps {
  onSubmit?: (data: WelcomeFormData) => void;
  navigateBack: () => void;
  navigateNext: () => void;
}

export default function AddModule({
  onSubmit,
  navigateBack,
  navigateNext,
}: WelcomePageQuestionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get modules from store
  const { modules, addModule, updateModule, removeModule } = useFormStore();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<WelcomeFormData>({
    resolver: zodResolver(welcomeFormSchema),
    mode: "onChange",
  });

  const onFormSubmit = async (data: WelcomeFormData) => {
    setIsSubmitting(true);
    try {
      // Create new module
      const newModule: Module = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        step: modules.length + 1,
      };

      // Add module to store
      addModule(newModule);

      // Reset form
      reset();

      onSubmit?.(data);
      // console.log("Module added:", newModule);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditModule = (module: Module) => {
    setEditingId(module.id);
    setEditTitle(module.title);
    setEditDescription(module.description || "");
  };

  const handleSaveEdit = (moduleId: string) => {
    updateModule(moduleId, { 
      title: editTitle, 
      description: editDescription 
    });
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleDeleteModule = (moduleId: string) => {
    removeModule(moduleId);
  };

  const handleSaveModules = () => {
    // console.log(
    //   "Modules and steps:",
    //   modules.map((module) => ({
    //     title: module.title,
    //     description: module.description,
    //     step: module.step,
    //   }))
    // );
    navigateNext();
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="p-6 border border-[#D6D4D4] rounded-lg max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col items-center justify-center space-y-6 w-full"
        >
          {/* Title Field */}
          <div className="w-full text-center space-y-2">
            <Input
              id="title"
              type="text"
              placeholder="Module title"
              {...register("title")}
              className={`font-normal text-center border-none shadow-none focus:ring-0 focus:outline-none leading-tight h-auto py-2 placeholder:text-[#3D3A3A] ${
                errors.title ? "border-red-500" : ""
              }`}
              style={{ fontSize: "2.25rem" }}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="w-full text-center space-y-2">
            <textarea
              id="description"
              rows={2}
              placeholder="Description is optional"
              {...register("description")}
              className={`w-full text-[#7A7A7A] text-center border-none shadow-none resize-none focus:ring-0 focus:outline-none ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-center space-x-8 w-full">
            <Button
              variant={"outline"}
              onClick={() => {
                navigateBack();
              }}
              className="px-6 py-2 bg-transparent"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-medium rounded-md px-6 py-2"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Adding...</span>
                </div>
              ) : modules.length > 0 ? (
                "Add more modules"
              ) : (
                "Add Module"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Second Form - Modules List */}
      <div className="p-6 border border-[#D6D4D4] rounded-lg max-w-lg mx-auto max-h-[300px] overflow-y-auto ml-6">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Modules Overview
        </h3>

        {modules.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No modules added yet</p>
        ) : (
          <div className="space-y-4 mb-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-[#EBFBFF] text-[#227C9D] text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                        Step {module.step}
                      </span>
                    </div>

                    {editingId === module.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Module title"
                          className="font-medium"
                        />
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Description (optional)"
                          className="w-full p-2 border border-gray-300 rounded-md resize-none text-sm"
                          rows={2}
                        />
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(module.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {module.title}
                        </h4>
                        {module.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {module.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {editingId !== module.id && (
                    <div className="flex space-x-1 ml-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditModule(module)}
                        className="p-2"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteModule(module.id)}
                        className="p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Button
            onClick={handleSaveModules}
            disabled={modules.length === 0}
            className="font-medium rounded-md px-6 py-2"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
