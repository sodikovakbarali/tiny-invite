import { NextRequest, NextResponse } from "next/server";
import { extractRequestMetadata } from "@/lib/requestMetadata";
import { savePageView } from "@/lib/responseStorage";
import type { TrackPayload } from "@/types/response";

const MAX_NAME_LENGTH = 100;
const MAX_PATH_LENGTH = 200;

function validatePayload(body: unknown): TrackPayload {
  if (!body || typeof body !== "object") {
    return {};
  }

  const data = body as Record<string, unknown>;

  return {
    name:
      typeof data.name === "string"
        ? data.name.trim().slice(0, MAX_NAME_LENGTH) || undefined
        : undefined,
    path:
      typeof data.path === "string"
        ? data.path.trim().slice(0, MAX_PATH_LENGTH) || "/"
        : "/",
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const payload = validatePayload(body);
    const metadata = extractRequestMetadata(request);

    await savePageView(payload, metadata);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track route error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
