import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
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

    const userAgent = request.headers.get("user-agent") ?? null;

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("responses").insert({
      name: validated.name ?? null,
      answer: validated.answer,
      selected_date: validated.selected_date ?? null,
      selected_activity: validated.selected_activity ?? null,
      message: validated.message ?? null,
      user_agent: userAgent,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save response." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit route error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 },
    );
  }
}
