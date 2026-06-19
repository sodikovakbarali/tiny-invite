"use client";

import { motion } from "framer-motion";
import { successCopy } from "@/lib/copy";

interface SuccessStepProps {
  variant: "yes" | "no";
  offline?: boolean;
}

export function SuccessStep({ variant, offline = false }: SuccessStepProps) {
  const copy =
    variant === "yes" && offline ? successCopy.yesOffline : successCopy[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center"
    >
      <p className="text-3xl">{copy.emoji}</p>
      <h2 className="display-title mt-4 text-3xl sm:text-4xl">{copy.title}</h2>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
        {copy.body}
      </p>
    </motion.div>
  );
}
