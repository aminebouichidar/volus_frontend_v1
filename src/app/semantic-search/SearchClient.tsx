"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { LockedTile } from "@/components/ui/locked-tile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hasPlanAccess, PlanTier, planLabel } from "@/lib/plan-tiers";
import { Search } from "lucide-react";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8001/api").replace(/\/$/, "");

interface SearchResult {
  id: number;
  name: string;
  brand?: string | null;
  category?: string | null;
  trend_status?: string;
  trend_score?: number;
  momentum?: number;
  platforms_count?: number;
  first_seen?: string;
  last_updated?: string;
}

interface SearchResponse {
  results?: SearchResult[];
  results_count?: number;
  suggestions?: string[];
  query_interpreted?: string;
}

function mask(value?: number | string) {
  if (value === null || value === undefined) return "***";
  const str = typeof value === "number" ? value.toFixed(1) : value;
  if (str.length <= 2) return "***";
  return `${str.slice(0, 1)}**${str.slice(-1)}`;
}

export function SearchClient({ planTier }: { planTier: PlanTier }) {
  const [query, setQuery] = useState("wireless earbuds");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unlockedPro = useMemo(() => hasPlanAccess(planTier, "pro"), [planTier]);
  const lockedDescription = `Full details with ${planLabel("pro")}+`;

  useEffect(() => {
    void runSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runSearch(currentQuery: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/search/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentQuery, max_results: 20, use_semantic: true }),
      });
      if (!res.ok) throw new Error(`Search failed with ${res.status}`);
      const payload: SearchResponse = await res.json();
      setResults(payload.results ?? []);
      setSuggestions(payload.suggestions ?? []);
    } catch (err) {
      console.error(err);
      setError("Search unavailable right now. Showing cached preview.");
      setResults([
        { id: 1, name: "Sony WF-1000XM5", category: "electronics", trend_score: 85.5, momentum: 0.12, platforms_count: 4 },
        { id: 2, name: "AirPods Pro 2", category: "electronics", trend_score: 78.2, momentum: 0.08, platforms_count: 5 },
        { id: 3, name: "Anker Soundcore Sport", category: "electronics", trend_score: 64.4, momentum: 0.05, platforms_count: 3 },
        { id: 4, name: "Beats Fit Pro", category: "electronics", trend_score: 70.1, momentum: 0.09, platforms_count: 4 },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void runSearch(query);
  };

  return (
    <div className="space-y-12">
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-lg transition-all duration-500 group-hover:opacity-50" />
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2 rounded-full border border-white/10 bg-black/60 p-2 backdrop-blur-xl transition-all focus-within:border-indigo-500/50 focus-within:bg-black/80 focus-within:ring-1 focus-within:ring-indigo-500/50">
          <div className="pl-4 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search products (e.g., 'tiktok beauty', 'air fryer')"
            className="flex-1 bg-transparent px-2 py-3 text-base text-white placeholder:text-gray-500 focus:outline-none"
          />
          <Button 
            type="submit" 
            disabled={loading} 
            className="rounded-full bg-white px-8 py-6 text-base font-semibold text-black hover:bg-gray-200 transition-all"
          >
            {loading ? "Searching…" : "Search"}
          </Button>
        </form>
      </div>

      {error && <p className="text-center text-sm text-amber-200">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.slice(0, 12).map((result, idx) => {
          const unlocked = unlockedPro || idx < 3;
          return (
            <LockedTile
              key={result.id}
              unlocked={unlocked}
              label="Unlock full result"
              description={lockedDescription}
              upgradeHref="/#pricing"
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-white/20 hover:bg-white/[0.04]">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <p className="text-lg font-semibold text-white line-clamp-2 group-hover:text-indigo-200 transition-colors">{result.name}</p>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">{result.category ?? "General"}</p>
                  </div>
                  <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 shrink-0">
                    {unlocked ? (result.trend_status ?? "trend") : "Locked"}
                  </Badge>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-2">
                   <div className="rounded-xl bg-white/5 p-2 text-center">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Score</p>
                      <p className="text-sm font-mono text-white">{unlocked ? result.trend_score?.toFixed?.(1) ?? "—" : mask(result.trend_score)}</p>
                   </div>
                   <div className="rounded-xl bg-white/5 p-2 text-center">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Momentum</p>
                      <p className="text-sm font-mono text-emerald-400">{unlocked ? result.momentum?.toFixed?.(2) ?? "—" : mask(result.momentum ?? "*")}</p>
                   </div>
                   <div className="rounded-xl bg-white/5 p-2 text-center">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Sources</p>
                      <p className="text-sm font-mono text-cyan-400">{unlocked ? result.platforms_count ?? "—" : mask(result.platforms_count ?? "*")}</p>
                   </div>
                </div>
              </div>
            </LockedTile>
          );
        })}
      </div>

      {suggestions.length > 0 && (
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-4">Suggestions</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.slice(0, 6).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  void runSearch(suggestion);
                }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white hover:border-white/20"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
