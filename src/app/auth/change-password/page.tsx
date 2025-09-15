"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

const schema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});

type FormValues = z.infer<typeof schema>;

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <div className="bg-[#EBEBEB] flex flex-col min-h-screen items-center justify-center p-4 overflow-auto">
      {/* Header */}
      <div className="mb-4 text-center">
        <div>
          <Link href="/">
            <Image
              src="/colored-logo.png"
              alt="Digiplus Logo"
              width={120}
              height={30}
              className="mx-auto mb-4"
            />
          </Link>
          <h1 className="text-lg md:text-2xl">New password</h1>
          <p className="mt-1 text-xs md:text-lg text-[#706C6C] max-w-lg py-2 md:py-0">
            Now that we have verified your email, kindly change your password for security reasons.
          </p>
        </div>
      </div>
      <div className="w-full max-w-lg md:rounded-lg md:bg-white md:shadow">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
          <div>
            <label
              htmlFor="password"
              className="text-sm font-normal text-[#706C6C] block mb-1"
            >
              New Password
            </label>
            <PasswordInput
              id="password"
              placeholder="Enter new password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-normal text-[#706C6C] block mb-1"
            >
              Confirm Password
            </label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full mt-8">
            Log in to your account
          </Button>
        </form>
      </div>
    </div>
  );
}