"use client";

import { useEffect, useMemo, useState } from "react";
import { LockedTile } from "@/components/ui/locked-tile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hasPlanAccess, PlanTier, planLabel } from "@/lib/plan-tiers";
import { Bell, Activity, ShieldCheck, Zap, Sparkles } from "lucide-react";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8001/api").replace(/\/$/, "");

interface MonitoringPreset {
  sources: string[];
  description: string;
  recommended_for?: string;
}

interface AlertsResponse {
  alerts: {
    id: number;
    title: string;
    message: string;
    severity: string;
    created_at: string;
  }[];
}

export function MonitoringClient({ planTier }: { planTier: PlanTier }) {
  const unlockedPro = useMemo(() => hasPlanAccess(planTier, "pro"), [planTier]);
  const unlockedEnterprise = useMemo(() => hasPlanAccess(planTier, "enterprise"), [planTier]);
  const [presets, setPresets] = useState<Record<string, MonitoringPreset>>({});
  const [alerts, setAlerts] = useState<AlertsResponse["alerts"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [presetRes, alertRes] = await Promise.all([
          fetch(`${API_BASE}/monitoring/presets`, { cache: "no-store" }),
          fetch(`${API_BASE}/monitoring/alerts/demo-user`, { cache: "no-store" }),
        ]);
        if (presetRes.ok) {
          const json = await presetRes.json();
          setPresets(json.presets ?? {});
        }
        if (alertRes.ok) {
          const json = await alertRes.json();
          setAlerts(json.alerts ?? []);
        }
      } catch (err) {
        console.error(err);
        setPresets({
          "3_sources": { sources: ["amazon", "reddit", "youtube"], description: "Essential monitoring: Major marketplaces and communities" },
          "5_sources": { sources: ["amazon", "reddit", "youtube", "pinterest", "meta_ads"], description: "Standard coverage" },
          "10_sources": { sources: ["amazon_best_sellers", "amazon_movers", "reddit", "youtube", "pinterest", "meta_ads", "tiktok", "instagram", "google_trends", "news"] , description: "Advanced social + marketplaces" },
        });
        setAlerts([
          { id: 1, title: "New Hot Product", message: "Dyson Airwrap trending 92.5", severity: "high", created_at: new Date().toISOString() },
          { id: 2, title: "Momentum shift", message: "Reusable bottle rising on TikTok", severity: "medium", created_at: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Monitoring</p>
            <h2 className="text-2xl font-semibold text-white">Source presets</h2>
            <p className="text-sm text-gray-300">Choose a bundle of sources; we handle scrapers and alerts.</p>
          </div>
          {!unlockedPro && (
            <Badge variant="outline" className="border-white/20 text-white">Starter preview • unlock Pro</Badge>
          )}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {Object.entries(presets).map(([key, preset], idx) => {
            const unlocked = unlockedPro || idx === 0;
            return (
              <LockedTile
                key={key}
                unlocked={unlocked}
                label="Unlock preset"
                description={`Full preset with ${planLabel("pro")}+`}
                upgradeHref="/#pricing"
              >
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{key.replace("_", " ")}</p>
                    <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-100">{preset.sources.length} sources</Badge>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">{preset.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-400">
                    {(unlocked ? preset.sources : preset.sources.slice(0, 2)).map((s) => (
                      <span key={s} className="rounded-full bg-white/5 px-2 py-1">{s}</span>
                    ))}
                    {!unlocked && <span className="rounded-full bg-white/5 px-2 py-1">+ locked</span>}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="bg-white text-black hover:bg-gray-200" disabled={!unlocked}>Activate</Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white" disabled={!unlocked}>Preview alerts</Button>
                  </div>
                </div>
              </LockedTile>
            );
          })}
          {Object.keys(presets).length === 0 && !loading && (
            <div className="text-sm text-gray-400">No presets available.</div>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <LockedTile
          unlocked={unlockedPro}
          label="Unlock real-time alerts"
          description="Pro shows full alert feed"
          upgradeHref="/#pricing"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 h-full">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-200" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-amber-200">Alerts</p>
                <h3 className="text-xl font-semibold text-white">Live signal feed</h3>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {(unlockedPro ? alerts : alerts.slice(0, 2)).map((alert) => (
                <div key={alert.id} className="rounded-2xl border border-white/10 bg-black/40 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{alert.title}</p>
                    <Badge variant="secondary" className="bg-amber-500/20 text-amber-100">{alert.severity}</Badge>
                  </div>
                  <p className="text-sm text-gray-300">{alert.message}</p>
                  <p className="text-[11px] text-gray-500">{new Date(alert.created_at).toLocaleString()}</p>
                </div>
              ))}
              {!alerts.length && <p className="text-sm text-gray-400">No alerts yet.</p>}
            </div>
          </div>
        </LockedTile>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-800/40 to-black p-4">
            <div className="flex items-center gap-2 text-white"><Activity className="h-5 w-5 text-cyan-200" /><span className="font-semibold">Health</span></div>
            <p className="mt-2 text-sm text-gray-300">Scrapers healthy. Next run in 2h.</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/80">
              <span className="rounded-full bg-white/10 px-2 py-1">Amazon</span>
              <span className="rounded-full bg-white/10 px-2 py-1">Reddit</span>
              <span className="rounded-full bg-white/10 px-2 py-1">TikTok</span>
            </div>
          </div>
          <LockedTile
            unlocked={unlockedEnterprise}
            label="Enterprise unlocks automation"
            description="Route alerts to Slack, Teams, or Webhooks"
            upgradeHref="/#pricing"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 h-full">
              <div className="flex items-center gap-2 text-white"><Zap className="h-5 w-5 text-yellow-200" /><span className="font-semibold">Automations</span></div>
              <p className="mt-2 text-sm text-gray-300">Send alerts to Slack, Teams, or your webhook. Trigger enrichments automatically.</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-300">
                <span className="rounded-full bg-white/5 px-2 py-1">Slack</span>
                <span className="rounded-full bg-white/5 px-2 py-1">Teams</span>
                <span className="rounded-full bg-white/5 px-2 py-1">Webhook</span>
                <span className="rounded-full bg-white/5 px-2 py-1">CSV export</span>
              </div>
              <Button className="mt-4 bg-white text-black hover:bg-gray-200" disabled={!unlockedEnterprise}>Connect destinations</Button>
            </div>
          </LockedTile>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-800/30 to-black p-4">
            <div className="flex items-center gap-2 text-white"><ShieldCheck className="h-5 w-5 text-emerald-200" /><span className="font-semibold">SLA</span></div>
            <p className="mt-2 text-sm text-gray-300">Starter: daily scan • Pro: hourly • Enterprise: 30-min + human QA</p>
            <p className="mt-2 text-xs text-gray-400">Current plan: {planLabel(planTier)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-200" />
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Quick actions</p>
            <h3 className="text-xl font-semibold text-white">Do more with your signals</h3>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-sm text-gray-200">
          {["Add product to watchlist", "Request TikTok pull", "Export last 30 days CSV", "Spin up competitor alert", "Enrich top movers", "Share with teammate"].map((action, idx) => (
            <LockedTile
              key={action}
              unlocked={idx < 2 || unlockedPro}
              label="Unlock action"
              description="Pro unlocks all quick actions"
              upgradeHref="/#pricing"
              blurAmount="md"
            >
              <div className="rounded-2xl border border-white/10 bg-black/40 p-3 h-full flex items-center justify-between">
                <span>{action}</span>
                <Badge variant="outline" className="border-white/20 text-white">{idx < 2 ? "Starter" : "Pro"}</Badge>
              </div>
            </LockedTile>
          ))}
        </div>
      </section>
    </div>
  );
}
