import { NextRequest } from "next/server";
import type { RequestMetadata } from "@/types/response";

export function extractRequestMetadata(request: NextRequest): RequestMetadata {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    null;

  return {
    ip_address: ip,
    country: request.headers.get("x-vercel-ip-country") ?? null,
    city: request.headers.get("x-vercel-ip-city") ?? null,
    region: request.headers.get("x-vercel-ip-country-region") ?? null,
    language:
      request.headers.get("accept-language")?.split(",")[0]?.trim() ?? null,
    referrer: request.headers.get("referer") ?? null,
    user_agent: request.headers.get("user-agent") ?? null,
  };
}
