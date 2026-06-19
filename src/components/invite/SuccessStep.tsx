"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface SuccessStepProps {
  variant: "yes" | "no";
}

export function SuccessStep({ variant }: SuccessStepProps) {
  const message =
    variant === "yes"
      ? "Done. Your answer has been officially received by one nervous IT guy."
      : "Respect. I will now pretend this website never existed.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-wine/10"
      >
        <Heart
          className="h-8 w-8 text-wine"
          fill={variant === "yes" ? "currentColor" : "none"}
        />
      </motion.div>

      <h2 className="font-serif text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
        {message}
      </h2>
    </motion.div>
  );
}
