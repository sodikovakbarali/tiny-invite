import { NextRequest, NextResponse } from "next/server";
import { listPageViews, listResponses } from "@/lib/responseStorage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password =
      typeof body?.password === "string" ? body.password : "";

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD is not configured.");
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 },
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: "Incorrect password." },
        { status: 401 },
      );
    }

    const [responses, pageViews] = await Promise.all([
      listResponses(),
      listPageViews(),
    ]);

    return NextResponse.json({ success: true, responses, pageViews });
  } catch (error) {
    console.error("Results route error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
