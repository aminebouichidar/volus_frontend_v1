import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserSubscription } from "@/lib/user-actions";
import { DashboardShell, FeatureGate } from "../components/DashboardShell";
import { determinePlanTier, hasPlanAccess } from "@/lib/plan-tiers";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Globe, Map, Radar, UserCheck } from "lucide-react";

const COMPETITOR_SIGNALS = [
  {
    brand: "BlitzGear",
    highlight: "Dropped average ASP by 12% in DE",
    impact: "Margin pressure",
  },
  {
    brand: "NovaBlend",
    highlight: "Influencer surge on TikTok Shop",
    impact: "Share-of-voice risk",
  },
  {
    brand: "Kepler Living",
    highlight: "Retail media spend up 28%",
    impact: "Ad auction heat",
  },
];

export default async function CompetitorsPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const subscription = await getUserSubscription(session.user.id);
  const planTier = determinePlanTier(subscription);
  const unlockedPro = hasPlanAccess(planTier, "pro");
  const unlockedEnterprise = hasPlanAccess(planTier, "enterprise");

  return (
    <DashboardShell subscription={subscription} activeRoute="competitors">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-900/40 to-black p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">Recon</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Monitor the entire category</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-200">
              Map competitor launches, pricing shocks, and creative rotation in one view. Enterprise unlocks ad spend reconstructions.
            </p>
          </div>
          <Button className="rounded-full bg-white px-5 text-black hover:bg-gray-100">
            Build watchlist
          </Button>
        </div>
      </section>

  <FeatureGate unlocked={unlockedPro} label="Competitor streams">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Signals</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">Live competitor feed</h2>
            </div>
            <Button variant="outline" size="sm" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
              Export CSV
            </Button>
          </div>
          <div className="mt-6 space-y-4">
            {COMPETITOR_SIGNALS.map((item) => (
              <div key={item.brand} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500">{item.brand}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{item.highlight}</p>
                  </div>
                  <Radar className="h-5 w-5 text-cyan-200" />
                </div>
                <p className="mt-3 text-sm text-gray-300">Impact: {item.impact}</p>
                <Button variant="ghost" className="mt-4 w-full justify-between text-sm text-cyan-200 hover:bg-white/5">
                  Open dossier <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      </FeatureGate>

  <FeatureGate unlocked={unlockedEnterprise} label="Ad spend recon">
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-amber-900/30 to-black p-6">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-amber-200" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-amber-200">Media map</p>
                <h2 className="text-2xl font-semibold text-white">Ad spend reconstruction</h2>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-200">
              AI-estimated budgets across Meta, Google, Amazon, and TikTok with daily creative fingerprints.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                { label: "Tracked brands", value: "28" },
                { label: "Detected creatives", value: "142" },
                { label: "Auction volatility", value: "High" },
                { label: "Confidence", value: "0.78" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-rose-900/30 to-black p-6">
            <div className="flex items-center gap-3">
              <Map className="h-6 w-6 text-rose-200" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-rose-200">Field intel</p>
                <h2 className="text-2xl font-semibold text-white">Store & geo coverage</h2>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-gray-200">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <span>Regions synced</span>
                <span>14</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <span>Store audits</span>
                <span>392 / week</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <span>Field insights</span>
                <span>+18% WoW</span>
              </div>
            </div>
          </div>
        </section>
      </FeatureGate>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Brief your team</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Send compiled intelligence</h2>
          </div>
          <Button variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
            Share deck
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { title: "Ops", detail: "Stock imbalance + compliance alerts" },
            { title: "Growth", detail: "Live creative turnover + spend" },
            { title: "Sales", detail: "Retailer promotions + price erosion" },
          ].map((team) => (
            <div key={team.title} className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-indigo-200" />
                <div>
                  <p className="font-semibold text-white">{team.title}</p>
                  <p className="text-xs text-gray-400">{team.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
