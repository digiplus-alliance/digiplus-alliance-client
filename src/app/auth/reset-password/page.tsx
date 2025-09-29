"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SpinnerIcon from "@/components/icons/spinner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import Image from "next/image";
import Link from "next/link";
import { useResetPassword } from "@/app/api/auth/useResetPassword";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!resetToken) {
      console.error("No reset token available");
      return;
    }

    const payload = {
      password: data.newPassword,
      resetToken,
    };

    console.log("Reset password payload:", payload);

    resetPassword(payload, {
      onSuccess: () => {
        reset();
        router.push("/auth/login");
      },
      onError: (error) => {
        console.error("Password reset failed:", error);
      },
    });
  };

  // If no resetToken is present, show error state
  if (!resetToken) {
    return (
      <div className="bg-[#EBEBEB] flex flex-col min-h-screen items-center justify-center p-4 overflow-auto">
        <div className="mb-4 text-center">
          <Link href="/">
            <Image
              src="/colored-logo.png"
              alt="Digiplus Logo"
              width={120}
              height={30}
              className="mx-auto mb-4"
            />
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-red-600">
            Invalid Reset Link
          </h1>
          <p className="mt-1 text-xs md:text-lg text-[#5E5B5B] max-w-lg py-4 md:py-0">
            This password reset link is invalid or has expired. Please request a
            new password reset.
          </p>
        </div>
        <div className="w-full max-w-lg md:rounded-lg md:bg-white md:shadow">
          <div className="p-8">
            <Link href="/auth/forgot-password">
              <Button className="w-full">Go to Forgot Password</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-lg md:text-2xl font-bold">Reset Your Password</h1>
          <p className="mt-1 text-xs md:text-lg text-[#5E5B5B] max-w-lg py-4 md:py-0">
            Enter your new password below to complete the password reset
            process.
          </p>
        </div>
      </div>

      <div className="w-full max-w-lg md:rounded-lg md:bg-white md:shadow">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
          <div className="space-y-2">
            <Label
              htmlFor="newPassword"
              className="text-sm font-normal text-[#706C6C] block mb-1"
            >
              New Password
            </Label>
            <PasswordInput
              id="newPassword"
              placeholder="Enter your new password"
              className="w-full"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-normal text-[#706C6C] block mb-1"
            >
              Confirm New Password
            </Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm your new password"
              className="w-full"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-8" disabled={isResetting}>
            {isResetting ? (
              <>
                <SpinnerIcon /> Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>

      {/* Back to Login Link */}
      <div className="mt-4 text-center">
        <Link
          href="/auth/login"
          className="text-sm text-[#176E8E] hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
