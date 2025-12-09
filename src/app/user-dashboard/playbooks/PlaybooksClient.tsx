"use client";

import { useMemo } from "react";
import { LockedTile } from "@/components/ui/locked-tile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hasPlanAccess, PlanTier } from "@/lib/plan-tiers";
import { TrendingUp, ArrowRight, Lock } from "lucide-react";

export function PlaybooksClient({ planTier }: { planTier: PlanTier }) {
  const unlockedPro = useMemo(() => hasPlanAccess(planTier, "pro"), [planTier]);

  const playbooks = [
    {
      title: "Q4 Holiday Surge",
      category: "Seasonal",
      difficulty: "Intermediate",
      duration: "2 weeks",
      locked: false,
    },
    {
      title: "Competitor Price Undercut",
      category: "Defense",
      difficulty: "Advanced",
      duration: "Ongoing",
      locked: false,
    },
    {
      title: "New Market Entry: EU",
      category: "Expansion",
      difficulty: "Hard",
      duration: "3 months",
      locked: true,
    },
    {
      title: "Influencer Campaign ROI",
      category: "Marketing",
      difficulty: "Intermediate",
      duration: "1 month",
      locked: true,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Growth Playbooks</p>
            <h2 className="text-2xl font-semibold text-white">Strategy Library</h2>
            <p className="text-sm text-gray-300">Actionable guides to boost revenue and market share.</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Request Playbook
          </Button>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {playbooks.map((playbook, i) => (
          <div key={i} className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-6 transition-all hover:border-emerald-500/50 hover:bg-white/5">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Badge variant="outline" className="border-white/10 text-gray-400">
                  {playbook.category}
                </Badge>
                {playbook.locked && !unlockedPro && (
                  <Lock className="h-4 w-4 text-gray-500" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400">
                {playbook.title}
              </h3>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span>{playbook.difficulty}</span>
                <span>•</span>
                <span>{playbook.duration}</span>
              </div>
            </div>
            
            <div className="mt-6">
              {playbook.locked && !unlockedPro ? (
                <Button variant="outline" className="w-full border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white">
                  Upgrade to Unlock
                </Button>
              ) : (
                <Button variant="ghost" className="w-full justify-between p-0 text-emerald-400 hover:bg-transparent hover:text-emerald-300">
                  Start Guide <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <LockedTile
        unlocked={unlockedPro}
        label="Unlock Advanced Strategies"
        description="Get access to our full library of 50+ expert growth strategies."
        upgradeHref="/#pricing"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <h3 className="text-xl font-semibold text-white">Pro-Level Analytics Integration</h3>
          <p className="mx-auto mt-2 max-w-md text-gray-400">
            Connect your sales data to automatically recommend the best playbooks for your current growth stage.
          </p>
        </div>
      </LockedTile>
    </div>
  );
}
