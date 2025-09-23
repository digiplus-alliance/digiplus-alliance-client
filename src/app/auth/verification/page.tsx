"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SpinnerIcon from "@/components/icons/spinner";
import { useVerification } from "@/app/api/auth/useVerification";
import { useRequestVerification } from "@/app/api/auth/useRequestVerification";
import { useLogout } from "@/lib/logout";

export default function VerificationPage() {
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token"));
  }, []);
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const { mutate: verify } = useVerification();
  const { mutate: requestVerification, isPending: requestingVerification } = useRequestVerification();
  const { mutate: logoutMutate } = useLogout();

  const handleLogout = useCallback(() => {
    logoutMutate();
  }, [logoutMutate]);

  const userVerified = false;

  const handleResend = () => {
    requestVerification(
      {},
      {
        onSuccess: ({ message }) => {
          toast.success(message);
          setIsVerificationSuccess(true);
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : "Failed to send verification email");
        }
      }
    );
  };

  useEffect(() => {
    if (!isVerificationSuccess) return;

    const startCountdown = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const remaining = Math.max(0, 5 - Math.floor(elapsed / 1000));

      setCountdown(remaining);

      if (remaining > 0) {
        animationFrameRef.current = requestAnimationFrame(startCountdown);
      } else {
        handleLogout();
      }
    };

    animationFrameRef.current = requestAnimationFrame(startCountdown);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVerificationSuccess, handleLogout]);

  useEffect(() => {
    if (token) {
      verify(
        { code: token },
        {
          onSuccess: () => {
            toast.success("Verification successful!");
            setIsVerificationSuccess(true);
            setTimeout(() => {
              handleLogout();
            }, 2000);
          },
          onError: () => {
            toast.error("Verification failed");
            handleLogout();
          },
        }
      );
    }
  }, [token, router, verify, handleLogout]);

  if (token) {
    return (
      <div className="flex flex-row gap-2 items-center justify-center min-h-screen">
        <SpinnerIcon className="text-[#008080]" />
        <span>Verifying your account...</span>
      </div>
    );
  }

  if (isVerificationSuccess) {
    return (
      <Dialog open={true} onOpenChange={() => handleLogout()}>
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md pointer-events-none" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Sent!</DialogTitle>
            <DialogDescription>
              A verification email has been sent to your inbox. Please check
              your email and follow the instructions to verify your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="w-full text-center py-3 text-sm text-gray-600">
              Automatically logging out in {countdown} second
              {countdown !== 1 ? "s" : ""}...
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (!userVerified)
    return (
      <Dialog open={true}>
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md pointer-events-none" />
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Verify your email</DialogTitle>
            <DialogDescription>
              Request a verification email, then check your inbox and verify
              your email address to continue using your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="w-full"
              onClick={handleResend}
              disabled={requestingVerification}
              variant="secondary"
            >
              {requestingVerification ? (
                <>
                  <SpinnerIcon /> Requesting...
                </>
              ) : (
                "Request Verification Email"
              )}
            </Button>
            <Button
              className="w-full"
              onClick={() => handleLogout()}
              variant="destructive"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}
