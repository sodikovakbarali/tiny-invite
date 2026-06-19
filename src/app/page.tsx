"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ActivityStep } from "@/components/invite/ActivityStep";
import { ConfirmStep } from "@/components/invite/ConfirmStep";
import { DateStep } from "@/components/invite/DateStep";
import { MessageStep } from "@/components/invite/MessageStep";
import { QuestionStep } from "@/components/invite/QuestionStep";
import { SuccessStep } from "@/components/invite/SuccessStep";
import { YayStep } from "@/components/invite/YayStep";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StepContainer } from "@/components/ui/StepContainer";
import { useInviteFlow } from "@/hooks/useInviteFlow";

function InviteFlow() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name")?.trim() || undefined;

  const flow = useInviteFlow(name);

  return (
    <main className="invite-gradient relative min-h-screen overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-4 py-10 sm:py-14">
        <div className="cute-card w-full rounded-[2rem] p-6 sm:p-9">
          <StepContainer stepKey={flow.step}>
            {flow.step === "question" && (
              <QuestionStep
                noAttempts={flow.noAttempts}
                isSubmitting={flow.isSubmitting}
                error={flow.error}
                onYes={() => flow.goToStep("yay")}
                onNo={flow.submitNo}
                onDodge={flow.incrementNoAttempts}
              />
            )}

            {flow.step === "yay" && (
              <YayStep onContinue={() => flow.goToStep("date")} />
            )}

            {flow.step === "date" && (
              <DateStep
                selectedDate={flow.selectedDate}
                onDateChange={flow.setSelectedDate}
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
                message={flow.message}
                isSubmitting={flow.isSubmitting}
                error={flow.error}
                onSubmit={flow.submitYes}
                onContinueAnyway={flow.continueAnyway}
                onBack={() => flow.goToStep("activity")}
              />
            )}

            {flow.step === "success" && (
              <SuccessStep
                variant="yes"
                offline={!flow.savedSuccessfully}
              />
            )}

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
          <LoadingSpinner label="Loading..." />
        </main>
      }
    >
      <InviteFlow />
    </Suspense>
  );
}
