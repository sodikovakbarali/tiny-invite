"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ActivityStep } from "@/components/invite/ActivityStep";
import { ConfirmStep } from "@/components/invite/ConfirmStep";
import { DateStep } from "@/components/invite/DateStep";
import { LandingStep } from "@/components/invite/LandingStep";
import { MessageStep } from "@/components/invite/MessageStep";
import { QuestionStep } from "@/components/invite/QuestionStep";
import { SuccessStep } from "@/components/invite/SuccessStep";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StepContainer } from "@/components/ui/StepContainer";
import { useInviteFlow } from "@/hooks/useInviteFlow";

function InviteFlow() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name")?.trim() || undefined;

  const flow = useInviteFlow(name);

  return (
    <main className="invite-gradient relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg items-center px-4 py-12 sm:py-16">
        <div className="w-full rounded-3xl border border-white/40 bg-white/30 p-6 shadow-xl shadow-wine/5 backdrop-blur-md sm:p-10">
          <StepContainer stepKey={flow.step}>
            {flow.step === "landing" && (
              <LandingStep
                name={name}
                onContinue={() => flow.goToStep("question")}
              />
            )}

            {flow.step === "question" && (
              <QuestionStep
                noAttempts={flow.noAttempts}
                isSubmitting={flow.isSubmitting}
                error={flow.error}
                onYes={() => flow.goToStep("date")}
                onNo={flow.submitNo}
                onDodge={flow.incrementNoAttempts}
              />
            )}

            {flow.step === "date" && (
              <DateStep
                selectedDateId={flow.selectedDateId}
                customDate={flow.customDate}
                onSelectDate={flow.setSelectedDateId}
                onCustomDateChange={flow.setCustomDate}
                onContinue={() => flow.goToStep("activity")}
              />
            )}

            {flow.step === "activity" && (
              <ActivityStep
                selectedActivity={flow.selectedActivity}
                onSelectActivity={flow.setSelectedActivity}
                onContinue={() => flow.goToStep("message")}
              />
            )}

            {flow.step === "message" && (
              <MessageStep
                message={flow.message}
                onMessageChange={flow.setMessage}
                onContinue={() => flow.goToStep("confirm")}
              />
            )}

            {flow.step === "confirm" && (
              <ConfirmStep
                resolvedDate={flow.resolvedDate}
                selectedActivity={flow.selectedActivity}
                isSubmitting={flow.isSubmitting}
                error={flow.error}
                onSubmit={flow.submitYes}
              />
            )}

            {flow.step === "success" && <SuccessStep variant="yes" />}

            {flow.step === "no-respect" && <SuccessStep variant="no" />}
          </StepContainer>
        </div>
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="invite-gradient flex min-h-screen items-center justify-center">
          <LoadingSpinner label="Opening something special..." />
        </main>
      }
    >
      <InviteFlow />
    </Suspense>
  );
}
