"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
  className?: string;
}

export function LoadingSpinner({
  label = "Loading...",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-8 ${className}`}
    >
      <Loader2 className="h-8 w-8 animate-spin text-wine" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

export function LoadingOverlay({ label }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm"
    >
      <LoadingSpinner label={label} />
    </motion.div>
  );
}
