"use client";

import { useMemo } from "react";
import { LockedTile } from "@/components/ui/locked-tile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hasPlanAccess, PlanTier } from "@/lib/plan-tiers";
import { Users, ShieldCheck, Activity, FileText } from "lucide-react";

export function EnterpriseClient({ planTier }: { planTier: PlanTier }) {
  const unlockedEnterprise = useMemo(() => hasPlanAccess(planTier, "enterprise"), [planTier]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200">Enterprise Control</p>
            <h2 className="text-2xl font-semibold text-white">Organization Settings</h2>
            <p className="text-sm text-gray-300">Manage team access, audit logs, and compliance.</p>
          </div>
          <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
            Contact Support
          </Button>
        </div>
      </section>

      <LockedTile
        unlocked={unlockedEnterprise}
        label="Enterprise Access Required"
        description="Upgrade to the Enterprise plan to access advanced governance and team management features."
        upgradeHref="/#pricing"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Team Management</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-gray-400">Active Seats</span>
                <span className="text-sm font-medium text-white">12 / 20</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-gray-400">Pending Invites</span>
                <span className="text-sm font-medium text-white">3</span>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Manage Team</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/20 p-2 text-purple-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Audit Logs</h3>
            </div>
            <div className="space-y-3">
              {[
                { action: "User Added", user: "admin@volus.ai", time: "10m ago" },
                { action: "Settings Changed", user: "sarah@volus.ai", time: "1h ago" },
                { action: "Export Downloaded", user: "mike@volus.ai", time: "3h ago" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{log.action}</span>
                  <span className="text-xs text-gray-500">{log.time}</span>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-purple-400 hover:text-purple-300">View Full Log</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-green-500/20 p-2 text-green-400">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">API Usage</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Requests this month</span>
                <span>85%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div className="h-full w-[85%] rounded-full bg-green-500" />
              </div>
              <p className="text-xs text-gray-500 mt-2">850,000 / 1,000,000 requests</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-orange-500/20 p-2 text-orange-400">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Compliance Reports</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-2">
                <span className="text-sm text-gray-300">SOC2 Type II</span>
                <Badge variant="outline" className="border-green-500/50 text-green-400">Active</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-2">
                <span className="text-sm text-gray-300">GDPR Status</span>
                <Badge variant="outline" className="border-green-500/50 text-green-400">Compliant</Badge>
              </div>
            </div>
          </div>
        </div>
      </LockedTile>
    </div>
  );
}
