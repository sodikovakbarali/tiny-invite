"use client";

import { messageCopy } from "@/lib/copy";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StepHeader } from "@/components/ui/StepHeader";

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
    <div className="flex flex-col items-center text-center">
      <StepHeader
        emoji={messageCopy.emoji}
        title={messageCopy.heading}
        subtitle={messageCopy.subheading}
      />

      <textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        maxLength={2000}
        rows={4}
        placeholder={messageCopy.placeholder}
        className="cute-input mt-8 w-full resize-none px-4 py-3.5 text-sm leading-relaxed text-foreground placeholder:text-muted/60"
      />

      <div className="mt-8">
        <PrimaryButton onClick={onContinue}>{messageCopy.cta}</PrimaryButton>
      </div>
    </div>
  );
}
