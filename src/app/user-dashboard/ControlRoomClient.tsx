'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Globe2,
  Layers,
  PlugZap,
  Radar,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { DashboardShell, FeatureGate } from "./components/DashboardShell";
import { determinePlanTier, hasPlanAccess } from "@/lib/plan-tiers";
import { SubscriptionInfo } from "@/types/subscription";
import {
  DASHBOARD_SUMMARY_FALLBACK,
  DashboardSummaryPayload,
  SummaryMetric,
  ServiceHealth,
  AlertItem,
} from "@/lib/dashboard-summary";

interface DashboardClientProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  subscription: SubscriptionInfo | null;
}

export default function ControlRoomClient({ user, subscription }: DashboardClientProps) {
  const [summary, setSummary] = useState<DashboardSummaryPayload>(DASHBOARD_SUMMARY_FALLBACK);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const planTier = determinePlanTier(subscription);
  const unlockedPro = hasPlanAccess(planTier, "pro");
  const unlockedEnterprise = hasPlanAccess(planTier, "enterprise");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/dashboard/summary", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to reach FastAPI service");
        }
        const payload = (await response.json()) as DashboardSummaryPayload;
  setSummary({ ...DASHBOARD_SUMMARY_FALLBACK, ...payload });
        setSummaryError(null);
      })
      .catch(() => {
        setSummaryError("We couldn’t refresh the live summary. Showing cached values.");
      })
      .finally(() => {
        setLoadingSummary(false);
      });

    return () => controller.abort();
  }, []);

  const heroHighlights = useMemo(
    () => [
      {
        title: "Search & sentiment",
        description: "Volus stitched 150M+ reviews, comments, and queries into one confidence score for you today.",
        icon: Sparkles,
      },
      {
        title: "Price + supply",
        description: "We simulated 2,900 checkout journeys to surface hidden shipping fees and stock leaks.",
        icon: TrendingUp,
      },
      {
        title: "Creator & media",
        description: "Live creator graph clusters trending stories so you can brief the growth team in minutes.",
        icon: Radar,
      },
    ],
    []
  );

  const trackedProducts = [
    {
      title: "VoltFlux Pro Blender",
      health: "+9.4% sentiment",
      channel: "Amazon + TikTok",
      risk: "HeatWave Appliances running flash sale",
    },
    {
      title: "Lyra Smart Mirror",
      health: "Stable",
      channel: "DTC + Nordstrom",
      risk: "Inventory < 12 days of cover",
    },
    {
      title: "Arcadia Mobility Desk",
      health: "-4.2% week-over-week",
      channel: "Shopify + EMEA retailers",
      risk: "Assembly complaints trending in Reddit",
    },
  ];

  const signalStreams = summary.signals ?? DASHBOARD_SUMMARY_FALLBACK.signals ?? [];

  const handleUpgrade = () => {
    window.location.href = "/#pricing";
  };

  return (
    <DashboardShell subscription={subscription} activeRoute="overview">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-black p-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Live control room</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Hi {user.name?.split(" ")[0] ?? "there"}, your market is moving.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-gray-300">
              FastAPI is streaming every marketplace, social, and ops pulse into this workspace. Share these modules with your brand, ops, and finance teams or trigger automations directly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-white px-6 text-black hover:bg-gray-200">
                <Link href="/user-dashboard/products">
                  Add product monitor
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
                <Link href="/user-dashboard/competitors">Launch competitor recon</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-4">
            {heroHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
                  <div className="flex p-2 h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-200">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  {(summary.metrics ?? DASHBOARD_SUMMARY_FALLBACK.metrics ?? []).map((metric: SummaryMetric) => (
          <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">{metric.label}</p>
            <div className="mt-4 flex items-end justify-between">
              <h3 className="text-3xl font-semibold text-white">{metric.value}</h3>
              {metric.delta !== undefined && (
                <span className={metric.trend === 'down' ? 'text-red-400 text-sm' : 'text-emerald-400 text-sm'}>
                  {metric.trend === 'down' ? '▼' : '▲'} {Math.abs(metric.delta)}%
                </span>
              )}
            </div>
            {loadingSummary && <p className="mt-2 text-xs text-gray-500">Refreshing…</p>}
          </div>
        ))}
      </section>

      {summaryError && (
        <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <p>{summaryError}</p>
          </div>
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Live intelligence feed</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Signals you should brief today</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              onClick={() => window.location.reload()}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />Refresh
            </Button>
          </div>
          <div className="mt-6 space-y-4">
            {signalStreams.map((signal) => (
              <div key={`${signal.channel}-${signal.timestamp}`} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Globe2 className="h-4 w-4" />
                    {signal.channel}
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-300">{signal.weight}</span>
                  </div>
                  <p className="text-xs text-gray-500">{signal.timestamp}</p>
                </div>
                <p className="mt-2 text-sm text-white">{signal.insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xls border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Action center</p>
            <div className="mt-4 grid gap-3">
              {[
                { label: "Spin up new monitor", detail: "Track a product or keyword across every channel", href: "/user-dashboard/products" },
                { label: "Run competitor scan", detail: "Replay last 24h ad spend + price shifts", href: "/user-dashboard/competitors" },
                { label: "Download intelligence", detail: "Export signals for finance & ops", href: "/api/insights?query=portfolio" },
              ].map((action) => (
                <Link key={action.label} href={action.href} className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm transition hover:border-white/30">
                  <div>
                    <p className="font-semibold text-white">{action.label}</p>
                    <p className="text-xs text-gray-400">{action.detail}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-indigo-300 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/40 to-black p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-300">API health</p>
            <div className="mt-4 space-y-3">
              {(summary.services ?? DASHBOARD_SUMMARY_FALLBACK.services ?? []).map((service: ServiceHealth) => (
                <div key={service.name} className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <PlugZap className="h-4 w-4 text-indigo-300" />
                    <div>
                      <p className="font-semibold text-white">{service.name}</p>
                      <p className="text-xs text-gray-400">Latency {service.latencyMs} ms</p>
                    </div>
                  </div>
                  <span className={service.status === 'healthy' ? 'rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300' : 'rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-200'}>
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <p>Tracked products</p>
            <Link href="/user-dashboard/products" className="text-indigo-300">
              Manage all
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {trackedProducts.map((product) => (
              <div key={product.title} className="rounded-2xl border border-white/5 bg-black/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{product.title}</p>
                  <span className="text-xs text-emerald-300">{product.health}</span>
                </div>
                <p className="text-xs text-gray-400">{product.channel}</p>
                <p className="mt-2 text-sm text-gray-300">{product.risk}</p>
              </div>
            ))}
          </div>
        </div>

        <FeatureGate unlocked={unlockedPro} label="Competitor heatmaps" onUpgrade={handleUpgrade}>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-900/40 to-black p-6">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-cyan-200" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">Pro labs</p>
                <h3 className="text-xl font-semibold text-white">Competitor heatmap</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-200">
              Geo-weighted share of voice across Amazon, TikTok Shop, and regional retailers. Export to share with sales.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-200">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <p className="text-xs text-gray-400">Watchlist</p>
                <p className="text-lg font-semibold text-white">12 brands</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <p className="text-xs text-gray-400">New alerts</p>
                <p className="text-lg font-semibold text-white">4 today</p>
              </div>
            </div>
          </div>
        </FeatureGate>

        <FeatureGate unlocked={unlockedEnterprise} label="Ad spend recon" onUpgrade={handleUpgrade}>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-rose-900/40 to-black p-6">
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-rose-200" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-rose-200">Enterprise</p>
                <h3 className="text-xl font-semibold text-white">Paid media dossier</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-200">
              Blended spend estimates across Meta, Google, Retail Media + creative fingerprinting to spot recycled campaigns.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-200">
              <li>• 38 creatives detected last 48h</li>
              <li>• Shelf share impact forecast ready</li>
              <li>• Auto brief for leadership deck</li>
            </ul>
          </div>
        </FeatureGate>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Latest alerts</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">Keep ops + growth synced</h3>
          </div>
          <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
            <Link href="/user-dashboard/profile">Configure notifications</Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(summary.alerts ?? DASHBOARD_SUMMARY_FALLBACK.alerts ?? []).map((alert: AlertItem) => (
            <div key={alert.title} className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em]">
                <Activity className="h-4 w-4 text-amber-200" />
                <span className="text-amber-200">{alert.severity}</span>
              </div>
              <p className="mt-3 text-base font-semibold text-white">{alert.title}</p>
              <p className="mt-2 text-sm text-gray-300">{alert.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
