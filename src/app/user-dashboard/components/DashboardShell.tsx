'use client';

import { ReactNode, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  LayoutDashboard,
  Lock,
  PackageSearch,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { SubscriptionInfo } from "@/types/subscription";
import {
  determinePlanTier,
  hasPlanAccess,
  isTrialPlan,
  planDescription,
  planLabel,
  PlanTier,
} from "@/lib/plan-tiers";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";

const NAV_LINKS = [
  {
    key: "overview",
    label: "Overview",
    href: "/user-dashboard",
    icon: LayoutDashboard,
    requiredTier: "starter" as PlanTier,
  },
  {
    key: "profile",
    label: "Profile & Settings",
    href: "/user-dashboard/profile",
    icon: UserCog,
    requiredTier: "starter" as PlanTier,
  },
  {
    key: "products",
    label: "Product Tracking",
    href: "/user-dashboard/products",
    icon: PackageSearch,
    requiredTier: "starter" as PlanTier,
  },
  {
    key: "competitors",
    label: "Competitor Recon",
    href: "/user-dashboard/competitors",
    icon: ShieldCheck,
    requiredTier: "pro" as PlanTier,
  },
  {
    key: "billing",
    label: "Billing & Plans",
    href: "/user-dashboard/billing",
    icon: CreditCard,
    requiredTier: "starter" as PlanTier,
  },
];

interface DashboardShellProps {
  subscription: SubscriptionInfo | null;
  activeRoute: string;
  children: ReactNode;
}

export function DashboardShell({
  subscription,
  activeRoute,
  children,
}: DashboardShellProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const planTier = determinePlanTier(subscription);
  const trialMode = isTrialPlan(subscription);
  const trialEndsAt = subscription?.trialEndsAt
    ? new Date(subscription.trialEndsAt)
    : null;
  const daysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;
  const planBadge = {
    title: `${planLabel(planTier)} ${trialMode ? 'trial' : 'workspace'}`,
    description: planDescription(planTier, trialMode, daysLeft),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNavbar variant="dashboard" planBadge={planBadge} />

      <main className="mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6">
            <nav className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gray-400">Workspace</p>
              <div className="space-y-2">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  const unlocked = hasPlanAccess(planTier, link.requiredTier);
                  const isActive = activeRoute === link.key;

                  if (!unlocked) {
                    return (
                      <button
                        key={link.key}
                        onClick={() => setShowUpgrade(true)}
                        className={cn(
                          'group flex w-full items-center gap-3 rounded-2xl border border-white/5 px-3 py-3 text-left text-sm text-gray-500/80 backdrop-blur transition-all hover:border-white/20 hover:bg-white/5',
                          'opacity-60'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{link.label}</p>
                          <p className="text-xs text-gray-500">Upgrade to view</p>
                        </div>
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      className={cn(
                        'group flex items-center gap-3 rounded-2xl border border-white/5 px-3 py-3 text-sm text-gray-300 transition-all hover:border-white/20 hover:bg-white/5',
                        isActive && 'border-indigo-400/40 bg-indigo-500/10 text-white shadow-[0_0_25px_rgba(99,102,241,0.25)]'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-black p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-100">Plan status</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{planLabel(planTier)} {trialMode ? 'trial' : 'plan'}</h3>
              <p className="mt-2 text-sm text-indigo-100/80">{planDescription(planTier, trialMode, daysLeft)}</p>
              <div className="mt-4 flex gap-3">
                <Button
                  onClick={() => (planTier === 'starter' ? setShowUpgrade(true) : window.open('/api/billing/create-portal-session', '_self'))}
                  className="flex-1 bg-white text-black hover:bg-gray-200"
                >
                  {planTier === 'starter' ? 'Upgrade plan' : 'Manage billing'}
                </Button>
                {planTier === 'starter' && (
                  <Button
                    variant="outline"
                    onClick={() => setShowUpgrade(true)}
                    className="flex-1 border-white/30 bg-white/5 text-white hover:bg-white/10"
                  >
                    Compare tiers
                  </Button>
                )}
              </div>
            </div>
          </aside>

          <section className="space-y-6">{children}</section>
        </div>
      </main>

      {showUpgrade && (
        <UpgradeDialog onClose={() => setShowUpgrade(false)} currentTier={planTier} />
      )}
    </div>
  );
}

function UpgradeDialog({ onClose, currentTier }: { onClose: () => void; currentTier: PlanTier }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950/90 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-white">Unlock full market intelligence</h3>
          <button onClick={onClose} className="text-gray-400 transition hover:text-white">✕</button>
        </div>
        <p className="mt-2 text-sm text-gray-300">
          Upgrade to Pro or Enterprise to remove blurred modules, stream competitor heatmaps, and automate exports.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {['pro', 'enterprise'].map((tier) => (
            <div key={tier} className={cn('rounded-2xl border p-4', tier === 'enterprise' ? 'border-indigo-400 bg-indigo-500/10' : 'border-white/10 bg-white/5')}>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">{tier}</p>
              <h4 className="mt-2 text-xl font-semibold capitalize">{tier}</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-200">
                <li>• Unlimited channel monitoring</li>
                <li>• Automated exports & API</li>
                <li>• Dedicated strategist sessions</li>
              </ul>
              {!hasPlanAccess(currentTier, tier as PlanTier) && (
                <Link
                  href="/signup"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
                >
                  Switch to {tier}
                </Link>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Need something custom? <Link className="text-indigo-300" href="mailto:team@volus.ai">Contact sales</Link>
        </p>
      </div>
    </div>
  );
}

interface FeatureGateProps {
  unlocked: boolean;
  label: string;
  onUpgrade?: () => void;
  children: ReactNode;
}

export function FeatureGate({ unlocked, label, onUpgrade, children }: FeatureGateProps) {
  return (
    <div className="relative">
      {!unlocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-black/70 p-6 text-center backdrop-blur">
          <Lock className="mb-3 h-6 w-6 text-indigo-200" />
          <p className="text-sm text-gray-200">
            Upgrade to unlock <span className="font-semibold text-white">{label}</span>
          </p>
          {onUpgrade && (
            <Button onClick={onUpgrade} className="mt-4 h-9 rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-gray-200">
              Upgrade plan
            </Button>
          )}
        </div>
      )}
      <div className={cn(!unlocked && 'pointer-events-none select-none opacity-60 blur-sm')}>{children}</div>
    </div>
  );
}
