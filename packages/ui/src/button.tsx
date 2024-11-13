"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={className + " bg-blue-500 px-3 py-2 text-white rounded-lg"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
