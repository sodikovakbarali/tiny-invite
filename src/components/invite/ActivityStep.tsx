"use client";

import { motion } from "framer-motion";
import { ACTIVITIES } from "@/lib/activities";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SelectableCard } from "@/components/ui/SelectableCard";

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
    <div className="flex flex-col">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl"
      >
        What kind of date are we doing?
      </motion.h2>

      <div className="mt-8 flex flex-col gap-3">
        {ACTIVITIES.map((activity) => (
          <SelectableCard
            key={activity.id}
            title={activity.title}
            description={activity.description}
            icon={activity.icon}
            selected={selectedActivity === activity.id}
            onSelect={() => onSelectActivity(activity.id)}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <PrimaryButton onClick={onContinue} disabled={!selectedActivity}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
