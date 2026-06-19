"use client";

import { useCallback, useMemo, useState } from "react";
import { ACTIVITIES } from "@/lib/activities";
import { DATE_OPTIONS } from "@/lib/dateOptions";
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

export function useInviteFlow(name?: string) {
  const [step, setStep] = useState<InviteStep>("landing");
  const [noAttempts, setNoAttempts] = useState(0);
  const [selectedDateId, setSelectedDateId] = useState<string>("");
  const [customDate, setCustomDate] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const resolvedDate = useMemo(() => {
    if (selectedDateId === "custom") {
      return customDate.trim();
    }
    const option = DATE_OPTIONS.find((item) => item.id === selectedDateId);
    return option?.label ?? "";
  }, [selectedDateId, customDate]);

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
        selected_activity: activity?.title ?? selectedActivity,
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
    selectedDateId,
    customDate,
    selectedActivity,
    message,
    resolvedDate,
    isSubmitting,
    error,
    setSelectedDateId,
    setCustomDate,
    setSelectedActivity,
    setMessage,
    goToStep,
    incrementNoAttempts,
    submitNo,
    submitYes,
    setError,
  };
}
