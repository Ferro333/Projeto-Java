'use client';

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils"; 

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className = "", children, ...props }: CardProps) => {
  return (
    <div className={cn("bg-gray-800 text-white p-4 rounded-lg", className)} {...props}>
      {children}
    </div>
  );
};
