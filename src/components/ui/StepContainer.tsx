"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface StepContainerProps {
  stepKey: string;
  children: ReactNode;
}

export function StepContainer({ stepKey, children }: StepContainerProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
