"use client";

import { useMemo, type ComponentType } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Compass,
  Flame,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

interface ProductInsightsClientProps {
  encodedPayload: string;
}

type RawProduct = Record<string, unknown> & {
  data?: Record<string, unknown>;
};

const toRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : {};

const decodePayload = (value: string): RawProduct | null => {
  if (!value) return null;
  try {
    const jsonString =
      typeof window === "undefined"
        ? Buffer.from(value, "base64").toString("utf-8")
        : decodeURIComponent(escape(window.atob(value)));
    const parsed = JSON.parse(jsonString);
    return parsed as RawProduct;
  } catch (error) {
    console.error("Failed to decode product payload", error);
    return null;
  }
};

const safeNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const numeric = Number(value.replace(/[£$,]/g, ""));
    if (Number.isFinite(numeric)) return numeric;
  }
  return null;
};

const parseTagScore = (tag?: string): number => {
  if (!tag) return 55;
  const upper = tag.toUpperCase();
  if (upper.includes("LOW")) return 80;
  if (upper.includes("MEDIUM")) return 60;
  if (upper.includes("HIGH")) return 35;
  if (upper.includes("OVER")) return 25;
  return 50;
};

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

const deriveLifecycleStage = (trendScore: number | null, urgencyScore: number | null) => {
  const score = trendScore ?? 50;
  if (score >= 85) {
    return { stage: "Peaking", description: "Demand is at its height—protect margins and harvest profit.", color: "from-emerald-500/20 via-emerald-400/10 to-emerald-700/10" };
  }
  if (score >= 65) {
    return { stage: "Growing", description: "Momentum compounding across channels—double-down on scaling rituals.", color: "from-indigo-500/20 via-indigo-400/10 to-indigo-700/10" };
  }
  if (score >= 45) {
    return { stage: "Emerging", description: "Signals are forming but proof is light—test fast and instrument feedback loops.", color: "from-amber-500/20 via-amber-400/10 to-amber-700/10" };
  }
  if ((urgencyScore ?? 0) >= 60) {
    return { stage: "Seasonal spike", description: "Short-lived window—lean on urgency flows then exit gracefully.", color: "from-rose-500/20 via-rose-400/10 to-rose-700/10" };
  }
  return { stage: "Declining", description: "Cooling velocity—shift to cash-flow harvest or sunset playbook.", color: "from-slate-600/20 via-slate-500/10 to-slate-700/10" };
};

const computeOpportunityScore = (params: {
  trendScore: number | null;
  urgencyScore: number | null;
  marketScore: number;
  profitScore: number;
}) => {
  const { trendScore, urgencyScore, marketScore, profitScore } = params;
  const trend = trendScore ?? 55;
  const urgency = urgencyScore ?? 45;
  const opportunity = trend * 0.4 + (100 - marketScore) * 0.2 + profitScore * 0.2 + urgency * 0.2;
  return clamp(Math.round(opportunity));
};

const generateMarketingAngles = (category: string, demographics: string) => {
  const anchor = category || "Breakout product";
  const audience = demographics || "digital-native shoppers";
  return {
    hooks: [
      `${anchor} that ${audience} secretly gatekeep`,
      `Proof that ${anchor.toLowerCase()} can feel premium without luxury markup`,
      `Skip the hype—see how ${anchor.toLowerCase()} performs in real life clips`,
    ],
    copyIdeas: [
      `"From swipe to doorstep in 72h. ${anchor} tuned for restless operators."`,
      `"Stop scrolling. Start scaling. ${anchor} is the signal—everyone else is noise."`,
    ],
    creativeConcepts: [
      "Split-screen retention test",
      "IRL stress test montage",
      "Creator POV micro-story",
    ],
    personaMessaging: [
      `${audience}: "Finally, a ${anchor.toLowerCase()} built for my pace."`,
      `Operators: "Zero fluff. Just dashboards + confidence."`,
    ],
  };
};

const deriveColorScale = (value: number) => {
  if (value >= 80) return "bg-gradient-to-r from-emerald-400 to-lime-400";
  if (value >= 60) return "bg-gradient-to-r from-indigo-400 to-sky-400";
  if (value >= 40) return "bg-gradient-to-r from-amber-400 to-orange-400";
  return "bg-gradient-to-r from-rose-500 to-pink-500";
};

const formatPrice = (value: unknown) => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return `£${value.toFixed(2)}`;
  return "—";
};

export function ProductInsightsClient({ encodedPayload }: ProductInsightsClientProps) {
  const insight = useMemo(() => {
    const rawProduct = decodePayload(encodedPayload);
    if (!rawProduct) return null;
    const data = toRecord(rawProduct.data);

    const name =
      (rawProduct.amazon_bs_title as string | undefined) ||
      (data.amazon_ms_title as string | undefined) ||
      "Unlabeled product";

    const category = (rawProduct.category as string | undefined) || "General";
    const trendScore = safeNumber(data.trend_score);
    const urgencyScore = safeNumber(data.urgency_score);
    const marketScore = parseTagScore(data.market_saturation as string | undefined);
    const profitScore = parseTagScore(data.profit_potential as string | undefined);
    const confidenceFields = [
      data.platforms,
      data.amazon_bs_price,
      data.amazon_bs_title,
      data.amazon_ms_price,
      data.recommendation,
      data.market_saturation,
      data.profit_potential,
      data.target_demographics,
      data.youtube_videos,
      data.reddit_posts,
      data.meta_advertisers,
    ];
    const confidence = Math.round(
      (confidenceFields.filter((value) => value !== null && value !== undefined).length /
        confidenceFields.length) *
        100
    );

    const lifecycle = deriveLifecycleStage(trendScore, urgencyScore);
    const opportunityScore = computeOpportunityScore({
      trendScore,
      urgencyScore,
      marketScore,
      profitScore,
    });

    return {
      rawProduct,
      data,
      name,
      category,
      trendScore,
      urgencyScore,
      marketScore,
      profitScore,
      lifecycle,
      confidence,
      opportunityScore,
      recommendation: data.recommendation as string | undefined,
      marketSaturation: data.market_saturation as string | undefined,
      profitPotential: data.profit_potential as string | undefined,
      platforms: typeof data.platforms === "string"
        ? data.platforms.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      platformCount: safeNumber(data.platform_count),
      bestSellerPrice: data.amazon_bs_price,
      moversPrice: data.amazon_ms_price,
      targetDemographics: (data.target_demographics as string | undefined) || "Trend followers",
      marketingChannels: (data.marketing_channels as string | undefined) || "Amazon PPC",
    };
  }, [encodedPayload]);

  if (!insight) {
    return (
      <div className="rounded-3xl border border-white/10 bg-black/40 p-10 text-center text-gray-300">
        <p>Select a product from the insights list to generate the full intelligence brief.</p>
      </div>
    );
  }

  const angles = generateMarketingAngles(insight.category, insight.targetDemographics);
  const reviewScore = Math.min(4.9, Math.max(3.8, (insight.trendScore ?? 55) / 20 + 3.5));
  const reviewVolume = Math.round(((insight.trendScore ?? 60) / 100) * 850 + 80);
  const reviewTime = Math.max(14, Math.round(120 - (insight.trendScore ?? 50)));

  const socialSignals = [
    {
      label: "YouTube narrative pull",
      description: "Trigger a long-form scrape for creator sentiment & total views.",
      ready: Boolean(insight.data.youtube_videos),
    },
    {
      label: "Reddit debate",
      description: "Surface authentic objections inside key subreddits.",
      ready: Boolean(insight.data.reddit_posts),
    },
    {
      label: "Meta ads",
      description: "Snapshot live ad library for creative angles & aggressors.",
      ready: Boolean(insight.data.meta_advertisers),
    },
    {
      label: "TikTok pulse",
      description: "Pull influencer velocity + sentiment from hashtag clusters.",
      ready: Boolean(insight.data.tiktok_sentiment),
    },
  ];

  const sellingAngles = [
    {
      title: "Product slogans",
      items: [
        `${insight.category} engineered for restless operators`,
        `Trustable ${insight.category.toLowerCase()} for disruptive brands`,
        `Scale-ready ${insight.category.toLowerCase()} without luxury markups`,
      ],
    },
    {
      title: "Branding styles",
      items: ["Minimalist premium", "Urban utility", "Future nostalgia"],
    },
    {
      title: "Store themes",
      items: ["Editorial drop", "Premium marketplace", "Creator studio"],
    },
    {
      title: "Color palettes",
      items: ["Infrared + charcoal", "Indigo haze", "Sandstone neutrals"],
    },
    {
      title: "Photo moodboard",
      items: ["Macro texture close-ups", "Lifestyle hero shots", "Studio neon accents"],
    },
  ];

  const supplierBrief = [
    {
      label: "Quality tier",
      value: "Premium daily-use",
      note: "Stress-test stitching & finishes to survive creator reviews.",
    },
    {
      label: "Material expectations",
      value: "Soft-touch cotton blend / anodized alloy",
      note: "Match tactile promise implied in marketing copy.",
    },
    {
      label: "Packaging",
      value: "Magnet-fold box + insert",
      note: "Ready for unboxing reels; include QR for review capture.",
    },
    {
      label: "MOQ guidance",
      value: "500 units (test) → 2.5k (scale)",
      note: "Front-load QC on the first batch before ad blitz.",
    },
  ];

  const nextSteps = [
    "Add to tracking queue with 6h refresh cadence",
    "Set sentiment + review alerts inside Slack #market-intel",
    "Request price-drop webhook on Amazon movers feed",
    "Ask creative pod for three UGC storyboard variants",
    "Benchmark against current best seller alternative",
  ];

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-indigo-950/40 to-black/80 p-8 shadow-2xl">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <Badge className="bg-white/15 text-white">{insight.category}</Badge>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">{insight.name}</h1>
            {insight.recommendation && (
              <p className="text-base text-white/80">{insight.recommendation}</p>
            )}
            <div className="flex flex-wrap gap-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                <Sparkles className="size-3" /> {insight.marketingChannels}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                <Target className="size-3" /> {insight.targetDemographics}
              </span>
              {insight.platformCount && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                  <Activity className="size-3" /> {insight.platformCount} platforms
                </span>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricBlock label="Trend score" value={insight.trendScore} icon={TrendingUp} />
            <MetricBlock label="Urgency" value={insight.urgencyScore} icon={Flame} />
            <MetricBlock label="Market saturation" value={`${insight.marketScore}%`} icon={Layers} />
            <MetricBlock label="Profit potential" value={`${insight.profitScore}%`} icon={Rocket} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={cn("rounded-3xl border border-white/10 p-6", `bg-gradient-to-br ${insight.lifecycle.color}`)}>
          <div className="flex items-center gap-3">
            <Compass className="size-6 text-white" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">Trend Trajectory</p>
              <h3 className="text-2xl font-semibold text-white">{insight.lifecycle.stage}</h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/80">{insight.lifecycle.description}</p>
          <div className="mt-6">
            <div className="flex justify-between text-xs text-white/60">
              {['Emerging', 'Growing', 'Peaking', 'Declining'].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/10">
              <div
                className={cn("h-2 rounded-full", deriveColorScale(insight.trendScore ?? 50))}
                style={{ width: `${clamp(insight.trendScore ?? 50)}%` }}
              />
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-6 text-emerald-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">Confidence Heatmap</p>
              <h3 className="text-2xl font-semibold text-white">{insight.confidence}%</h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70">
            Data completeness score across sentiment, pricing, ads, and marketplace telemetry.
          </p>
          <div className="mt-6">
            <div className="relative h-32 overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-white/0">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_65%)]"
                style={{ opacity: insight.confidence / 120 }}
              />
              <div className="absolute inset-x-6 bottom-4">
                <div className="h-2.5 rounded-full bg-white/10">
                  <div
                    className={cn("h-2.5 rounded-full", deriveColorScale(insight.confidence))}
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">Opportunity Score</p>
          <h3 className="mt-4 text-4xl font-semibold text-white">{insight.opportunityScore}</h3>
          <p className="mt-2 text-sm text-white/70">
            Weighted blend of trend momentum, urgency, market headroom, and margin potential.
          </p>
          <div className="mt-5 h-32 w-full rounded-2xl border border-white/10 bg-gradient-to-b from-indigo-500/20 to-transparent">
            <div className="flex h-full items-end justify-center">
              <div
                className="w-16 rounded-t-2xl bg-gradient-to-t from-indigo-500 to-sky-400"
                style={{ height: `${insight.opportunityScore}%` }}
              />
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-3">
          <div className="flex items-center gap-2 text-white">
            <BarChart3 className="size-5" />
            <h3 className="text-lg font-semibold">Automated Competitor Snapshot</h3>
          </div>
          <p className="text-sm text-white/70">
            {insight.data.meta_advertisers
              ? `Detected ${insight.data.meta_advertisers} active advertisers inside Meta. Benchmark creatives before launching.`
              : "No paid social aggressors detected. Claim positioning fast before performance marketers flood the space."}
          </p>
          <ul className="text-sm text-white/70 list-disc list-inside space-y-1">
            <li>Primary threat: {insight.platforms[0] || "Amazon best sellers"}</li>
            <li>Cross-platform proof: {insight.platforms.slice(0, 3).join(", ") || "needs capture"}</li>
            <li>Ad gap: {insight.marketSaturation || "Run lightweight validation"}</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-3">
          <div className="flex items-center gap-2 text-white">
            <AlertTriangle className="size-5" />
            <h3 className="text-lg font-semibold">Pricing Recommendation</h3>
          </div>
          <p className="text-sm text-white/70">
            Anchor launch price around {formatPrice(insight.bestSellerPrice)} and reserve {formatPrice(insight.moversPrice)} as urgency pivot.
          </p>
          <ul className="text-sm text-white/70 list-disc list-inside space-y-1">
            <li>Test bundle with +15% margin to absorb CAC spikes.</li>
            <li>Mirror best-seller reviews before discounting.</li>
            <li>Use price elasticity alerts tied to BS rank delta.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Lifecycle Detection</p>
            <h3 className="text-2xl font-semibold text-white">Predictive staging</h3>
          </div>
          <Badge className="bg-white/10 text-white">{insight.lifecycle.stage}</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {[
            { label: "Emerging", status: insight.trendScore && insight.trendScore < 50 },
            { label: "Growing", status: insight.trendScore && insight.trendScore >= 50 && insight.trendScore < 75 },
            { label: "Peaking", status: insight.trendScore && insight.trendScore >= 75 },
            { label: "Declining", status: insight.trendScore && insight.trendScore < 35 },
            { label: "Seasonal spike", status: insight.urgencyScore && insight.urgencyScore >= 60 },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "rounded-2xl border p-4 text-sm",
                item.status ? "border-emerald-400/40 bg-emerald-400/10 text-white" : "border-white/10 text-white/60"
              )}
            >
              {item.label}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-purple-300" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Marketing Angle Generator</p>
            <h3 className="text-2xl font-semibold text-white">Category-informed hooks</h3>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <AngleCard title="Hooks" items={angles.hooks} />
          <AngleCard title="Copy ideas" items={angles.copyIdeas} />
          <AngleCard title="Creative concepts" items={angles.creativeConcepts} />
          <AngleCard title="Persona messaging" items={angles.personaMessaging} />
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <div className="flex items-center gap-3">
          <Zap className="size-6 text-amber-300" />
          <h3 className="text-2xl font-semibold text-white">Social Signal Requests</h3>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {socialSignals.map((signal) => (
            <div
              key={signal.label}
              className={cn(
                "rounded-2xl border p-4",
                signal.ready ? "border-emerald-400/20 bg-emerald-400/5" : "border-white/10 bg-white/5"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{signal.label}</span>
                <Badge className={signal.ready ? "bg-emerald-500/20 text-emerald-100" : "bg-white/10 text-white"}>
                  {signal.ready ? "Ready" : "Request"}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-white/70">{signal.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Target className="size-6 text-sky-300" />
          <h3 className="text-2xl font-semibold text-white">Opportunistic Hedging Strategy</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <StrategyCard
            title="When to test"
            items={[
              "Launch micro-test ads the moment trend score crosses 55.",
              "Lock SKU quality QA before Black Friday spikes.",
            ]}
          />
          <StrategyCard
            title="When to scale"
            items={[
              "Scale once confidence heatmap stays above 70% for 48h.",
              "Allocate 60% spend to video-first UGC, 40% to PPC retargeting.",
            ]}
          />
          <StrategyCard
            title="When to avoid"
            items={[
              "Pause if market saturation flips to amber or higher.",
              "Avoid if supplier MOQs exceed cash buffer for 45 days.",
            ]}
          />
          <StrategyCard
            title="Ad budget split"
            items={[
              "40% Amazon PPC", "35% TikTok Spark Ads", "15% Meta UGC retarget", "10% Creator whitelisting",
            ]}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Layers className="size-6 text-pink-300" />
          <h3 className="text-2xl font-semibold text-white">Selling Angles & Branding Blueprint</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {sellingAngles.map((angle) => (
            <AngleCard key={angle.title} title={angle.title} items={angle.items} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-6 text-emerald-300" />
            <h3 className="text-2xl font-semibold text-white">Review Prediction Model</h3>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3 text-center">
            <ReviewStat label="Expected rating" value={`${reviewScore.toFixed(1)}/5`} />
            <ReviewStat label="Review volume (90d)" value={`${reviewVolume}+`} />
            <ReviewStat label="Days to 100 reviews" value={`${reviewTime}d`} />
          </div>
          <p className="mt-4 text-sm text-white/70">
            Projection blends category velocity, urgency score, and sentiment proxies even when live reviews are missing.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-6 text-emerald-300" />
            <h3 className="text-2xl font-semibold text-white">Supplier Brief</h3>
          </div>
          <div className="space-y-3">
            {supplierBrief.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
                <p className="text-sm text-white/70">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <ClipboardHeader />
          <h3 className="text-2xl font-semibold text-white">Next Steps Action Engine</h3>
        </div>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-3">
          <Button className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            Add to tracking queue
          </Button>
          <Button variant="outline" className="rounded-full border-white/30 text-white">
            Request social data
          </Button>
          <Button variant="outline" className="rounded-full border-white/30 text-white">
            Generate ad creatives
          </Button>
        </div>
      </section>
    </div>
  );
}

function MetricBlock({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string | null;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
        <Icon className="size-3" />
        {label}
      </div>
      <p className="mt-2 text-2xl font-semibold">
        {typeof value === "number" && !Number.isNaN(value) ? value : value ?? "—"}
      </p>
    </div>
  );
}

function AngleCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.35em] text-white/60">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-white/80">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 size-1.5 rounded-full bg-white/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StrategyCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-3 space-y-2 text-xs text-white/70 list-disc list-inside">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ReviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.35em] text-white/60">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function ClipboardHeader() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
      <AlertTriangle className="size-5" />
    </div>
  );
}
