"use client";

import { useMemo } from "react";
import { LockedTile } from "@/components/ui/locked-tile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hasPlanAccess, PlanTier } from "@/lib/plan-tiers";
import { AlertTriangle, CheckCircle2, Globe } from "lucide-react";

export function BrandClient({ planTier }: { planTier: PlanTier }) {
  const unlockedPro = useMemo(() => hasPlanAccess(planTier, "pro"), [planTier]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-red-200">Brand Protection</p>
            <h2 className="text-2xl font-semibold text-white">Risk Monitor</h2>
            <p className="text-sm text-gray-300">Real-time scan for counterfeits and unauthorized sellers.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              Export Report
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              New Scan
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-medium uppercase">High Risk</span>
            </div>
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-xs text-gray-500">Potential counterfeits detected</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium uppercase">Unauthorized Sellers</span>
            </div>
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-xs text-gray-500">Across Amazon & eBay</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-medium uppercase">Takedowns</span>
            </div>
            <p className="text-2xl font-bold text-white">8</p>
            <p className="text-xs text-gray-500">Successfully removed this month</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <LockedTile
          unlocked={unlockedPro}
          label="Unlock detailed findings"
          description="Pro plan required to view specific listings and take action."
          upgradeHref="/#pricing"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 h-full">
            <h3 className="text-lg font-semibold text-white mb-4">Detected Incidents</h3>
            <div className="space-y-3">
              {[
                { title: "Fake listing on eBay", severity: "High", date: "2h ago", status: "Pending" },
                { title: "Logo misuse on Instagram", severity: "Medium", date: "5h ago", status: "Investigating" },
                { title: "Unauthorized reseller on Walmart", severity: "Low", date: "1d ago", status: "Resolved" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${item.severity === 'High' ? 'bg-red-500' : item.severity === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-white/10 text-gray-300">{item.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </LockedTile>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-900/20 to-black p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Automated Takedowns</h3>
            <p className="text-sm text-gray-300 mb-4">
              Connect your brand registry to enable auto-takedowns for high-confidence matches.
            </p>
            <Button variant="outline" className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10" disabled={!unlockedPro}>
              Configure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
