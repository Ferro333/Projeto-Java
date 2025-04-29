'use client';

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils"; 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "ghost";
  size?: "md" | "icon";
}

export const Button = ({
  className = "",
  children,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) => {
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "bg-transparent text-white hover:bg-gray-700",
  };

  const sizes = {
    md: "px-4 py-2 text-base",
    icon: "p-2",
  };

  return (
    <button
      className={cn("rounded-lg transition", variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
