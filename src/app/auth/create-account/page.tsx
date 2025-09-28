"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { useSignup } from "@/app/api/auth/useSignup";
import NotificationModal from "@/components/NotificationModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SpinnerIcon from "@/components/icons/spinner";
import { signUpSchema, SignUpValues } from "@/types/auth";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: "business_owner" },
  });
  const { mutate: signup, isPending } = useSignup();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = (data: SignUpValues) => {
    signup(data, {
      onSuccess: () => {
        setShowSuccessModal(true);
      },
      onError: (error: unknown) => {
        console.error("Signup error:", error);
        const message =
          error &&
          typeof error === "object" &&
          "message" in error &&
          typeof (error as { message: string }).message === "string"
            ? (error as { message: string }).message
            : "An error occurred during signup.";
        setErrorMessage(message);
      },
    });
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
          <h1 className="text-lg md:text-2xl font-bold">
            Join the Digiplus Community
          </h1>
          <p className="mt-1 text-xs md:text-lg text-[#5E5B5B] md:max-w-lg w-[70%] md:w-full mx-auto">
            Create a free account to access trainings, apply for programs, and
            track your progress.
          </p>

          <p className="py-8 text-[#5E5B5B] text-xs md:text-sm">
            Already have an account?{" "}
            <span className="text-[#176E8E] hover:underline">
              <Link href="/auth/login">Log in</Link>
            </span>
          </p>
        </div>
        {/* Social login */}
        {/* <div className="hidden md:flex gap-4 items-center justify-center">
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
            <FcGoogle className="w-5 h-5" />
            <Image
              src="/google-logo.svg"
              alt="Google Logo"
              width={18}
              height={18}
            />
            <span>Continue with Google</span>
          </Button>
        </div>

        <div className="hidden md:flex md:justify-center my-2 text-center text-base text-[#706C6C]">
          or
        </div> */}
      </div>
      <div className="w-full max-w-lg md:rounded-lg md:bg-white md:shadow">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
          {errorMessage && (
            <p className="mb-4 text-sm text-red-600">{errorMessage}</p>
          )}
          <div className="md:flex gap-2 space-y-4 md:space-y-0">
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="text-sm font-normal text-[#706C6C] block mb-1"
              >
                First Name
              </label>
              <Input
                id="first_name"
                placeholder="First Name"
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="last_name"
                className="text-sm font-normal text-[#706C6C] block mb-1"
              >
                Last Name
              </label>
              <Input
                id="last_name"
                placeholder="Last Name"
                {...register("last_name")}
              />
              {errors.last_name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:flex gap-2 space-y-4 md:space-y-0">
            <div className="w-full">
              <label
                htmlFor="business_name"
                className="text-sm font-normal text-[#706C6C] block mb-1"
              >
                Business Name
              </label>
              <Input
                id="business_name"
                placeholder="Business Name"
                {...register("business_name")}
              />
              {errors.business_name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.business_name.message}
                </p>
              )}
            </div>
            <div className="w-full">
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
          </div>

          {/* Role selector: Business owner checkbox (sets role) */}
          {/* <div className="flex items-center gap-3">
            register hidden role field so its value is submitted
            <input type="hidden" {...register("role")} />
            <input
              id="business_owner"
              type="checkbox"
              className="w-4 h-4"
              checked={watch("role") === "business_owner"}
              onChange={(e) =>
                setValue("role", e.target.checked ? "business_owner" : "client")
              }
            />
            <label htmlFor="business_owner" className="text-sm text-[#706C6C]">
              Business owner
            </label>
          </div> */}

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

          <Button type="submit" className="w-full mt-4">
            {isPending ? <SpinnerIcon /> : "Create an account"}
          </Button>
        </form>
      </div>

      {/* Social login */}
      <div className="flex flex-col md:hidden gap-2 items-center justify-center">
        <Button
          variant="ghost"
          className="text-[#171616] text-base px-8 py-4 font-normal border border-[#D6D4D4] flex items-center gap-3"
        >
          <FaFacebook className="w-12 h-12 text-[#3D3A3A]" />
          <span>Continue with Facebook</span>
        </Button>
        <div className="flex text-center text-base text-[#706C6C]">or</div>
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

      {showSuccessModal && (
        <NotificationModal
          open={showSuccessModal}
          variant="success"
          title="Account Created Successfully"
          description="Kindly check your email for a verification link to activate your account."
          buttonLabel="Proceed to Login"
          onButtonClick={() => {
            router.push("/auth/login");
          }}
        />
      )}
    </div>
  );
}
