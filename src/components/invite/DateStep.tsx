"use client";

import { motion } from "framer-motion";
import { dateCopy } from "@/lib/copy";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StepHeader } from "@/components/ui/StepHeader";

interface DateStepProps {
  selectedDate: string;
  onDateChange: (value: string) => void;
  onContinue: () => void;
}

export function DateStep({
  selectedDate,
  onDateChange,
  onContinue,
}: DateStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <StepHeader
        emoji={dateCopy.emoji}
        title={dateCopy.heading}
        subtitle={dateCopy.subheading}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 w-full"
      >
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="cute-input w-full px-4 py-3.5 text-sm text-foreground"
        />
      </motion.div>

      <div className="mt-8">
        <PrimaryButton onClick={onContinue} disabled={!selectedDate}>
          {dateCopy.cta}
        </PrimaryButton>
      </div>
    </div>
  );
}
