import { NextRequest, NextResponse } from "next/server";

const DEFAULT_DASHBOARD_SERVICE_URL = "http://192.168.0.216:8000";
const DASHBOARD_SERVICE_URL =
  process.env.DASHBOARD_SERVICE_URL?.replace(/\/$/, "") ||
  DEFAULT_DASHBOARD_SERVICE_URL;

const RELATED_KEYS = [
  "related_products",
  "relatedProducts",
  "products",
  "results",
  "items",
];

const pickRelatedProducts = (payload: unknown): unknown[] | undefined => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  for (const key of RELATED_KEYS) {
    // @ts-expect-error - runtime key lookup
    const value = payload[key];
    if (Array.isArray(value) && value.length > 0) {
      return value;
    }
  }

  return undefined;
};

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Missing `query` parameter" },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);

  try {
    const upstreamUrl = new URL("/dashboard/search", DASHBOARD_SERVICE_URL);
    upstreamUrl.searchParams.set("bs", query);
    upstreamUrl.searchParams.set("ms", query);

    const upstreamResponse = await fetch(upstreamUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain;q=0.9",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    const responseText = await upstreamResponse.text();
    let payload: unknown = responseText;

    try {
      payload = JSON.parse(responseText);
    } catch {
      // If parsing fails, fall back to raw text string
      payload = responseText;
    }

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          error: "Upstream service responded with an error",
          statusCode: upstreamResponse.status,
          payload,
        },
        { status: upstreamResponse.status }
      );
    }

    return NextResponse.json(
      {
        query,
        relatedProducts: pickRelatedProducts(payload) ?? [],
        payload,
      },
      { status: 200 }
    );
  } catch (error) {
    const isAbortError = (error as Error).name === "AbortError";
    return NextResponse.json(
      {
        error: isAbortError
          ? "The insights service timed out"
          : "Unable to contact the insights service",
      },
      { status: isAbortError ? 504 : 502 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
