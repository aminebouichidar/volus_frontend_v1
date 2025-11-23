import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserSubscription } from "@/lib/user-actions";
import { DashboardShell, FeatureGate } from "../components/DashboardShell";
import { determinePlanTier, hasPlanAccess } from "@/lib/plan-tiers";
import { Button } from "@/components/ui/button";
import { Bell, Mail, RefreshCcw, ShieldCheck, Smartphone, UserCircle2 } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const subscription = await getUserSubscription(session.user.id);
  const planTier = determinePlanTier(subscription);
  const unlockedEnterprise = hasPlanAccess(planTier, "enterprise");

  return (
    <DashboardShell subscription={subscription} activeRoute="profile">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-black p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Profile</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Workspace identity</h1>
            <p className="mt-2 text-sm text-gray-300">Edit operator info, notification routes, and authentication keys.</p>
          </div>
          <Button variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10" asChild>
            <Link href="mailto:team@volus.ai">
              Contact success team
              <ShieldCheck className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
            <div className="flex items-center gap-3">
              <UserCircle2 className="h-10 w-10 text-indigo-300" />
              <div>
                <p className="text-sm text-gray-400">Operator</p>
                <p className="text-lg font-semibold text-white">{session.user.name ?? "Control room user"}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p>Email: {session.user.email ?? "Unknown"}</p>
              <p>User ID: {session.user.id}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
            <p className="text-sm font-semibold text-white">Workspace preferences</p>
            <div className="mt-4 space-y-3 text-sm text-gray-300">
              <div className="flex items-center justify-between">
                <span>Dark mode</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200">Always on</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Locale</span>
                <span className="text-xs text-gray-400">Automatic</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data retention</span>
                <span className="text-xs text-gray-400">24 months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Notifications</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Signal routing</h2>
            </div>
            <Button variant="outline" size="sm" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
              <RefreshCcw className="mr-2 h-4 w-4" /> Sync
            </Button>
          </div>
          <div className="mt-6 grid gap-4">
            {[
              { icon: Mail, label: "Email digest", value: "Enabled daily", requiredTier: "starter" as const },
              { icon: Smartphone, label: "SMS escalations", value: "Enabled for severe alerts", requiredTier: "pro" as const },
              { icon: Bell, label: "Slack channel", value: "#volus-market", requiredTier: "pro" as const },
            ].map((route) => {
              const Icon = route.icon;
              const unlocked = hasPlanAccess(planTier, route.requiredTier);
              const card = (
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-indigo-300" />
                    <div>
                      <p className="font-semibold text-white">{route.label}</p>
                      <p className="text-xs text-gray-400">{route.value}</p>
                    </div>
                  </div>
                  <Button size="sm" className="rounded-full bg-white px-4 text-xs font-semibold text-black hover:bg-gray-200" disabled={!unlocked}>
                    {unlocked ? 'Edit' : 'Locked'}
                  </Button>
                </div>
              );

              if (route.requiredTier === 'starter') {
                return <div key={route.label}>{card}</div>;
              }

              return (
                <FeatureGate key={route.label} unlocked={unlocked} label={route.label}>
                  {card}
                </FeatureGate>
              );
            })}
          </div>
        </div>

        <FeatureGate unlocked={unlockedEnterprise} label="Advanced governance">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-900/40 to-black p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-300">Security + API</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Credentials & audit trail</h2>
            <div className="mt-6 space-y-4 text-sm text-gray-200">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <div>
                  <p className="font-semibold text-white">API key</p>
                  <p className="text-xs text-gray-400">Last rotated 3 days ago</p>
                </div>
                <Button size="sm" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                  Reveal
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <div>
                  <p className="font-semibold text-white">SCIM provisioning</p>
                  <p className="text-xs text-gray-400">Syncing with Okta</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <div>
                  <p className="font-semibold text-white">Audit events</p>
                  <p className="text-xs text-gray-400">48 entries this week</p>
                </div>
                <Link href="/user-dashboard/insights" className="text-xs text-indigo-200">
                  Open log →
                </Link>
              </div>
            </div>
          </div>
        </FeatureGate>
      </section>
    </DashboardShell>
  );
}
