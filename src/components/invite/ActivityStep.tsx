"use client";

import { motion } from "framer-motion";
import { ACTIVITIES } from "@/lib/activities";
import { activityCopy } from "@/lib/copy";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StepHeader } from "@/components/ui/StepHeader";

interface ActivityStepProps {
  selectedActivity: string;
  onSelectActivity: (id: string) => void;
  onContinue: () => void;
}

export function ActivityStep({
  selectedActivity,
  onSelectActivity,
  onContinue,
}: ActivityStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <StepHeader emoji={activityCopy.emoji} title={activityCopy.heading} />

      <div className="mt-8 grid w-full grid-cols-2 gap-3">
        {ACTIVITIES.map((activity) => {
          const selected = selectedActivity === activity.id;

          return (
            <motion.button
              key={activity.id}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectActivity(activity.id)}
              className={`rounded-2xl border-2 px-3 py-4 text-sm font-medium transition-all ${
                selected
                  ? "border-pink-400 bg-pink-50 text-pink-600 shadow-md shadow-pink-100"
                  : "border-pink-100 bg-white text-foreground hover:border-pink-200 hover:bg-pink-50/50"
              }`}
            >
              {activity.label}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={onContinue} disabled={!selectedActivity}>
          {activityCopy.cta}
        </PrimaryButton>
      </div>
    </div>
  );
}
