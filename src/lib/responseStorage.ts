import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { isSupabaseConfigured } from "@/lib/isSupabaseConfigured";
import type { ResponseRecord, SubmitPayload } from "@/types/response";

const LOCAL_FILE = path.join(process.cwd(), "data", "responses.json");

async function readLocalResponses(): Promise<ResponseRecord[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf-8");
    return JSON.parse(raw) as ResponseRecord[];
  } catch {
    return [];
  }
}

async function writeLocalResponses(responses: ResponseRecord[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(responses, null, 2));
}

function toRecord(payload: SubmitPayload, userAgent: string | null): ResponseRecord {
  return {
    id: randomUUID(),
    name: payload.name ?? null,
    answer: payload.answer,
    selected_date: payload.selected_date ?? null,
    selected_activity: payload.selected_activity ?? null,
    message: payload.message ?? null,
    user_agent: userAgent,
    created_at: new Date().toISOString(),
  };
}

export async function saveResponse(
  payload: SubmitPayload,
  userAgent: string | null,
): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("responses").insert({
      name: payload.name ?? null,
      answer: payload.answer,
      selected_date: payload.selected_date ?? null,
      selected_activity: payload.selected_activity ?? null,
      message: payload.message ?? null,
      user_agent: userAgent,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error("Failed to save response.");
    }

    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Server not configured.");
  }

  const responses = await readLocalResponses();
  responses.unshift(toRecord(payload, userAgent));
  await writeLocalResponses(responses);
}

export async function listResponses(): Promise<ResponseRecord[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("responses")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Supabase fetch error:", error);
      throw new Error("Failed to fetch responses.");
    }

    return data ?? [];
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Server not configured.");
  }

  return readLocalResponses();
}
