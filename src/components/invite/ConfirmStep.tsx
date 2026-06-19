"use client";

import { motion } from "framer-motion";
import { ACTIVITIES } from "@/lib/activities";
import { getConfirmCopy } from "@/lib/copy";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

interface ConfirmStepProps {
  resolvedDate: string;
  selectedActivity: string;
  message: string;
  isSubmitting: boolean;
  error: string;
  onSubmit: () => void;
  onContinueAnyway: () => void;
  onBack: () => void;
}

export function ConfirmStep({
  resolvedDate,
  selectedActivity,
  message,
  isSubmitting,
  error,
  onSubmit,
  onContinueAnyway,
  onBack,
}: ConfirmStepProps) {
  const activity = ACTIVITIES.find((a) => a.id === selectedActivity);
  const activityLabel = activity?.label ?? selectedActivity;
  const copy = getConfirmCopy(resolvedDate, activityLabel, message);

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-2xl border-2 border-dashed border-pink-200 bg-gradient-to-b from-pink-50/80 to-white p-5 text-left shadow-inner shadow-pink-100/50"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-pink-400">
            {copy.badge}
          </p>
          <span className="text-lg">🎟️</span>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {copy.whenLabel}
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {copy.date}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {copy.planLabel}
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {copy.activity}
            </p>
          </div>

          {copy.message && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {copy.noteLabel}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">
                {copy.message}
              </p>
            </div>
          )}
        </div>

        <div className="my-5 border-t border-dashed border-pink-200" />

        <p className="display-title text-center text-xl">
          {copy.heading}
        </p>
      </motion.div>

      {error && (
        <ErrorMessage message={error} variant="cute" className="mt-5 w-full" />
      )}

      <div className="mt-6 flex w-full flex-col gap-3">
        <PrimaryButton onClick={onSubmit} isLoading={isSubmitting}>
          {error ? copy.retryCta : copy.cta}
        </PrimaryButton>

        {error && (
          <SecondaryButton onClick={onContinueAnyway} disabled={isSubmitting}>
            {copy.fallbackCta}
          </SecondaryButton>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        disabled={isSubmitting}
        className="mt-5 text-sm text-muted transition-colors hover:text-pink-500 disabled:opacity-50"
      >
        {copy.backLabel}
      </button>
    </div>
  );
}
