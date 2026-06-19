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
      className={`rounded-full border border-wine/30 bg-white/70 px-8 py-3.5 text-sm font-semibold tracking-wide text-wine backdrop-blur-sm transition-colors hover:border-wine/50 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </motion.button>
  );
}
