"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface SecondaryButtonProps extends HTMLMotionProps<"button"> {
  isLoading?: boolean;
}

export function SecondaryButton({
  children,
  className = "",
  isLoading = false,
  disabled,
  ...props
}: SecondaryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`rounded-full border-2 border-pink-100 bg-white px-8 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-pink-200 hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </motion.button>
  );
}
