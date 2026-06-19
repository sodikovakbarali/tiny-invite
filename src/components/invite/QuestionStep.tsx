"use client";

import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StepHeader } from "@/components/ui/StepHeader";
import { questionCopy } from "@/lib/copy";

interface QuestionStepProps {
  noAttempts: number;
  isSubmitting: boolean;
  error: string;
  onYes: () => void;
  onNo: () => void;
  onDodge: () => void;
}

const NO_CLICK_THRESHOLD = questionCopy.noClickThreshold;
const BUTTON_CLASS = "w-full min-w-[7.5rem] !px-4 !py-3.5";

function fireConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#ec4899", "#f9a8d4", "#fbcfe8", "#fdf2f8"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#ec4899", "#f9a8d4", "#fbcfe8", "#fdf2f8"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ec4899", "#f9a8d4", "#fbcfe8", "#fdf2f8"],
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
  const noSlotRef = useRef<HTMLDivElement>(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [homePosition, setHomePosition] = useState({ x: 0, y: 0 });
  const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 });
  const canClickNo = noAttempts >= NO_CLICK_THRESHOLD;

  useLayoutEffect(() => {
    const updateLayout = () => {
      const container = containerRef.current;
      const slot = noSlotRef.current;
      if (!container || !slot) return;

      const containerRect = container.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();

      setHomePosition({
        x: slotRect.left - containerRect.left,
        y: slotRect.top - containerRect.top,
      });
      setButtonSize({
        width: slotRect.width,
        height: slotRect.height,
      });
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const moveNoButton = useCallback(() => {
    if (canClickNo) return;

    const container = containerRef.current;
    if (!container || buttonSize.width === 0) return;

    const maxX = Math.max(container.clientWidth - buttonSize.width, 0);
    const maxY = Math.max(container.clientHeight - buttonSize.height, 0);

    setNoPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
    onDodge();
  }, [buttonSize.height, buttonSize.width, canClickNo, onDodge]);

  const handleYes = () => {
    fireConfetti();
    setTimeout(onYes, 400);
  };

  const noLabel = canClickNo ? questionCopy.noFinal : questionCopy.no;
  const displayPosition =
    canClickNo || noAttempts === 0 ? homePosition : noPosition;
  const dodgeMessage =
    noAttempts > 0 && !canClickNo
      ? questionCopy.dodgeMessages[
          Math.min(noAttempts - 1, questionCopy.dodgeMessages.length - 1)
        ]
      : null;

  return (
    <div className="flex flex-col items-center text-center">
      <StepHeader title={questionCopy.heading} />

      <div
        ref={containerRef}
        className="relative mt-10 w-full max-w-xs min-h-[132px] sm:max-w-sm sm:min-h-[148px]"
      >
        <div className="grid grid-cols-2 gap-3">
          <PrimaryButton
            onClick={handleYes}
            disabled={isSubmitting}
            className={BUTTON_CLASS}
          >
            {questionCopy.yes}
          </PrimaryButton>

          <div ref={noSlotRef} aria-hidden className="invisible">
            <SecondaryButton tabIndex={-1} className={BUTTON_CLASS}>
              {questionCopy.no}
            </SecondaryButton>
          </div>
        </div>

        <motion.div
          animate={{ x: displayPosition.x, y: displayPosition.y }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="absolute left-0 top-0 z-10"
          style={{ width: buttonSize.width || "auto" }}
          onMouseEnter={!canClickNo ? moveNoButton : undefined}
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
            className={`${BUTTON_CLASS} ${canClickNo ? "!text-xs sm:!text-sm" : ""}`}
          >
            {noLabel}
          </SecondaryButton>
        </motion.div>
      </div>

      {dodgeMessage && (
        <p className="mt-3 text-xs text-muted animate-shimmer">{dodgeMessage}</p>
      )}

      {error && <ErrorMessage message={error} className="mt-6 w-full" />}
    </div>
  );
}
