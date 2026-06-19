"use client";

interface StepHeaderProps {
  emoji?: string;
  title: string;
  subtitle?: string;
}

export function StepHeader({ emoji, title, subtitle }: StepHeaderProps) {
  return (
    <div className="text-center">
      {emoji && (
        <p className="mb-3 text-2xl tracking-widest sm:text-3xl">{emoji}</p>
      )}
      <h2 className="display-title text-3xl leading-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
