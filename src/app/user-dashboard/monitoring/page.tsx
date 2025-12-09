import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserSubscription } from "@/lib/user-actions";
import { determinePlanTier } from "@/lib/plan-tiers";
import { DashboardShell } from "../components/DashboardShell";
import { MonitoringClient } from "./MonitoringClient";

export default async function MonitoringPage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const subscription = await getUserSubscription(session.user.id);
  const planTier = determinePlanTier(subscription);

  return (
    <DashboardShell subscription={subscription} activeRoute="monitoring">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900/30 to-black p-6 space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Monitoring</p>
        <h1 className="text-3xl font-semibold text-white">Alerts & Automations</h1>
        <p className="text-sm text-gray-300">Wire your signals into presets, view alerts, and route them to channels. Starter previews are blurred; upgrade to unlock full feed and automations.</p>
      </section>

      <MonitoringClient planTier={planTier} />
    </DashboardShell>
  );
}
