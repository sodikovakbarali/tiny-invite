"use client";

import { motion } from "framer-motion";
import { ACTIVITIES } from "@/lib/activities";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

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
  const activityLabel = activity?.title ?? selectedActivity;

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full rounded-3xl border border-wine/10 bg-white/60 p-8 backdrop-blur-sm"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-wine/60">
          Final confirmation
        </p>
        <h2 className="mt-4 font-serif text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
          Confirmed: You + me + {resolvedDate} + {activityLabel}.
        </h2>
      </motion.div>

      {error && <ErrorMessage message={error} className="mt-6 w-full" />}

      <div className="mt-8">
        <PrimaryButton onClick={onSubmit} isLoading={isSubmitting}>
          Lock it in
        </PrimaryButton>
      </div>
    </div>
  );
}
