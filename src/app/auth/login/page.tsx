"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: FormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("../api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      // Expecting { message, user }
      console.log("Login response message:", json.message);
      console.log("Login response user:", json.user);
    } catch (err) {
      console.error("Login request failed:", err);
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="text-2xl font-bold">Welcome back,</h1>
          <p className="mt-1 text-sm text-center md:text-lg text-[#5E5B5B]">
            We just want to confirm its you.
          </p>

          <p className="py-8 text-[#5E5B5B] text-sm">
            Don’t have an account?{" "}
            <span className="text-[#176E8E] hover:underline">
              <Link href="/auth/create-account">Create an account</Link>
            </span>
          </p>
        </div>
        {/* Social login */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <Button
            variant="ghost"
            className="text-[#171616] text-base md:w-auto w-full py-4 font-normal border border-[#D6D4D4] flex items-center gap-3"
          >
            <FaFacebook className="w-12 h-12 text-[#3D3A3A]" />
            <span>Continue with Facebook</span>
          </Button>
          <Button
            variant="ghost"
            className="text-[#171616] text-base  md:w-auto w-full  py-4 font-normal border border-[#D6D4D4] flex items-center gap-3"
          >
            {/* <FcGoogle className="w-5 h-5" /> */}
            <Image
              src="/google-logo.svg"
              alt="Google Logo"
              width={18}
              height={18}
            />
            <span>Continue with Google</span>
          </Button>
        </div>

        <div className="my-2 text-center text-base text-[#706C6C]">or</div>
      </div>
      <div className="w-full max-w-lg md:rounded-lg md:bg-white md:shadow">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-normal text-[#706C6C] block mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              placeholder="yourregemail@company.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-normal text-[#706C6C] block mb-1"
            >
              Password
            </label>
            <PasswordInput
              id="password"
              placeholder="********"
              {...register("password")}
              error={errors.password?.message}
            />
            <Link href="/auth/forgot-password"><p className="py-2 text-end text-[#D63A3A] text-sm">Forgot password?</p></Link>
          </div>

          <p className="text-xs text-center text-[#5E5B5B]">
            We will remember your presence for at most five days, then you will
            need to log in again.
          </p>

          <Button type="submit" className="w-full my-4">
            Go to your dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
