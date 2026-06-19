"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

interface SelectableCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onSelect: () => void;
}

export function SelectableCard({
  title,
  description,
  icon: Icon,
  selected,
  onSelect,
}: SelectableCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full rounded-2xl border p-4 text-left transition-all ${
        selected
          ? "border-wine bg-white/90 shadow-lg shadow-wine/10 ring-2 ring-wine/20"
          : "border-white/60 bg-white/50 hover:border-wine/30 hover:bg-white/70"
      }`}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-wine text-white"
        >
          <Check className="h-3.5 w-3.5" />
        </motion.div>
      )}
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            selected ? "bg-wine/10 text-wine" : "bg-lavender/50 text-wine/70"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
        </div>
      </div>
    </motion.button>
  );
}
