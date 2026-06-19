"use client";

import { motion } from "framer-motion";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

interface MessageStepProps {
  message: string;
  onMessageChange: (value: string) => void;
  onContinue: () => void;
}

export function MessageStep({
  message,
  onMessageChange,
  onContinue,
}: MessageStepProps) {
  return (
    <div className="flex flex-col">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl"
      >
        Any special requests, conditions, warnings, or dramatic plot twists?
      </motion.h2>

      <textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        maxLength={2000}
        rows={5}
        placeholder="Optional. But drama is welcome."
        className="mt-8 w-full resize-none rounded-2xl border border-wine/20 bg-white/80 px-5 py-4 text-sm leading-relaxed text-foreground placeholder:text-muted/60 focus:border-wine/40 focus:outline-none focus:ring-2 focus:ring-wine/10"
      />

      <p className="mt-2 text-right text-xs text-muted">
        {message.length}/2000
      </p>

      <div className="mt-6 flex justify-center">
        <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
      </div>
    </div>
  );
}
