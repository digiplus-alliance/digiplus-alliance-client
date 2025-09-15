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
          <h1 className="text-2xl font-bold">Oops! you have forgotten your password</h1>
          <p className="mt-1 text-sm md:text-lg text-[#5E5B5B] max-w-lg">
            input your email and we will send you a link if you have registered with us.
          </p>
        </div>
      </div>
      <div className="w-full max-w-lg rounded-lg bg-white shadow">
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

          <Button type="submit" className="w-full mt-8">
            Verify email
          </Button>
        </form>
      </div>
    </div>
  );
}
