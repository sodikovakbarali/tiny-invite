import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { isSupabaseConfigured } from "@/lib/isSupabaseConfigured";
import type {
  PageViewRecord,
  RequestMetadata,
  ResponseRecord,
  SubmitPayload,
  TrackPayload,
} from "@/types/response";

const RESPONSES_FILE = path.join(process.cwd(), "data", "responses.json");
const PAGE_VIEWS_FILE = path.join(process.cwd(), "data", "page_views.json");

const emptyMetadata = (): RequestMetadata => ({
  ip_address: null,
  country: null,
  city: null,
  region: null,
  language: null,
  referrer: null,
  user_agent: null,
});

async function readJsonFile<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeJsonFile<T>(filePath: string, data: T[]): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

function metadataFields(metadata: RequestMetadata) {
  return {
    ip_address: metadata.ip_address,
    country: metadata.country,
    city: metadata.city,
    region: metadata.region,
    language: metadata.language,
    referrer: metadata.referrer,
    user_agent: metadata.user_agent,
  };
}

function toResponseRecord(
  payload: SubmitPayload,
  metadata: RequestMetadata,
): ResponseRecord {
  return {
    id: randomUUID(),
    name: payload.name ?? null,
    answer: payload.answer,
    selected_date: payload.selected_date ?? null,
    selected_activity: payload.selected_activity ?? null,
    message: payload.message ?? null,
    created_at: new Date().toISOString(),
    ...metadataFields(metadata),
  };
}

function toPageViewRecord(
  payload: TrackPayload,
  metadata: RequestMetadata,
): PageViewRecord {
  return {
    id: randomUUID(),
    name: payload.name ?? null,
    path: payload.path ?? "/",
    created_at: new Date().toISOString(),
    ...metadataFields(metadata),
  };
}

export async function saveResponse(
  payload: SubmitPayload,
  metadata: RequestMetadata,
): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("responses").insert({
      name: payload.name ?? null,
      answer: payload.answer,
      selected_date: payload.selected_date ?? null,
      selected_activity: payload.selected_activity ?? null,
      message: payload.message ?? null,
      ...metadataFields(metadata),
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

  const responses = await readJsonFile<ResponseRecord>(RESPONSES_FILE);
  responses.unshift(toResponseRecord(payload, metadata));
  await writeJsonFile(RESPONSES_FILE, responses);
}

export async function savePageView(
  payload: TrackPayload,
  metadata: RequestMetadata,
): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("page_views").insert({
      name: payload.name ?? null,
      path: payload.path ?? "/",
      ...metadataFields(metadata),
    });

    if (error) {
      console.error("Supabase page view insert error:", error);
      throw new Error("Failed to save page view.");
    }

    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Server not configured.");
  }

  const pageViews = await readJsonFile<PageViewRecord>(PAGE_VIEWS_FILE);
  pageViews.unshift(toPageViewRecord(payload, metadata));
  await writeJsonFile(PAGE_VIEWS_FILE, pageViews);
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

    return (data ?? []).map((row) => ({
      ...emptyMetadata(),
      ...row,
    }));
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Server not configured.");
  }

  return readJsonFile<ResponseRecord>(RESPONSES_FILE);
}

export async function listPageViews(): Promise<PageViewRecord[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("page_views")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Supabase page views fetch error:", error);
      throw new Error("Failed to fetch page views.");
    }

    return (data ?? []).map((row) => ({
      ...emptyMetadata(),
      ...row,
    }));
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Server not configured.");
  }

  return readJsonFile<PageViewRecord>(PAGE_VIEWS_FILE);
}
