"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "@/app/api/auth/useForgotPassword";
import SpinnerIcon from "@/components/icons/spinner";

const initiateSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const verifySchema = z.object({
  verificationCode: z.string().min(1, "Verification code is required"),
});

type InitiateFormValues = z.infer<typeof initiateSchema>;
type VerifyFormValues = z.infer<typeof verifySchema>;

// mask email like: abc*****a@example.com
const maskEmail = (email: string) => {
  if (!email) return "";
  const [local, domain] = email.split("@");
  if (!domain) return email;
  if (local.length <= 2) return `${local[0]}*****@${domain}`;
  if (local.length <= 4) {
    const first = local.slice(0, 1);
    const last = local.slice(-1);
    return `${first}*****${last}@${domain}`;
  }
  const first3 = local.slice(0, 3);
  const last1 = local.slice(-1);
  const maskLen = Math.max(3, local.length - 4);
  const mask = "*".repeat(maskLen);
  return `${first3}${mask}${last1}@${domain}`;
};

export default function ForgotPasswordPage() {
  const [screen, setScreen] = useState<"initiate" | "verify">("initiate");
  const [email, setEmail] = useState<string>("");

  return screen === "initiate" ? (
    <InitiateChangePassword
      onInitiate={(e) => {
        setEmail(e);
        setScreen("verify");
      }}
    />
  ) : (
    <VerifyCode email={email} onBack={() => setScreen("initiate")} />
  );
}

const InitiateChangePassword: React.FC<{
  onInitiate: (email: string) => void;
}> = ({ onInitiate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitiateFormValues>({
    resolver: zodResolver(initiateSchema),
  });

  const { mutate: sendEmail, isPending } = useForgotPassword();
  const [successModal, setSuccessModal] = useState(false);
  const router = useRouter();
  const onSubmit = (data: InitiateFormValues) => {
    sendEmail(
      { email: data.email },
      {
        onSuccess: (res) => {
          setSuccessModal(true);
        },
      }
    );
  };

  if (successModal) {
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
            <h1 className="text-lg md:text-2xl font-bold">Email Sent!</h1>
            <p className="mt-1 text-xs md:text-lg text-[#5E5B5B] max-w-lg py-4 md:py-0">
              A verification link has been sent to your email. Please check your
              inbox and follow the instructions to reset your password.
            </p>
          </div>
        </div>
        <div className="w-full max-w-lg md:rounded-lg md:bg-white md:shadow">
          <div className="p-8">
            <Button
              onClick={() => {
                router.push("/auth/login");
              }}
              className="w-full"
            >
              Back to Login
            </Button>
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
          <h1 className="text-lg md:text-2xl font-bold">
            Oops! you have forgotten your password
          </h1>
          <p className="mt-1 text-xs md:text-lg text-[#5E5B5B] max-w-lg py-4 md:py-0">
            Input your email and we will send you a verification link if you
            have registered with us.
          </p>
        </div>
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

          <Button type="submit" className="w-full mt-8">
            {isPending ? <SpinnerIcon /> : "Send verification link"}
          </Button>
        </form>
      </div>
    </div>
  );
};

const VerifyCode: React.FC<{ email: string; onBack?: () => void }> = ({
  email,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
  });
  const router = useRouter();

  const onSubmit = (data: VerifyFormValues) => {
    console.log("Verification submitted:", data);
    router.push("/auth/change-password");
  };

  const [seconds, setSeconds] = useState<number>(60);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const handleResend = () => {
    if (seconds > 0) return;
    setSeconds(60);
  };

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
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
          <h1 className="text-lg md:text-2xl font-bold">Verify your email</h1>
          <p className="mt-1 text-xs md:text-lg text-[#706C6C] max-w-lg py-2 md:py-0">
            That’s fine, we have sent a verification code to the email you
            registered with{" "}
            <span className="font-medium">{maskEmail(email)}</span>
          </p>
        </div>
      </div>
      <div className="w-full max-w-lg md:rounded-lg md:bg-white md:shadow">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
          <div>
            <label
              htmlFor="verificationCode"
              className="text-sm font-normal text-[#706C6C] block mb-1"
            >
              Verification Code
            </label>
            <Input
              id="verificationCode"
              placeholder="Enter verification code"
              type="text"
              {...register("verificationCode")}
            />
            {errors.verificationCode && (
              <p className="mt-1 text-xs text-red-500">
                {errors.verificationCode.message}
              </p>
            )}

            <div className="flex justify-center text-sm text-[#706C6C] mt-4">
              {formatTime(seconds)}
            </div>
          </div>

          <p className="text-[#176E8E] text-sm text-center py-6">
            <button
              type="button"
              onClick={handleResend}
              className={`underline ${
                seconds > 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Resend Link
            </button>
          </p>

          <Button type="submit" className="w-full mt-4">
            Set New Password
          </Button>
        </form>
      </div>
    </div>
  );
};
