"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  error?: string;
}

export function PasswordInput({ error, ...props }: PasswordInputProps) {
  const [show, setShow] = React.useState(false);

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          {...props}
          type={show ? "text" : "password"}
          className={`pr-10 ${error ? "border-red-500 focus:ring-red-500" : ""}`}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
