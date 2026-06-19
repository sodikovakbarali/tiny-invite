"use client";

import { motion } from "framer-motion";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

interface LandingStepProps {
  name?: string;
  onContinue: () => void;
}

export function LandingStep({ name, onContinue }: LandingStepProps) {
  const heading = name
    ? `I made this for ${name}.`
    : "I made a tiny website for one very specific person.";

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-8 inline-flex rounded-full border border-wine/10 bg-white/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-wine/70 backdrop-blur-sm"
      >
        A tiny invitation
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl"
      >
        {heading}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
      >
        Because apparently just texting was too normal.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-10"
      >
        <PrimaryButton onClick={onContinue}>Open the question</PrimaryButton>
      </motion.div>
    </div>
  );
}
