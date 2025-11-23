import { NextResponse } from "next/server";
import { DASHBOARD_SUMMARY_FALLBACK } from "@/lib/dashboard-summary";

const FASTAPI_BASE_URL = process.env.FASTAPI_BASE_URL ?? "http://127.0.0.1:8000";

export async function GET() {
  try {
    const response = await fetch(`${FASTAPI_BASE_URL}/summary`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`FastAPI responded with ${response.status}`);
    }

    const payload = await response.json();
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Failed to fetch FastAPI dashboard summary", error);

    return NextResponse.json(
      {
        ...DASHBOARD_SUMMARY_FALLBACK,
        error: "fastapi-unavailable",
      },
      { status: 200 }
    );
  }
}
