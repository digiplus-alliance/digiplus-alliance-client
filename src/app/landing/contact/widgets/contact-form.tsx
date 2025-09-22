"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  reason: z.string().min(5, "Please provide a reason"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">
        Send us a message by filling this form
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#706C6C] mb-1">
              First Name
            </label>
            <input
              id="firstName"
              {...register("firstName")}
              placeholder="First Name"
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className="w-full border rounded-md p-2"
            />
            {errors.firstName && (
              <p id="firstName-error" className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#706C6C] mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              {...register("lastName")}
              placeholder="Last Name"
              aria-invalid={errors.lastName ? "true" : "false"}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className="w-full border rounded-md p-2"
            />
            {errors.lastName && (
              <p id="lastName-error" className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#706C6C] mb-1">
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
            <p id="email-error" className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-[#706C6C] mb-1">
            Reason
          </label>
          <textarea
            id="reason"
            {...register("reason")}
            placeholder="Reason for applying"
            rows={4}
            aria-invalid={errors.reason ? "true" : "false"}
            aria-describedby={errors.reason ? "reason-error" : undefined}
            className="w-full border rounded-md p-2"
          />
          {errors.reason && (
            <p id="reason-error" className="text-red-500 text-sm">{errors.reason.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF5C5C] text-white font-semibold py-2 rounded-md hover:bg-red-500 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
