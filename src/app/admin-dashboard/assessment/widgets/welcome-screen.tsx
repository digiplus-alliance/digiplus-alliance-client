"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormStore } from "@/store/form-store";

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
  instruction: z
    .string()
    .max(1000, "Instruction must be less than 1000 characters")
    .optional(),
});

type WelcomeFormData = z.infer<typeof welcomeFormSchema>;

interface WelcomePageQuestionProps {
  onSubmit?: (data: WelcomeFormData) => void;
}

export default function WelcomePageQuestion({
  onSubmit,
}: WelcomePageQuestionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setWelcomeScreen, welcomeScreen } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<WelcomeFormData>({
    resolver: zodResolver(welcomeFormSchema),
    mode: "onChange",
    defaultValues: {
      title: welcomeScreen?.title || "",
      description: welcomeScreen?.description || "",
      instruction: welcomeScreen?.instruction || "",
    },
  });

  // Reset form when welcomeScreen data changes (for edit mode)
  useEffect(() => {
    if (welcomeScreen) {
      reset({
        title: welcomeScreen.title || "",
        description: welcomeScreen.description || "",
        instruction: welcomeScreen.instruction || "",
      });
    }
  }, [welcomeScreen, reset]);

  const onFormSubmit = async (data: WelcomeFormData) => {
    setIsSubmitting(true);
    try {
      // Save to Zustand store
      setWelcomeScreen(data);

      // Call the optional onSubmit callback
      onSubmit?.(data);
      console.log("Form data:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 border border-[#D6D4D4] rounded-lg max-w-md mx-auto">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col items-center justify-center space-y-6 w-full"
      >
        {/* Title Field */}
        <div className="w-full text-center space-y-2">
          <Input
            id="title"
            type="text"
            placeholder="Write title here"
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
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Instruction Field */}
        <div className="w-full text-center space-y-2">
          <textarea
            id="instruction"
            rows={2}
            placeholder="Instruction is optional"
            {...register("instruction")}
            className={`w-full text-[#7A7A7A] italic text-center border-none shadow-none resize-none focus:ring-0 focus:outline-none ${
              errors.instruction ? "border-red-500" : ""
            }`}
          />
          {errors.instruction && (
            <p className="text-sm text-red-600">{errors.instruction.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="font-medium rounded-md px-6 py-2"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Next...</span>
              </div>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
