"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface PrimaryButtonProps extends HTMLMotionProps<"button"> {
  isLoading?: boolean;
}

export function PrimaryButton({
  children,
  className = "",
  isLoading = false,
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`rounded-full bg-gradient-to-r from-pink-400 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition-opacity hover:from-pink-500 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </motion.button>
  );
}
