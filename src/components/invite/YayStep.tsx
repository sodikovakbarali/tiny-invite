"use client";

import { motion } from "framer-motion";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StepHeader } from "@/components/ui/StepHeader";
import { yayCopy } from "@/lib/copy";

interface YayStepProps {
  onContinue: () => void;
}

export function YayStep({ onContinue }: YayStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center"
    >
      <StepHeader
        emoji={yayCopy.emoji}
        title={yayCopy.heading}
        subtitle={yayCopy.subheading}
      />

      <div className="mt-10">
        <PrimaryButton onClick={onContinue}>{yayCopy.cta}</PrimaryButton>
      </div>
    </motion.div>
  );
}
