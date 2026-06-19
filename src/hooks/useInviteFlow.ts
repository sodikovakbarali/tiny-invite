"use client";

import { useCallback, useMemo, useState } from "react";
import { ACTIVITIES } from "@/lib/activities";
import type { InviteStep, SubmitPayload } from "@/types/response";

async function submitResponse(payload: SubmitPayload): Promise<void> {
  const response = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error ?? "Something went wrong. Please try again.");
  }
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function useInviteFlow(name?: string) {
  const [step, setStep] = useState<InviteStep>("question");
  const [noAttempts, setNoAttempts] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const resolvedDate = useMemo(
    () => formatDate(selectedDate),
    [selectedDate],
  );

  const goToStep = useCallback((next: InviteStep) => {
    setError("");
    setStep(next);
  }, []);

  const incrementNoAttempts = useCallback(() => {
    setNoAttempts((prev) => prev + 1);
  }, []);

  const submitNo = useCallback(async () => {
    setIsSubmitting(true);
    setError("");
    try {
      await submitResponse({
        answer: "no",
        name: name || undefined,
      });
      setStep("no-respect");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  }, [name]);

  const submitYes = useCallback(async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const activity = ACTIVITIES.find((item) => item.id === selectedActivity);

      await submitResponse({
        answer: "yes",
        name: name || undefined,
        selected_date: resolvedDate,
        selected_activity: activity?.label ?? selectedActivity,
        message: message.trim() || undefined,
      });
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  }, [name, resolvedDate, selectedActivity, message]);

  return {
    step,
    noAttempts,
    selectedDate,
    selectedActivity,
    message,
    resolvedDate,
    isSubmitting,
    error,
    setSelectedDate,
    setSelectedActivity,
    setMessage,
    goToStep,
    incrementNoAttempts,
    submitNo,
    submitYes,
    setError,
  };
}
