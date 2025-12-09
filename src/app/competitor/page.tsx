"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Swords, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    title: "Market Share Mapping",
    description: "Visualize exactly how much category revenue your competitors are capturing week over week.",
    icon: TrendingUp,
  },
  {
    title: "Ad Spend Spy",
    description: "Reverse-engineer their paid strategy. See which keywords they bid on and which creatives they run.",
    icon: Target,
  },
  {
    title: "Battlecards",
    description: "Auto-generated one-pagers comparing your product vs theirs on features, price, and sentiment.",
    icon: Swords,
  },
];

export default function CompetitorAnalysisPage() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-blue-950/30" />
        <div className="absolute bottom-20 left-10 w-[50vw] h-[50vw] bg-blue-600/10 blur-[180px]" />
      </div>

      <main className="relative z-10">
        <SiteNavbar variant="marketing" />

        <section className="px-4 pt-24 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-12">
            <header className="space-y-6 text-center max-w-3xl mx-auto">
              <Badge className="bg-blue-500/20 text-blue-100 border border-blue-400/30">Competitor Intelligence</Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                Know their next move <br /> <span className="text-blue-200">before they make it</span>
              </h1>
              <p className="text-lg text-gray-300 sm:text-xl">
                Stop guessing. See your competitors&apos; sales, ad spend, and customer complaints in one dashboard.
              </p>
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3 pt-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Enter a competitor brand or product..."
                    className="flex-1 bg-black/60 border border-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 text-gray-100 rounded-full px-5 py-3 outline-none transition"
                    aria-label="Competitor search"
                  />
                  <Button
                    type="submit"
                    disabled={isDisabled}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Analyze rival
                  </Button>
                </div>
                <p className="text-sm text-gray-400">Compare up to 5 competitors instantly.</p>
              </form>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:bg-white/10">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20" />
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-xl">
                  <h2 className="text-2xl font-semibold text-white">Ready to steal market share?</h2>
                  <p className="text-gray-300">
                    Our users see an average of 18% revenue lift by identifying competitor stock-outs and capitalizing on their negative reviews.
                  </p>
                  <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6">
                    Start free comparison <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 w-12 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs text-gray-400">
                      Logo
                    </div>
                  ))}
                  <div className="h-12 w-12 rounded-full border-2 border-black bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                    +400
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
