"use client";

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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
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
          <h1 className="text-2xl font-bold">Join the Digiplus Community</h1>
          <p className="mt-1 text-sm md:text-lg text-[#5E5B5B] max-w-lg">
            Create a free account to access trainings, apply for programs, and
            track your progress.
          </p>

          <p className="py-8 text-[#5E5B5B] text-sm">
            Already have an account?{" "}
            <span className="text-[#176E8E] hover:underline">
              <Link href="/auth/login">Log in</Link>
            </span>
          </p>
        </div>
        {/* Social login */}
        <div className="flex gap-4 items-center justify-center">
          <Button
            variant="ghost"
            className="text-[#171616] text-base px-8 py-4 font-normal border border-[#D6D4D4] flex items-center gap-3"
          >
            <FaFacebook className="w-12 h-12 text-[#3D3A3A]" />
            <span>Continue with Facebook</span>
          </Button>
          <Button
            variant="ghost"
            className="text-[#171616] text-base px-8 py-4 font-normal border border-[#D6D4D4] flex items-center gap-3"
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
      <div className="w-full max-w-lg rounded-lg bg-white shadow">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
          <div className="flex gap-2">
            <div className="w-full">
              <label htmlFor="firstName" className="text-sm font-normal text-[#706C6C] block mb-1">First Name</label>
              <Input id="firstName" placeholder="First Name" {...register("firstName")} />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="lastName" className="text-sm font-normal text-[#706C6C] block mb-1">Last Name</label>
              <Input id="lastName" placeholder="Last Name" {...register("lastName")} />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <label htmlFor="companyName" className="text-sm font-normal text-[#706C6C] block mb-1">Company Name</label>
              <Input id="companyName" placeholder="Company Name" {...register("companyName")} />
              {errors.companyName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.companyName.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="email" className="text-sm font-normal text-[#706C6C] block mb-1">Email</label>
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
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-normal text-[#706C6C] block mb-1">Password</label>
            <PasswordInput
              id="password"
              placeholder="********"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <p className="text-xs text-[#5E5B5B]">
            By signing up, you agree with our{" "}
            <a href="#" className="text-black hover:underline">
              privacy policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-black hover:underline">
              terms of use
            </a>
            .
          </p>

          <Button
            type="submit"
            className="w-full mt-4"
          >
            Create an account
          </Button>
        </form>
      </div>
    </div>
  );
}
