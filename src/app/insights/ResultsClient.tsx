"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Activity, ArrowUpRight, BarChart3, Flame, Gauge, Sparkles } from "lucide-react";

interface InsightsApiResponse {
  query: string;
  relatedProducts: unknown[];
  payload: unknown;
  error?: string;
}

interface InsightsResultsProps {
  initialQuery: string;
}

type FetchState = "idle" | "loading" | "success" | "error";

type RawProduct = Record<string, unknown> & {
  data?: Record<string, unknown>;
};

interface NormalizedProduct {
  id: string;
  name: string;
  category: string;
  trendScore: number | null;
  urgencyScore: number | null;
  urgencyLabel?: string;
  recommendation?: string;
  marketSaturation?: string;
  profitPotential?: string;
  platforms: string[];
  platformCount?: number | null;
  lastUpdated?: string;
  pricePoints: { label: string; value: string | null }[];
  signals: { label: string; value: string }[];
  raw: RawProduct;
}

const toRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : {};

const parseMaybeJson = (value: unknown): unknown => {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const safeNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const numeric = Number(value.replace(/[%,£$]/g, ""));
    if (Number.isFinite(numeric)) {
      return numeric;
    }
  }
  return null;
};

const normalizeProduct = (entry: unknown, index: number): NormalizedProduct | null => {
  const parsed = parseMaybeJson(entry);
  if (!parsed || typeof parsed !== "object") {
    return null;
  }

  const product = parsed as RawProduct;
  const data = toRecord(product.data);

  const name =
    (data.amazon_bs_title as string | undefined) ||
    (data.amazon_ms_title as string | undefined) ||
    "Untitled product";

  const category = (product.category as string | undefined) || "General";
  const trendScore = safeNumber(data.trend_score);
  const urgencyScore = safeNumber(data.urgency_score);
  const platforms = typeof data.platforms === "string"
    ? data.platforms.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  const pricePoints = [
    { label: "Amazon Best Seller", value: data.amazon_bs_price as string | null },
    { label: "Amazon Movers", value: data.amazon_ms_price as string | null },
  ];

  const signals = [
    { label: "Market saturation", value: (data.market_saturation as string) || "—" },
    { label: "Profit potential", value: (data.profit_potential as string) || "—" },
    { label: "Action plan", value: (data.action_plan as string) || "No plan yet" },
  ];

  return {
    id: String(product.id ?? `${index}-${name}`),
    name,
    category,
    trendScore,
    urgencyScore,
    urgencyLabel: data.urgency_label as string | undefined,
    recommendation: data.recommendation as string | undefined,
    marketSaturation: data.market_saturation as string | undefined,
    profitPotential: data.profit_potential as string | undefined,
    platforms,
    platformCount: safeNumber(data.platform_count),
    lastUpdated: data.last_updated as string | undefined,
    pricePoints,
    signals,
    raw: product,
  };
};

const getTrendTheme = (score: number | null) => {
  if (score === null) {
    return {
      gradient: "from-slate-900/90 via-slate-900/70 to-slate-900/40",
      ring: "border-white/10",
      badge: "bg-slate-800/70 text-slate-100",
      label: "Unknown",
    };
  }

  if (score >= 80) {
    return {
      gradient: "from-emerald-500/30 via-emerald-500/10 to-emerald-500/5",
      ring: "border-emerald-500/30",
      badge: "bg-emerald-500/20 text-emerald-200",
      label: "Peaking",
    };
  }

  if (score >= 60) {
    return {
      gradient: "from-indigo-500/30 via-indigo-500/10 to-indigo-500/5",
      ring: "border-indigo-500/30",
      badge: "bg-indigo-500/15 text-indigo-200",
      label: "Growing",
    };
  }

  if (score >= 40) {
    return {
      gradient: "from-amber-500/30 via-amber-500/10 to-amber-500/5",
      ring: "border-amber-500/30",
      badge: "bg-amber-500/15 text-amber-100",
      label: "Emerging",
    };
  }

  return {
    gradient: "from-rose-600/30 via-rose-600/10 to-rose-600/5",
    ring: "border-rose-500/40",
    badge: "bg-rose-500/20 text-rose-100",
    label: "Declining",
  };
};

const encodeProductPayload = (product: RawProduct) => {
  try {
    const json = JSON.stringify(product);
    if (typeof window === "undefined") {
      return Buffer.from(json).toString("base64");
    }
    return window.btoa(unescape(encodeURIComponent(json)));
  } catch {
    return null;
  }
};

export function InsightsResults({ initialQuery }: InsightsResultsProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(initialQuery);
  const [state, setState] = useState<FetchState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<InsightsApiResponse | null>(null);
  const activeController = useRef<AbortController | null>(null);

  const fetchInsights = useCallback(async (query: string) => {
    if (!query) {
      setState("idle");
      setError(null);
      setData(null);
      return;
    }

    activeController.current?.abort();
    const controller = new AbortController();
    activeController.current = controller;

    setState("loading");
    setError(null);

    try {
      const response = await fetch(`/api/insights?query=${encodeURIComponent(query)}`, {
        method: "GET",
        signal: controller.signal,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "The insights service returned an error.");
      }

      setData(payload);
      setState("success");
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        return;
      }
      setError((err as Error).message || "Unable to fetch related products.");
      setState("error");
    }
  }, []);

  useEffect(() => {
    setInputValue(initialQuery);
    fetchInsights(initialQuery);

    return () => {
      activeController.current?.abort();
    };
  }, [initialQuery, fetchInsights]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError("Please enter a product name.");
      setState("error");
      return;
    }
    if (trimmed === initialQuery) {
      fetchInsights(trimmed);
      return;
    }
    router.push(`/insights?query=${encodeURIComponent(trimmed)}`);
  };

  const normalizedProducts = useMemo(() => {
    if (!data?.relatedProducts?.length) return [];
    return data.relatedProducts
      .map((entry, index) => normalizeProduct(entry, index))
      .filter((product): product is NormalizedProduct => Boolean(product));
  }, [data?.relatedProducts]);

  const openProductDetail = (product: NormalizedProduct) => {
    const encoded = encodeProductPayload(product.raw);
    if (!encoded) return;
    router.push(`/insights/product?payload=${encodeURIComponent(encoded)}`);
  };
  const prettyPayload = useMemo(() => {
    if (!data?.payload) {
      return "{}";
    }
    try {
      return JSON.stringify(data.payload, null, 2);
    } catch {
      return String(data.payload);
    }
  }, [data]);

  return (
    <div className="space-y-8 rounded-3xl border border-white/10 bg-zinc-900/60 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="insights-search" className="text-sm font-medium text-gray-300">
          Run another query
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="insights-search"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Enter product name..."
            className="flex-1 rounded-full border border-white/10 bg-black/40 px-5 py-3 text-sm text-white placeholder:text-gray-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          />
          <Button
            type="submit"
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:from-indigo-500 hover:to-purple-500"
          >
            Search
          </Button>
        </div>
      </form>

      {!initialQuery && state === "idle" && (
        <p className="rounded-2xl border border-dashed border-white/10 bg-black/30 p-6 text-sm text-gray-300">
          Enter a product name on the landing page or above to see related products.
        </p>
      )}

      {state === "loading" && (
        <div className="rounded-2xl border border-white/5 bg-black/40 p-6 text-center">
          <p className="text-sm text-gray-300">Scanning platforms for related products…</p>
        </div>
      )}

      {state === "error" && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
          {error}
        </div>
      )}

      {state === "success" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Related products</h2>
            <p className="text-sm text-gray-400">
              Based on the latest response from our dashboard service.
            </p>
          </div>

          {normalizedProducts.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {normalizedProducts.map((product) => {
                const trendTheme = getTrendTheme(product.trendScore);
                return (
                  <article
                    key={product.id}
                    className={cn(
                      "group relative flex flex-col justify-between rounded-3xl border bg-gradient-to-br p-6 transition-all duration-300 hover:-translate-y-1",
                      trendTheme.gradient,
                      trendTheme.ring
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.45em] text-white/60">
                          {product.category}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">
                          {product.name}
                        </h3>
                        {product.recommendation && (
                          <p className="mt-2 text-sm text-white/80">
                            {product.recommendation}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-white/70">Trend score</span>
                        <p className="text-3xl font-semibold text-white">
                          {product.trendScore !== null ? product.trendScore : "—"}
                        </p>
                        <Badge className={cn("mt-1", trendTheme.badge)}>
                          {trendTheme.label}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.urgencyLabel && (
                        <Badge variant="secondary" className="bg-white/10 text-white">
                          <Flame className="size-3" /> {product.urgencyLabel}
                        </Badge>
                      )}
                      {product.marketSaturation && (
                        <Badge className="bg-black/30 text-white">
                          <Gauge className="size-3" /> {product.marketSaturation}
                        </Badge>
                      )}
                      {product.profitPotential && (
                        <Badge className="bg-black/30 text-white">
                          <Sparkles className="size-3" /> {product.profitPotential}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-6 grid gap-4 text-sm text-white/80 md:grid-cols-2">
                      <div className="space-y-2 rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/60">Pricing</p>
                        {product.pricePoints.map((price) => (
                          <div key={price.label} className="flex justify-between text-sm">
                            <span className="text-white/60">{price.label}</span>
                            <span className="font-medium text-white">
                              {price.value ?? "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2 rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/60">Signals</p>
                        {product.signals.map((signal) => (
                          <div key={signal.label} className="text-sm text-white">
                            <span className="text-white/60">{signal.label}:</span> {signal.value}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2 text-xs text-white/70">
                        {product.platformCount && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1">
                            <Activity className="size-3" /> {product.platformCount} platforms
                          </span>
                        )}
                        {product.platforms.slice(0, 3).map((platform) => (
                          <span
                            key={platform}
                            className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1"
                          >
                            <BarChart3 className="size-3" /> {platform}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="secondary"
                        className="group/cta rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
                        onClick={() => openProductDetail(product)}
                      >
                        View insights
                        <ArrowUpRight className="ml-2 size-4 transition-transform group-hover/cta:translate-x-0.5" />
                      </Button>
                    </div>

                    {product.lastUpdated && (
                      <p className="mt-4 text-xs text-white/40">
                        Updated {new Date(product.lastUpdated).toLocaleString()}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/10 bg-black/30 p-6 text-sm text-gray-300">
              No related products were returned for this query. Try refining the product name or checking the raw response below.
            </p>
          )}

          <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Raw response</h3>
              <span className="text-xs text-gray-400">Debug only</span>
            </div>
            <pre className="max-h-96 overflow-auto rounded-xl bg-black/60 p-4 text-xs text-gray-200">
              {prettyPayload}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
