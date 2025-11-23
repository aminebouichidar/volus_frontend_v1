import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserSubscription } from "@/lib/user-actions";
import { DashboardShell, FeatureGate } from "../components/DashboardShell";
import { determinePlanTier, hasPlanAccess } from "@/lib/plan-tiers";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Package, Plus, Sparkles, TrendingUp } from "lucide-react";

const MOCK_PRODUCTS = [
  {
    name: "VoltFlux Pro Blender",
    channels: "Amazon + TikTok Shop",
    velocity: "+12.4%",
    risk: "Inventory dips in CA",
  },
  {
    name: "Lyra Smart Mirror",
    channels: "DTC + Nordstrom",
    velocity: "Stable",
    risk: "Return rate 2.3%",
  },
  {
    name: "Arcadia Mobility Desk",
    channels: "Shopify + EU Retail",
    velocity: "-4.2%",
    risk: "Assembly complaints",
  },
];

export default async function ProductsPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const subscription = await getUserSubscription(session.user.id);
  const planTier = determinePlanTier(subscription);
  const unlockedPro = hasPlanAccess(planTier, "pro");

  return (
    <DashboardShell subscription={subscription} activeRoute="products">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900/40 to-black p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-300">Product graph</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Monitors & automations</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-300">
              Volus reconciles demand, pricing, and creative signals per SKU. Create monitors to route alerts to ops, growth, and finance.
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="rounded-full bg-white px-5 text-black hover:bg-gray-200">
              <Plus className="mr-2 h-4 w-4" /> New monitor
            </Button>
            <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
              Import CSV
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.name} className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-gray-400">{product.channels}</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{product.name}</h3>
                </div>
                <Package className="h-5 w-5 text-indigo-300" />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-200">
                <div>
                  <p className="text-xs text-gray-400">Velocity</p>
                  <p className={product.velocity.startsWith('-') ? 'text-rose-300' : 'text-emerald-300'}>{product.velocity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Risk</p>
                  <p>{product.risk}</p>
                </div>
              </div>
              <Button variant="ghost" className="mt-4 w-full justify-between text-sm text-indigo-200 hover:bg-white/5">
                View intelligence <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

  <FeatureGate unlocked={unlockedPro} label="Predictive inventory">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/30 to-black p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Sparkles className="h-6 w-6 text-purple-200" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-purple-200">Pro automation</p>
              <h2 className="text-2xl font-semibold text-white">Predictive allocation</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { label: "Safety stock", value: "15 days" },
              { label: "Lift potential", value: "+18%" },
              { label: "Confidence", value: "0.82" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>
      </FeatureGate>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Automation recipes</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Route insights anywhere</h2>
          </div>
          <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
            Browse library
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Escalate TikTok velocity",
              detail: "Auto-Slack #growth when velocity > +20% + low stock",
            },
            {
              title: "Pause ads",
              detail: "Send to Google Ads when margin risk flagged",
            },
            {
              title: "Brief CX",
              detail: "Trigger Zendesk macro for new complaint cluster",
            },
            {
              title: "Share with finance",
              detail: "Export weekly CSV to finance inbox",
            },
          ].map((recipe) => (
            <div key={recipe.title} className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-indigo-300" />
                <div>
                  <p className="font-semibold text-white">{recipe.title}</p>
                  <p className="text-xs text-gray-400">{recipe.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
