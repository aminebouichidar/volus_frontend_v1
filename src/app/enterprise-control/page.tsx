"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Building2, Workflow, Globe2, ArrowUpRight, Sparkles } from "lucide-react";

const SIGNAL_GROUPS = [
  {
    title: "Market coverage",
    items: [
      "Amazon, Walmart, Target velocity",
      "Reddit, X, TikTok narrative shifts",
      "YouTube creator pushes and reviews",
      "Google + Pinterest intent lift",
    ],
  },
  {
    title: "Enterprise controls",
    items: [
      "Role-based workspaces with audit trails",
      "Alert routing to Slack/Teams/Webhooks",
      "Escalation policies + runbooks",
      "CSV + API exports for BI" ,
    ],
  },
  {
    title: "Risk & brand",
    items: [
      "Counterfeit and price scraping",
      "Warranty/returns anomaly detection",
      "Influencer/press sentiment risk",
      "Geo rollups for compliance",
    ],
  },
];

const PLAYBOOKS = [
  {
    title: "Global launch room",
    description: "Compare demand and supply by region before you spend. Auto-route alerts to local teams.",
    metric: "38 markets monitored",
  },
  {
    title: "Brand defense",
    description: "Detect counterfeit listings, MAP breaks, and negative viral threads before they spike.",
    metric: "<7 min alert latency",
  },
  {
    title: "Exec-ready reporting",
    description: "Weekly PDF + CSV drops with insights, forecasts, and recommended actions for each BU.",
    metric: "2h saved per lead",
  },
];

export default function EnterpriseControlPage() {
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
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-indigo-950" />
        <div className="absolute top-10 left-1/3 w-[50vw] h-[50vw] bg-purple-600/20 blur-[170px]" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-cyan-500/10 blur-[200px]" />
      </div>

      <main className="relative z-10">
        <SiteNavbar variant="marketing" />

        <section className="px-4 pt-24 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-10">
            <header className="space-y-4">
              <Badge className="bg-indigo-500/20 text-indigo-100 border border-indigo-400/30">Enterprise</Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                Enterprise Control Room
              </h1>
              <p className="text-lg text-gray-300 sm:text-xl max-w-3xl">
                One surface for brand health, market shifts, and operational risk. Built for multi-brand retailers and global manufacturers who need answers fast.
              </p>
              <form onSubmit={handleSubmit} className="max-w-xl space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search a product, brand, or market..."
                    className="flex-1 bg-black/60 border border-white/15 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 text-gray-100 rounded-full px-5 py-3 outline-none transition"
                    aria-label="Enterprise search"
                  />
                  <Button
                    type="submit"
                    disabled={isDisabled}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Search intelligence
                  </Button>
                </div>
                <p className="text-sm text-gray-400">Routes to Insights with consolidated signals.</p>
              </form>
            </header>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <Shield className="h-5 w-5 text-emerald-200" />
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Signals</p>
                </div>
                <h2 className="text-2xl font-semibold">Full-stack market intelligence</h2>
                <p className="text-sm text-gray-300">Coverage across marketplaces, social, search, support, and logistics so your teams can act before trends hit revenue.</p>
                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  {SIGNAL_GROUPS.map((group) => (
                    <div key={group.title} className="rounded-2xl border border-white/10 bg-black/50 p-4 space-y-2">
                      <p className="font-semibold text-white">{group.title}</p>
                      <ul className="space-y-2 text-gray-300">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-2 text-xs">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/30 via-purple-500/20 to-black p-5">
                  <div className="flex items-center gap-2 text-white"><Building2 className="h-5 w-5 text-indigo-100" /><span className="font-semibold">Enterprise-grade</span></div>
                  <p className="mt-2 text-sm text-indigo-100/90">SSO, SCIM, audit logs, and data export controls available on Enterprise.</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/90">
                    <div className="rounded-xl bg-white/10 px-3 py-2">SOC2 in progress</div>
                    <div className="rounded-xl bg-white/10 px-3 py-2">SLA: 30-min alerting</div>
                    <div className="rounded-xl bg-white/10 px-3 py-2">EU + US data residency</div>
                    <div className="rounded-xl bg-white/10 px-3 py-2">Dedicated TAM optional</div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-white"><Workflow className="h-5 w-5 text-cyan-200" /><span className="font-semibold">Automations</span></div>
                  <p className="text-sm text-gray-300">Route events by business unit or region; attach runbooks for operations and brand teams.</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-200">
                    {["Slack", "Teams", "Email", "Webhook", "PagerDuty", "CSV weekly"].map((dest) => (
                      <span key={dest} className="rounded-full bg-white/10 px-3 py-1">{dest}</span>
                    ))}
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Configure routing
                  </Button>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-700/30 to-black p-5 space-y-2">
                  <div className="flex items-center gap-2 text-white"><Globe2 className="h-5 w-5 text-emerald-100" /><span className="font-semibold">Global rollups</span></div>
                  <p className="text-sm text-emerald-50/90">Country, region, and channel pivots with export-ready CSVs.</p>
                  <div className="text-xs text-emerald-100/80">Prebuilt: NA, EU, LATAM, APAC views</div>
                </div>
              </div>
            </div>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <div className="flex items-center gap-2 text-white"><Sparkles className="h-5 w-5 text-indigo-200" /><span className="font-semibold">Executive playbooks</span></div>
              <div className="grid gap-4 md:grid-cols-3">
                {PLAYBOOKS.map((play) => (
                  <div key={play.title} className="rounded-2xl border border-white/10 bg-black/50 p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{play.title}</p>
                      <p className="mt-2 text-sm text-gray-300">{play.description}</p>
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-indigo-200">
                      <ArrowUpRight className="h-4 w-4" />
                      {play.metric}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
