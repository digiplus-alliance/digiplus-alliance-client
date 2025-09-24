"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

type Variant = "success" | "error";

interface NotificationModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: Variant;
  title: React.ReactNode;
  description?: React.ReactNode;
  buttonLabel?: React.ReactNode;
  onButtonClick?: () => void;
}

export default function NotificationModal({
  open,
  onOpenChange,
  variant = "success",
  title,
  description,
  buttonLabel,
  onButtonClick,
}: NotificationModalProps) {
  const isSuccess = variant === "success";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm pointer-events-none" />
      <DialogContent>
        <DialogHeader className="flex flex-col items-center gap-3">
          <div
            className={`p-4 rounded-full ${isSuccess ? "bg-green-100" : "bg-red-100"}`}
            aria-hidden
          >
            {isSuccess ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="text-center">{description}</DialogDescription>
          ) : null}
        </DialogHeader>

        {buttonLabel ? (
          <DialogFooter>
            <div className="w-full flex justify-center">
              <Button
                onClick={() => onButtonClick && onButtonClick()}
                className={isSuccess ? "bg-green-500 text-white hover:bg-green-400" : "bg-red-600 text-white"}
              >
                {buttonLabel}
              </Button>
            </div>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
