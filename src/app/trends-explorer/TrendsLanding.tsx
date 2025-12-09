"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/app/sentiment/components/AnimatedStat"; // Reusing from sentiment
import PricingSection from "@/app/components/landing/PricingSection";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import Footer from "@/app/components/Footer";
import { AnimatedValueSection } from "./components/AnimatedValueSection";
import {
  Search,
  ShoppingCart,
  Flame,
  Zap,
  BarChart3,
  Globe2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LockedTile } from "@/components/ui/locked-tile";
import { planLabel, PlanTier } from "@/lib/plan-tiers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import GradientText from "@/components/ui/gradient-text";

// Types from the original page
type TrendProduct = {
  id: number;
  name?: string;
  normalized_name?: string;
  brand?: string | null;
  category?: string | null;
  trend_status?: string;
  trend_score?: number;
  momentum?: number;
  platforms_count?: number;
  platforms?: Record<string, boolean> | string[];
};

type Category = {
  name: string;
  keywords_sample?: string[];
};

interface TrendsLandingProps {
  hotProducts: TrendProduct[];
  crossPlatformProducts: TrendProduct[];
  categoryList: Category[];
  planTier: PlanTier;
  unlockedPro: boolean;
  unlockedEnterprise: boolean;
}

const signalSources = [
  {
    id: "marketplace",
    title: "Marketplace Velocity",
    description:
      "Track BSR changes, price fluctuations, and stock levels on Amazon & eBay to estimate real-time sales volume.",
    icon: ShoppingCart,
    badge: "Sales",
    backDescription:
      "Don't rely on lagging indicators. We track hourly sales rank changes and inventory depletion to spot products that are moving fast before the competition notices.",
    buttonText: "Track Sales Velocity",
    metrics: ["Hourly BSR tracking", "Stock level monitoring", "Price history"],
  },
  {
    id: "social",
    title: "Social Virality",
    description:
      "Identify viral products from TikTok Shop, Instagram Reels, and creator content before they hit the mainstream.",
    icon: Flame,
    badge: "Hype",
    backDescription:
      "See what's trending on social media before it hits the search results. We analyze millions of videos to find products with high engagement and purchase intent.",
    buttonText: "Spot Viral Trends",
    metrics: ["TikTok Shop analytics", "Influencer reach", "Engagement growth"],
  },
  {
    id: "search",
    title: "Search Demand",
    description:
      "See what people are searching for on Google & Pinterest. High search volume with low product availability = opportunity.",
    icon: Search,
    badge: "Intent",
    backDescription:
      "Validate demand with search volume data. Find keywords with high growth but low competition to identify underserved niches.",
    buttonText: "Analyze Search Intent",
    metrics: ["Keyword volume growth", "CPC analysis", "Long-tail discovery"],
  },
  {
    id: "competition",
    title: "Competitive Gap",
    description:
      "Analyze how many sellers are jumping in and how much they're spending on ads. Avoid the red ocean.",
    icon: BarChart3,
    badge: "Strategy",
    backDescription:
      "Know your enemy. We analyze competitor ad spend, listing quality, and review density to help you find the path of least resistance.",
    buttonText: "Check Competition",
    metrics: ["Ad spend estimates", "Listing quality score", "Review density"],
  },
];

function productName(product: TrendProduct) {
  return product.name || product.normalized_name || "Untitled product";
}

function formatScore(score?: number) {
  if (score === undefined || score === null) return "—";
  return `${score.toFixed(1)}`;
}

function maskValue(value: string | number) {
  const asString = typeof value === "number" ? value.toString() : value;
  if (asString.length <= 2) return "***";
  return `${asString.slice(0, 1)}**${asString.slice(-1)}`;
}

export default function TrendsLanding({
  hotProducts,
  crossPlatformProducts,
  categoryList,
  planTier,
  unlockedPro,
  unlockedEnterprise,
}: TrendsLandingProps) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <BackgroundAura />
      <main className="relative z-10">
        <SiteNavbar variant="marketing" planBadge={{ title: planLabel(planTier), description: "Trend Explorer" }} />
        <Hero 
            hotProducts={hotProducts} 
            crossPlatformProducts={crossPlatformProducts} 
            categoryList={categoryList}
            unlockedPro={unlockedPro}
            unlockedEnterprise={unlockedEnterprise}
        />
        <SignalSection />
        <AnimatedValueSection />
        <PricingSection />
        <TestimonialSection />
        <FinalCta />
        <Footer />
      </main>
    </div>
  );
}

function BackgroundAura() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-indigo-950" />
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] bg-indigo-600/20 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[45vw] h-[45vw] bg-purple-500/20 blur-[200px]" />
    </div>
  );
}

interface HeroProps {
  hotProducts: TrendProduct[];
  crossPlatformProducts: TrendProduct[];
  categoryList: Category[];
  unlockedPro: boolean;
  unlockedEnterprise: boolean;
}

function Hero({ hotProducts, crossPlatformProducts, categoryList, unlockedPro, unlockedEnterprise }: HeroProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const isDisabled = useMemo(() => !query.trim(), [query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery) return;
    router.push(`/trends-explorer?query=${encodeURIComponent(nextQuery)}`);
  };

  const stats = [
    { label: "Products Tracked", value: "15M+" },
    { label: "Data Sources", value: "12" },
    { label: "Prediction Accuracy", value: "94%" },
  ];

  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-24 sm:px-10">
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1fr_1fr] items-start">
        <div className="pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-indigo-200">
            Trend Explorer
          </div>
          <div className="mt-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-left font-semibold tracking-tight leading-tight text-white">
              Spot{" "}
              <GradientText
                colors={["#818cf8", "#c084fc", "#38bdf8", "#818cf8"]}
                animationSpeed={5}
                showBorder={false}
                className="inline-flex mx-0 cursor-default"
              >
                Viral Products
              </GradientText>{" "}
              Before They Trend
            </h1>
          </div>
          <p className="mt-6 text-lg text-gray-300 max-w-xl">
            Stop chasing yesterday&apos;s winners. Volus AI scans Amazon, TikTok, and Google to find the next big thing while it&apos;s still small.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for a product or category..."
                className="flex-1 bg-white/5 border border-white/15 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 text-gray-100 rounded-full px-5 py-3 outline-none transition"
                aria-label="Trend search"
              />
              <Button
                type="submit"
                disabled={isDisabled}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-full h-auto"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 h-12 rounded-full text-base">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-slate-800 bg-white/80 hover:text-white hover:bg-white/10 px-8 h-12 rounded-full text-base"
              asChild
            >
              <Link href="/contact">Book Demo</Link>
            </Button>
          </div>
          
          <div className="mt-10 grid grid-cols-3 gap-4 text-center max-w-lg">
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} label={stat.label} targetValue={stat.value} />
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-white/10 max-w-xl">
            <p className="text-sm font-medium text-gray-400 mb-6">Live Monitoring Across</p>
            <div className="flex flex-wrap gap-x-8 gap-y-4 opacity-70 grayscale transition-all hover:grayscale-0 hover:opacity-100">
               <div className="flex items-center gap-2 text-white">
                 <ShoppingCart className="w-5 h-5 text-amber-400" /> <span className="text-sm font-medium">Amazon</span>
               </div>
               <div className="flex items-center gap-2 text-white">
                 <Flame className="w-5 h-5 text-rose-500" /> <span className="text-sm font-medium">TikTok Shop</span>
               </div>
               <div className="flex items-center gap-2 text-white">
                 <Search className="w-5 h-5 text-blue-400" /> <span className="text-sm font-medium">Google Trends</span>
               </div>
               <div className="flex items-center gap-2 text-white">
                 <Globe2 className="w-5 h-5 text-cyan-400" /> <span className="text-sm font-medium">Meta Ads</span>
               </div>
            </div>
            
            <div className="mt-10">
               <p className="text-sm font-medium text-gray-400 mb-4">Trending Keywords (Live)</p>
               <div className="flex flex-wrap gap-2">
                 {["portable blender", "heatless curls", "mushroom lamp", "rosemary oil", "cargo pants", "air fryer liner", "lip stain", "weighted stuffed animal"].map(tag => (
                   <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 hover:border-white/20 transition cursor-default">
                     {tag}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Live Demo Section (Unified Feed) */}
        <div className="relative lg:pl-10 pt-8 lg:pt-0">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-indigo-500/10 to-purple-500/5 blur-3xl" />
          
          {/* Unified Intelligence Feed Card */}
          <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Feed Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
               <div className="flex items-center gap-2">
                 <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                 </div>
                 <span className="text-sm font-medium text-white tracking-wide">Live Trend Feed</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Real-time</span>
               </div>
            </div>

            <div className="divide-y divide-white/5">
               {/* Hot Section */}
               <div className="p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> Hot Right Now
                  </h3>
                  <div className="space-y-3">
                  {hotProducts.slice(0, 3).map((product, idx) => {
                    const unlocked = unlockedPro || idx < 1;
                    return (
                      <div key={product.id}>
                        <LockedTile
                          unlocked={unlocked}
                          label="Unlock to View"
                          upgradeHref="/#pricing"
                          compact={true}
                        >
                          <div className="group relative rounded-lg border border-white/5 bg-white/[0.02] p-3 transition hover:bg-white/[0.06]">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate pr-4 group-hover:text-indigo-200 transition-colors">{productName(product)}</p>
                                <p className="text-xs text-gray-500">{product.category ?? "General"}</p>
                              </div>
                              <Badge variant="secondary" className="bg-amber-500/10 text-amber-200 border border-amber-500/20 shrink-0">
                                {unlocked ? formatScore(product.trend_score) : maskValue(formatScore(product.trend_score))}
                              </Badge>
                            </div>
                          </div>
                        </LockedTile>
                      </div>
                    );
                  })}
                  </div>
               </div>

               {/* Cross Platform Section */}
               <div className="p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" /> Cross-Platform Winners
                  </h3>
                  <div className="space-y-3">
                  {crossPlatformProducts.slice(0, 3).map((product, idx) => {
                    const unlocked = unlockedPro || idx < 1;
                    const platforms = Array.isArray(product.platforms)
                      ? product.platforms.length
                      : typeof product.platforms === "object" && product.platforms !== null
                        ? Object.values(product.platforms).filter(Boolean).length
                        : product.platforms_count ?? 0;
                    return (
                      <div key={product.id}>
                        <LockedTile
                          unlocked={unlocked}
                          label="Unlock Insights"
                          upgradeHref="/#pricing"
                          compact={true}
                        >
                          <div className="group relative rounded-lg border border-white/5 bg-white/[0.02] p-3 transition hover:bg-white/[0.06]">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate pr-4 group-hover:text-cyan-200 transition-colors">{productName(product)}</p>
                                <p className="text-xs text-gray-500">{product.category ?? "General"}</p>
                              </div>
                              <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-200 border border-cyan-500/20 shrink-0">
                                {unlocked ? `${platforms} sources` : maskValue(`${platforms} sources`)}
                              </Badge>
                            </div>
                          </div>
                        </LockedTile>
                      </div>
                    );
                  })}
                  </div>
               </div>

               {/* Categories Section */}
               <div className="p-5 bg-white/[0.02]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-400" /> Rising Categories
                  </h3>
                  <div className="space-y-3">
                  {(categoryList.length ? categoryList.slice(0, 3) : [
                    { name: "electronics", keywords_sample: ["smartphone", "earbuds", "tablet"] },
                    { name: "cosmetics", keywords_sample: ["blush", "lipstick", "skincare"] },
                    { name: "home_appliances", keywords_sample: ["air fryer", "vacuum", "humidifier"] },
                  ]).map((category, idx) => {
                    const unlocked = unlockedEnterprise || idx < 1;
                    return (
                      <div key={category.name}>
                        <LockedTile
                          unlocked={unlocked}
                          label="Unlock Category"
                          upgradeHref="/#pricing"
                          compact={true}
                        >
                          <div className="group relative rounded-lg border border-white/5 bg-white/[0.02] p-3 transition hover:bg-white/[0.06]">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium capitalize text-white group-hover:text-emerald-200 transition-colors">{category.name}</p>
                              <Badge variant="outline" className="border-emerald-500/20 text-emerald-200 bg-emerald-500/10 text-[10px] h-5 px-1.5">{unlocked ? "Visible" : "Locked"}</Badge>
                            </div>
                            <p className="mt-1 text-xs text-gray-400 line-clamp-1">
                              {unlocked ? category.keywords_sample?.join(", ") ?? "Signals available" : "•••"}
                            </p>
                          </div>
                        </LockedTile>
                      </div>
                    );
                  })}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalSection() {
  return (
    <section className="relative px-6 py-20 sm:px-10 text-zinc-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">
            Signals
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-white">
            The Complete Picture of Product Success
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            We combine sales data, social engagement, and search intent to give you a 360° view of every trend.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {signalSources.map(({ title, icon: Icon, description, badge }) => (
            <Card
              key={title}
              className="group relative overflow-visible border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-zinc-950/30 p-0 transition-colors duration-300 hover:border-zinc-700"
            >
              {/* subtle gradient on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              {/* faint inner glow that appears on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/0 group-hover:from-white/[0.03] group-hover:to-white/[0.06] transition-colors" />

              {/* white corner squares on hover */}
              <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
                <div className="absolute -left-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -left-2 -bottom-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -bottom-2 h-3 w-3 bg-white" />
              </div>

              <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 text-zinc-200">
                  <Icon className="h-5 w-5 text-zinc-200" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-medium text-zinc-100">{title}</CardTitle>
                    {badge && (
                      <span className="rounded-full border border-zinc-600 px-2 py-0.5 text-[10px] leading-none text-zinc-300">
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 px-6 pb-6 text-sm text-zinc-400">
                {description}
              </CardContent>

              {/* focus ring accent on hover */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-white/0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="relative px-6 py-20 sm:px-10">
      <div className="max-w-4xl mx-auto rounded-[32px] border border-white/10 bg-white/5/5 p-10 text-center backdrop-blur">
        <p className="text-sm uppercase tracking-[0.4em] text-indigo-300">Success Stories</p>
        <p className="mt-6 text-2xl sm:text-3xl text-gray-200">
          &ldquo;We used Volus AI to spot the &apos;portable blender&apos; trend 3 weeks before it peaked. We sold out our inventory while competitors were just placing orders.&rdquo;
        </p>
        <p className="mt-4 text-sm text-gray-400">Director of Product · E-Comm Ventures</p>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative px-6 pb-24 sm:px-10">
      <div className="max-w-5xl mx-auto rounded-[40px] border border-white/10 bg-gradient-to-br from-purple-900 via-black to-black p-12 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.4em] text-gray-300">Ready to win?</p>
        <h2 className="mt-6 text-3xl sm:text-4xl font-semibold">
          Find your next bestseller today.
        </h2>
        <p className="mt-4 text-gray-300">
          Join thousands of sellers who use Volus AI to predict trends and dominate their niche.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 h-12 rounded-full px-10 text-base">
             <Link href="/signup">Start Free Trial</Link>
          </Button>
          <Button variant="outline" className="border-white/40 text-slate-800 hover:text-white hover:bg-white/10 h-12 rounded-full px-10 text-base" asChild>
            <Link href="/contact">Talk to Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
