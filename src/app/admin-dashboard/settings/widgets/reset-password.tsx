"use client";

import React from "react";
import { useForm } from "react-hook-form";
import SpinnerIcon from "@/components/icons/spinner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/ui/password-input";
import { useChangePassword } from "@/app/api/auth/useChangePassword";

type Props = {
  onSubmit?: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void> | void;
  className?: string;
};

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function PasswordChange({ onSubmit, className }: Props) {
  const form = useForm<FormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const submit = async (values: FormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      form.setError("confirmPassword", {
        type: "validate",
        message: "Passwords do not match",
      });
      return;
    }

    changePassword(
      {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: async () => {
          form.reset();
        },
      }
    );
  };

  return (
    <div className={className}>
      <div className="pt-6 space-y-1">
        <h3 className="font-primary text-xl md:text-2xl font-semibold">
          Reset password
        </h3>
        <p className="text-[#6E6D6D] text-sm md:text-base py-2">
          Kindly change your password for security reasons.
        </p>
      </div>
      <Separator />
      <form
        onSubmit={form.handleSubmit(submit)}
        className=" max-w-[70ch] space-y-4 bg-white p-8 rounded-2xl"
      >
        <div className="space-y-2">
          <Label
            htmlFor="currentPassword"
            className="block font-normal font-secondary text-[#121212] text-sm md:text-base"
          >
            Current Password
          </Label>

          <PasswordInput
            id="currentPassword"
            className="text-sm md:text-base lg:text-lg border-[#C4C4C4] w-[80%]"
            placeholder="Enter current password"
            {...form.register("currentPassword", {
              required: "Please enter your current password",
            })}
          />
          {form.formState.errors.currentPassword?.message && (
            <p className="text-sm text-red-500">
              {form.formState.errors.currentPassword?.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="newPassword"
            className="block font-normal font-secondary text-[#121212] text-sm md:text-base"
          >
            New Password
          </Label>

          <PasswordInput
            id="newPassword"
            className="text-sm md:text-base lg:text-lg border-[#C4C4C4] w-[80%]"
            placeholder="Enter new password"
            {...form.register("newPassword", {
              required: "Please enter a new password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />
          {form.formState.errors.newPassword?.message && (
            <p className="text-sm text-red-500">
              {form.formState.errors.newPassword?.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="block font-normal font-secondary text-[#121212] text-sm md:text-base"
          >
            Confirm New Password
          </Label>

          <PasswordInput
            id="confirmPassword"
            className="text-sm md:text-base lg:text-lg border-[#C4C4C4] w-[80%]"
            placeholder="Confirm new password"
            {...form.register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value: string) =>
                value === form.getValues("newPassword") ||
                "The passwords do not match",
            })}
          />
          {form.formState.errors.confirmPassword?.message && (
            <p className="text-sm text-red-500">
              {form.formState.errors.confirmPassword?.message}
            </p>
          )}
        </div>

        <Button className="w-full">
          {isChangingPassword ? (
            <>
              <SpinnerIcon /> Updating ...
            </>
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </div>
  );
}
