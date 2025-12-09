"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { LockedTile } from "@/components/ui/locked-tile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hasPlanAccess, PlanTier, planLabel } from "@/lib/plan-tiers";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8001/api").replace(/\/$/, "");

interface PredictionResult {
  product_id: number;
  predicted_demand_score: number;
  trend_direction: string;
  trend_strength: number;
  confidence: number;
  recommendation: string;
  recommendation_reason?: string;
  prediction_date?: string;
}

export function PredictionClient({ planTier }: { planTier: PlanTier }) {
  const [productId, setProductId] = useState("1");
  const [horizon, setHorizon] = useState("14");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [trending, setTrending] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unlockedPro = useMemo(() => hasPlanAccess(planTier, "pro"), [planTier]);
  const lockedCopy = `Unlock full predictions with ${planLabel("pro")}+`;

  useEffect(() => {
    void loadTrending();
  }, []);

  async function loadTrending() {
    try {
      const res = await fetch(`${API_BASE}/predictions/trending-predictions?limit=8`, { cache: "no-store" });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const payload = await res.json();
      // Accept either {predictions: []} or flat array
      const list = Array.isArray(payload) ? payload : payload.predictions || [];
      setTrending(list);
    } catch (err) {
      console.error(err);
      setTrending([
        { product_id: 1, predicted_demand_score: 68.5, trend_direction: "rising", trend_strength: 0.75, confidence: 0.82, recommendation: "buy_signal" },
        { product_id: 5, predicted_demand_score: 45.0, trend_direction: "stable", trend_strength: 0.4, confidence: 0.55, recommendation: "watch" },
        { product_id: 10, predicted_demand_score: 82.0, trend_direction: "rising", trend_strength: 0.88, confidence: 0.9, recommendation: "strong_buy" },
      ]);
    }
  }

  async function runPrediction() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/predictions/product/${productId}?horizon_days=${horizon}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const payload = await res.json();
      setPrediction(payload);
    } catch (err) {
      console.error(err);
      setError("Prediction service unavailable. Showing a sample.");
      setPrediction({
        product_id: Number(productId) || 1,
        predicted_demand_score: 72.4,
        trend_direction: "rising",
        trend_strength: 0.66,
        confidence: 0.8,
        recommendation: "buy_signal",
        recommendation_reason: "Sample trajectory based on historical lifts.",
      });
    } finally {
      setLoading(false);
    }
  }

  const renderPredictionCard = (item: PredictionResult, index: number) => {
    const unlocked = unlockedPro || index === 0;
    return (
      <LockedTile
        key={`${item.product_id}-${index}`}
        unlocked={unlocked}
        label="Unlock full prediction"
        description={lockedCopy}
        upgradeHref="/#pricing"
      >
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Product #{item.product_id}</p>
              <p className="text-lg font-semibold text-white">{unlocked ? "Projected demand" : "Locked"}</p>
            </div>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-100">
              {unlocked ? item.trend_direction : "Locked"}
            </Badge>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-200">
            <Metric label="Demand score" value={unlocked ? item.predicted_demand_score.toFixed(1) : "***"} />
            <Metric label="Confidence" value={unlocked ? `${(item.confidence * 100).toFixed(0)}%` : "**"} />
            <Metric label="Trend strength" value={unlocked ? item.trend_strength.toFixed(2) : "**"} />
            <Metric label="Recommendation" value={unlocked ? item.recommendation : "Unlock"} />
          </div>
          {unlocked && item.recommendation_reason && (
            <p className="mt-3 text-xs text-gray-300">{item.recommendation_reason}</p>
          )}
        </div>
      </LockedTile>
    );
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Single product</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <input
            value={productId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setProductId(e.target.value)}
            placeholder="Product ID"
            className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-indigo-400 focus:outline-none"
          />
          <input
            value={horizon}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setHorizon(e.target.value)}
            placeholder="Horizon days (e.g., 7, 14, 30)"
            className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-indigo-400 focus:outline-none"
          />
          <Button onClick={runPrediction} disabled={loading} className="bg-white text-black cursor-pointer hover:bg-gray-200">
            {loading ? "Predicting…" : "Run prediction"}
          </Button>
        </div>
        {error && <p className="mt-3 text-sm text-amber-200">{error}</p>}
        {prediction && <div className="mt-4">{renderPredictionCard(prediction, 0)}</div>}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Trending predictions</p>
            <p className="text-sm text-gray-300">Best movers we already modelled.</p>
          </div>
          {!unlockedPro && (
            <Link href="/#pricing" className="text-sm font-semibold text-indigo-200 underline underline-offset-4">
              Unlock all
            </Link>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {trending.map((item, idx) => renderPredictionCard(item, idx + 1))}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2">
      <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
