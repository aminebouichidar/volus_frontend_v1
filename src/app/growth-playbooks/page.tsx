"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, BarChart3, PackageSearch, Users, Activity, ArrowUpRight } from "lucide-react";

const PLAYBOOK_ROWS = [
  {
    title: "Launch a new SKU",
    steps: ["Validate demand via search + social", "Find competitor gaps", "Set alerts for reviews and stock"],
    cta: "Run SKU launch",
  },
  {
    title: "Fix sentiment slide",
    steps: ["Identify themes in negative reviews", "Quantify creator chatter", "Route fixes to CX + product"],
    cta: "Stabilize sentiment",
  },
  {
    title: "Dominate category",
    steps: ["Benchmark price + velocity", "Track top competitors", "Auto-report weekly to execs"],
    cta: "Build category brief",
  },
];

const KPIS = [
  { label: "Signals monitored", value: "12+ channels" },
  { label: "Alert latency", value: "<10 minutes" },
  { label: "Exports", value: "CSV, PDF, API" },
  { label: "Personas", value: "Solo, small team, enterprise" },
];

export default function GrowthPlaybooksPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const isDisabled = useMemo(() => !query.trim(), [query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery) return;
    router.push(`/insights?query=${encodeURIComponent(nextQuery)}`);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-indigo-950" />
        <div className="absolute top-12 left-1/4 w-[55vw] h-[55vw] bg-indigo-500/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[45vw] h-[45vw] bg-purple-500/15 blur-[200px]" />
      </div>

      <main className="relative z-10">
        <SiteNavbar variant="marketing" />

        <section className="px-4 pt-24 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-10">
            <header className="space-y-4">
              <Badge className="bg-purple-500/20 text-purple-100 border border-purple-400/30">Growth</Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                Growth Playbooks for every team size
              </h1>
              <p className="text-lg text-gray-300 sm:text-xl max-w-3xl">
                Practical, data-backed flows that work for solo operators, lean teams, and enterprise brands. Search any product or category to see what to do next.
              </p>
              <form onSubmit={handleSubmit} className="max-w-xl space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search a product, category, or competitor..."
                    className="flex-1 bg-black/60 border border-white/15 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 text-gray-100 rounded-full px-5 py-3 outline-none transition"
                    aria-label="Growth search"
                  />
                  <Button
                    type="submit"
                    disabled={isDisabled}
                    className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Get playbook
                  </Button>
                </div>
                <p className="text-sm text-gray-400">We route you to Insights and recommended actions.</p>
              </form>
            </header>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-6">
              <div className="flex items-center gap-2 text-white"><Sparkles className="h-5 w-5 text-indigo-200" /><span className="font-semibold">Recommended moves</span></div>
              <div className="grid gap-4 md:grid-cols-3">
                {PLAYBOOK_ROWS.map((play) => (
                  <div key={play.title} className="rounded-2xl border border-white/10 bg-black/50 p-4 flex flex-col">
                    <div className="flex items-center gap-2 text-white">
                      <BarChart3 className="h-4 w-4 text-indigo-200" />
                      <p className="text-sm font-semibold">{play.title}</p>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-gray-300">
                      {play.steps.map((step) => (
                        <li key={step} className="flex gap-2 text-xs">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs text-indigo-200 font-medium">
                      <ArrowUpRight className="h-4 w-4" /> {play.cta}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-700/30 via-purple-600/20 to-black p-6 space-y-4">
                <div className="flex items-center gap-2 text-white"><PackageSearch className="h-5 w-5 text-indigo-100" /><span className="font-semibold">Signals we watch</span></div>
                <p className="text-sm text-indigo-100/90">Marketplace rank velocity, ad saturation, search intent lift, creator chatter, reviews, and returns—rolled up into actions.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-white/90">
                  {["Amazon + Walmart", "TikTok + Instagram", "YouTube + Reddit", "Google + Pinterest", "Support & returns", "Inventory + pricing"].map((item) => (
                    <span key={item} className="rounded-xl bg-white/10 px-3 py-2 text-center">{item}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-2 text-white"><Users className="h-5 w-5 text-cyan-200" /><span className="font-semibold">Who it fits</span></div>
                  <p className="mt-2 text-sm text-gray-300">Solo operators get checklists; teams get routing; enterprises get governance.</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-200">
                    <span className="rounded-xl bg-white/10 px-3 py-2">Solo</span>
                    <span className="rounded-xl bg-white/10 px-3 py-2">Small team</span>
                    <span className="rounded-xl bg-white/10 px-3 py-2">Enterprise</span>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-700/30 to-black p-5 space-y-3">
                  <div className="flex items-center gap-2 text-white"><Activity className="h-5 w-5 text-emerald-100" /><span className="font-semibold">Metrics</span></div>
                  <div className="grid grid-cols-2 gap-3 text-sm text-emerald-50/90">
                    {KPIS.map((kpi) => (
                      <div key={kpi.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-100/80">{kpi.label}</p>
                        <p className="text-sm font-semibold text-white">{kpi.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
