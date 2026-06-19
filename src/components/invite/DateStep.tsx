"use client";

import { motion } from "framer-motion";
import { DATE_OPTIONS } from "@/lib/dateOptions";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

interface DateStepProps {
  selectedDateId: string;
  customDate: string;
  onSelectDate: (id: string) => void;
  onCustomDateChange: (value: string) => void;
  onContinue: () => void;
}

export function DateStep({
  selectedDateId,
  customDate,
  onSelectDate,
  onCustomDateChange,
  onContinue,
}: DateStepProps) {
  const isValid =
    selectedDateId !== "" &&
    (selectedDateId !== "custom" || customDate.trim().length > 0);

  return (
    <div className="flex flex-col">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl"
      >
        Good choice. Now pick when I get to be nervous in person.
      </motion.h2>

      <div className="mt-8 flex flex-col gap-3">
        {DATE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelectDate(option.id)}
            className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all ${
              selectedDateId === option.id
                ? "border-wine bg-white/90 text-wine shadow-md ring-2 ring-wine/15"
                : "border-white/60 bg-white/50 text-foreground hover:border-wine/25 hover:bg-white/70"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {selectedDateId === "custom" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4"
        >
          <input
            type="text"
            value={customDate}
            onChange={(e) => onCustomDateChange(e.target.value)}
            placeholder="Tell me when works for you..."
            className="w-full rounded-2xl border border-wine/20 bg-white/80 px-5 py-4 text-sm text-foreground placeholder:text-muted/60 focus:border-wine/40 focus:outline-none focus:ring-2 focus:ring-wine/10"
          />
        </motion.div>
      )}

      <div className="mt-8 flex justify-center">
        <PrimaryButton onClick={onContinue} disabled={!isValid}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
