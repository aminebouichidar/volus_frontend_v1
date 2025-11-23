import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserSubscription } from "@/lib/user-actions";
import { DashboardShell } from "../components/DashboardShell";
import { determinePlanTier, hasPlanAccess, PlanTier } from "@/lib/plan-tiers";
import { Button } from "@/components/ui/button";
import { CreditCard, HeartHandshake, Shield } from "lucide-react";

const PLAN_FEATURES: Record<PlanTier, string[]> = {
  starter: ["5 signal monitors", "Daily email brief", "Slack alerts"],
  pro: ["Unlimited monitors", "Competitor heatmaps", "Automations + API"],
  enterprise: ["Dedicated FastAPI cluster", "Custom data ingestion", "Priority strategy pod"],
};

export default async function BillingPage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const subscription = await getUserSubscription(session.user.id);

  const planTier = determinePlanTier(subscription);
  const manageBillingUrl = "/api/billing/create-portal-session";

  return (
    <DashboardShell subscription={subscription} activeRoute="billing">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900/40 to-black p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Billing</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Plan & invoicing</h1>
            <p className="mt-2 text-sm text-gray-300">Manage payment methods, invoices, and upgrade to unlock every Volus module.</p>
          </div>
          <div className="flex gap-3">
            <Button className="rounded-full bg-white px-5 text-black hover:bg-gray-200" asChild>
              <a href={manageBillingUrl}>Manage billing</a>
            </Button>
            <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
              View invoices
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {Object.entries(PLAN_FEATURES).map(([key, features]) => {
          const tier = key as PlanTier;
          const isCurrent = planTier === tier;
          const readableLabel = tier === "starter" ? "Starter" : tier === "pro" ? "Pro" : "Enterprise";
          return (
            <div
              key={tier}
              className={`rounded-3xl border p-6 ${
                isCurrent
                  ? "border-indigo-300 bg-indigo-500/10 shadow-[0_0_40px_rgba(99,102,241,0.25)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">{readableLabel}</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{readableLabel}</h2>
              <ul className="mt-4 space-y-2 text-sm text-gray-200">
                {features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              {!isCurrent && (
                <Button
                  className="mt-4 w-full rounded-full bg-white text-black hover:bg-gray-200"
                  variant="secondary"
                  onClick={() => (window.location.href = "/#pricing")}
                >
                  Switch to {readableLabel}
                </Button>
              )}
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-indigo-200" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Payment method</p>
              <h3 className="text-xl font-semibold text-white">**** 4242</h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-300">Next invoice on {subscription?.currentPeriodEnd?.toString() ?? "soon"}.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-900/40 to-black p-6">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-200" />
            <h3 className="text-xl font-semibold text-white">Service agreement</h3>
          </div>
          <p className="mt-4 text-sm text-gray-200">Need procurement paperwork or custom data retention terms? Our legal + security pod can help.</p>
          <Button variant="outline" className="mt-4 border-white/20 bg-white/5 text-white hover:bg-white/10" asChild>
            <a href="mailto:team@volus.ai">Reach out</a>
          </Button>
        </div>
      </section>

      {!hasPlanAccess(planTier, "enterprise") && (
        <section className="rounded-3xl border border-amber-300/30 bg-amber-500/10 p-6 text-amber-50">
          <div className="flex items-center gap-3">
            <HeartHandshake className="h-5 w-5" />
            <div>
              <h3 className="text-xl font-semibold">Need Enterprise SLAs?</h3>
              <p className="text-sm text-amber-100/80">Get custom KPIs, on-prem deployment options, and dedicated strategist pods.</p>
            </div>
          </div>
          <Button className="mt-4 rounded-full bg-white px-5 text-black hover:bg-gray-200" asChild>
            <a href="mailto:sales@volus.ai">Talk to sales</a>
          </Button>
        </section>
      )}
    </DashboardShell>
  );
}
