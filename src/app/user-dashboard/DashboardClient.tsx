'use client';

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LineChart, LogOut, User, Settings, BarChart3, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardClientProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    subscription?: {
      status: string;
      trialEndsAt: string | null;
      currentPeriodEnd: string | null;
      stripeCustomerId: string;
      stripeSubscriptionId: string;
    } | null;
  };
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [billingStatus, setBillingStatus] = useState<string | null>(null);
  const [billingError, setBillingError] = useState<string | null>(null);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleManageBilling = async () => {
    setBillingStatus(null);
    setBillingError(null);
    setIsBillingLoading(true);

    try {
      const response = await fetch("/api/billing/create-portal-session", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        setBillingError(data.error || "Billing portal is not available right now.");
      } else if (data.url) {
        setBillingStatus("Redirecting to Stripe billing portal...");
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Billing portal error", error);
      setBillingError("We couldn't open the billing portal. Please try again later.");
    } finally {
      setIsBillingLoading(false);
    }
  };

  const trialEndsAt = user.subscription?.trialEndsAt
    ? new Date(user.subscription.trialEndsAt)
    : null;
  const daysLeft = trialEndsAt
    ? Math.max(
        0,
        Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      )
    : null;

  const subscriptionStatus = user.subscription?.status ?? "TRIALING";
  const isTrialing = subscriptionStatus === "TRIALING";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <LineChart className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-lg font-semibold">Volus AI</span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt={user.name || "User"} className="w-full h-full rounded-full" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-white">{user.name || "User"}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08] text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(isTrialing || billingError || billingStatus) && (
          <div
            className={cn(
              "mb-8 rounded-2xl border px-6 py-4",
              isTrialing
                ? "bg-indigo-500/10 border-indigo-500/30"
                : billingError
                  ? "bg-rose-500/10 border-rose-500/30"
                  : "bg-emerald-500/10 border-emerald-500/30"
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                {isTrialing ? (
                  <>
                    <p className="text-sm uppercase tracking-wide text-indigo-200">
                      Free trial active
                    </p>
                    <h2 className="text-lg font-semibold text-white mt-1">
                      {daysLeft !== null
                        ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining in your trial`
                        : "Trial ends soon"}
                    </h2>
                    <p className="text-sm text-indigo-100/70 mt-1">
                      Upgrade to keep uninterrupted access to advanced market intelligence once the trial ends.
                    </p>
                  </>
                ) : billingError ? (
                  <>
                    <h2 className="text-lg font-semibold text-white">Billing portal unavailable</h2>
                    <p className="text-sm text-rose-100/80 mt-1">{billingError}</p>
                  </>
                ) : (
                  <p className="text-sm text-emerald-100/80">{billingStatus}</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleManageBilling}
                  variant="outline"
                  disabled={isBillingLoading}
                  className="border-white/15 bg-white/5 hover:bg-white/10"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isBillingLoading ? "Opening portal..." : "Manage billing"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Welcome back, {user.name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-gray-400">
            Here&apos;s what&apos;s happening with your market intelligence today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-green-400">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">2,543</h3>
            <p className="text-sm text-gray-400">Sentiment Signals</p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <LineChart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-green-400">+8%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">156</h3>
            <p className="text-sm text-gray-400">Active Monitors</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-red-400">-3%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">23</h3>
            <p className="text-sm text-gray-400">Insights Generated</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <div className="text-left">
                <p className="font-semibold">New Analysis</p>
                <p className="text-xs opacity-80">Start tracking a product</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08]"
            >
              <div className="text-left">
                <p className="font-semibold">View Reports</p>
                <p className="text-xs opacity-80">Access your insights</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08]"
            >
              <div className="text-left">
                <p className="font-semibold">Monitor Trends</p>
                <p className="text-xs opacity-80">Real-time updates</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08]"
            >
              <div className="text-left">
                <p className="font-semibold">Settings</p>
                <p className="text-xs opacity-80">Manage your account</p>
              </div>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">Sentiment analysis completed</p>
                  <p className="text-xs text-gray-400">Product: Consumer Electronics • 2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
