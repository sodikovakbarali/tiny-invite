"use client";

import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

interface QuestionStepProps {
  noAttempts: number;
  isSubmitting: boolean;
  error: string;
  onYes: () => void;
  onNo: () => void;
  onDodge: () => void;
}

const NO_CLICK_THRESHOLD = 5;

function fireConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#722F37", "#F9E4E8", "#E8E0F0", "#FFF8F0"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#722F37", "#F9E4E8", "#E8E0F0", "#FFF8F0"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#722F37", "#F9E4E8", "#E8E0F0", "#FFF8F0"],
  });
  frame();
}

export function QuestionStep({
  noAttempts,
  isSubmitting,
  error,
  onYes,
  onNo,
  onDodge,
}: QuestionStepProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const canClickNo = noAttempts >= NO_CLICK_THRESHOLD;

  const moveNoButton = useCallback(() => {
    if (canClickNo) return;

    const container = containerRef.current;
    if (!container) return;

    const maxX = Math.max(container.clientWidth - 120, 0);
    const maxY = Math.max(container.clientHeight - 52, 0);

    setNoPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
    onDodge();
  }, [canClickNo, onDodge]);

  const handleYes = () => {
    fireConfetti();
    setTimeout(onYes, 400);
  };

  const noLabel = canClickNo ? "Okay fine, maybe later 😭" : "No";

  return (
    <div className="flex flex-col items-center text-center">
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
      >
        Will you go on a date with me?
      </motion.h2>

      <div className="mt-10 w-full">
        <PrimaryButton
          onClick={handleYes}
          disabled={isSubmitting}
          className="w-full max-w-xs"
        >
          Yes
        </PrimaryButton>

        <div
          ref={containerRef}
          className="relative mt-6 h-32 w-full max-w-sm mx-auto"
        >
          <motion.div
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute left-0 top-0 ${canClickNo ? "" : "z-10"}`}
            onMouseEnter={moveNoButton}
            onTouchStart={(e) => {
              if (!canClickNo) {
                e.preventDefault();
                moveNoButton();
              }
            }}
          >
            <SecondaryButton
              onClick={canClickNo ? onNo : moveNoButton}
              disabled={isSubmitting}
              isLoading={isSubmitting && canClickNo}
              className={canClickNo ? "whitespace-nowrap px-6" : "px-8"}
            >
              {noLabel}
            </SecondaryButton>
          </motion.div>
        </div>

        {!canClickNo && noAttempts > 0 && (
          <p className="mt-2 text-xs text-muted animate-shimmer">
            Nice try. Attempt {noAttempts} of {NO_CLICK_THRESHOLD}.
          </p>
        )}
      </div>

      {error && <ErrorMessage message={error} className="mt-6 w-full" />}
    </div>
  );
}
