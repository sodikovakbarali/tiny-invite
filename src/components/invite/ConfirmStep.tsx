"use client";

import { motion } from "framer-motion";
import { ACTIVITIES } from "@/lib/activities";
import { getConfirmCopy } from "@/lib/copy";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StepHeader } from "@/components/ui/StepHeader";

interface ConfirmStepProps {
  resolvedDate: string;
  selectedActivity: string;
  isSubmitting: boolean;
  error: string;
  onSubmit: () => void;
}

export function ConfirmStep({
  resolvedDate,
  selectedActivity,
  isSubmitting,
  error,
  onSubmit,
}: ConfirmStepProps) {
  const activity = ACTIVITIES.find((a) => a.id === selectedActivity);
  const activityLabel = activity?.label ?? selectedActivity;
  const copy = getConfirmCopy(resolvedDate, activityLabel);

  return (
    <div className="flex flex-col items-center text-center">
      <StepHeader emoji={copy.emoji} title={copy.heading} />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 rounded-2xl bg-pink-50 px-5 py-4 text-sm font-medium leading-relaxed text-foreground"
      >
        {copy.summary}
      </motion.p>

      {error && (
        <ErrorMessage message={error} variant="cute" className="mt-6 w-full" />
      )}

      <div className="mt-8">
        <PrimaryButton onClick={onSubmit} isLoading={isSubmitting}>
          {copy.cta}
        </PrimaryButton>
      </div>
    </div>
  );
}
