"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContactForm } from "@/app/api/landing/contact-form";
import SpinnerIcon from "@/components/icons/spinner";

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Please provide a reason"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const {
    mutate: submitContactForm,
    isPending,
    isError,
    error,
  } = useContactForm();

  const onSubmit = (data: FormData) => {
    submitContactForm(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">
        Send us a message by filling this form
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-[#706C6C] mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              {...register("first_name")}
              placeholder="First Name"
              aria-invalid={errors.first_name ? "true" : "false"}
              aria-describedby={
                errors.first_name ? "firstName-error" : undefined
              }
              className="w-full border rounded-md p-2"
            />
            {errors.first_name && (
              <p id="firstName-error" className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-[#706C6C] mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              {...register("last_name")}
              placeholder="Last Name"
              aria-invalid={errors.last_name ? "true" : "false"}
              aria-describedby={errors.last_name ? "lastName-error" : undefined}
              className="w-full border rounded-md p-2"
            />
            {errors.last_name && (
              <p id="lastName-error" className="text-red-500 text-sm">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#706C6C] mb-1"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            placeholder="email@mail.com"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full border rounded-md p-2"
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[#706C6C] mb-1"
          >
            Message
          </label>
          <textarea
            id="reason"
            {...register("message")}
            placeholder="Type your message here ..."
            rows={4}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "reason-error" : undefined}
            className="w-full border rounded-md p-2"
          />
          {errors.message && (
            <p id="reason-error" className="text-red-500 text-sm">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF5C5C] text-white font-semibold py-2 rounded-md hover:bg-red-500 transition"
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <SpinnerIcon />
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
