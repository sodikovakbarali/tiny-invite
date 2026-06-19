"use client";

interface ErrorMessageProps {
  message: string;
  className?: string;
  variant?: "default" | "cute";
}

export function ErrorMessage({
  message,
  className = "",
  variant = "default",
}: ErrorMessageProps) {
  if (!message) return null;

  const styles =
    variant === "cute"
      ? "border-pink-200 bg-pink-50 text-pink-700"
      : "border-red-200 bg-red-50 text-red-800";

  return (
    <div
      role="alert"
      className={`flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm ${styles} ${className}`}
    >
      <span className="shrink-0 text-base leading-none">
        {variant === "cute" ? "🥲" : "!"}
      </span>
      <span>{message}</span>
    </div>
  );
}
