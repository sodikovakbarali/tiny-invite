import { NextRequest, NextResponse } from "next/server";
import { extractRequestMetadata } from "@/lib/requestMetadata";
import { saveResponse } from "@/lib/responseStorage";
import type { Answer, SubmitPayload } from "@/types/response";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;
const MAX_FIELD_LENGTH = 500;

function isValidAnswer(value: unknown): value is Answer {
  return value === "yes" || value === "no";
}

function trimOptional(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}

function validatePayload(body: unknown): SubmitPayload | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body." };
  }

  const data = body as Record<string, unknown>;

  if (!isValidAnswer(data.answer)) {
    return { error: 'Answer must be "yes" or "no".' };
  }

  const payload: SubmitPayload = {
    answer: data.answer,
    name: trimOptional(data.name, MAX_NAME_LENGTH),
    message: trimOptional(data.message, MAX_MESSAGE_LENGTH),
    selected_date: trimOptional(data.selected_date, MAX_FIELD_LENGTH),
    selected_activity: trimOptional(data.selected_activity, MAX_FIELD_LENGTH),
  };

  if (payload.answer === "yes") {
    if (!payload.selected_date) {
      return { error: "Selected date is required for a yes answer." };
    }
    if (!payload.selected_activity) {
      return { error: "Selected activity is required for a yes answer." };
    }
  }

  return payload;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = validatePayload(body);

    if ("error" in validated) {
      return NextResponse.json(
        { success: false, error: validated.error },
        { status: 400 },
      );
    }

    const metadata = extractRequestMetadata(request);
    await saveResponse(validated, metadata);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit route error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
