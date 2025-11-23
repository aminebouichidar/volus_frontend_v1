
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-underline-text";
import { DynamicNarrative } from "./components/DynamicNarrative";
import { AnimatedStat } from "./components/AnimatedStat";
import { LiveEmotionGrid } from "./components/LiveEmotionGrid";
import { AnimatedValueSection } from "./components/AnimatedValueSection";
import { FlippingCard } from "@/components/ui/flipping-card";
import PricingSection from "../components/landing/PricingSection";
import {
  Activity,
  Globe2,
  MessageSquareHeart,
  Radar,
} from "lucide-react";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import Footer from "../components/Footer";

const signalSources = [
  {
    id: "marketplace",
    title: "Marketplace Pulse",
    description:
      "Amazon, eBay, Walmart, Etsy velocity paired with review tone to expose product perception and stock health.",
    icon: Globe2,
    badge: "Commerce",
    backDescription:
      "Track real-time pricing shifts, inventory levels, and review sentiment across major e-commerce platforms. Our AI correlates velocity changes with emotional signals to predict demand curves.",
    buttonText: "Explore Commerce Signals",
    metrics: ["15M+ SKUs tracked", "Real-time price monitoring", "Review sentiment analysis"],
  },
  {
    id: "social",
    title: "Social & Creator Streams",
    description:
      "TikTok, Instagram, X, Twitch, and Discord sentiment stitched with influencer reach to quantify hype before it peaks.",
    icon: MessageSquareHeart,
    badge: "Community",
    backDescription:
      "Monitor viral trends, influencer campaigns, and community conversations. Measure authentic engagement vs. paid promotion to validate creator partnerships.",
    buttonText: "See Social Intelligence",
    metrics: ["500K+ creators tracked", "Viral trend detection", "Engagement authenticity"],
  },
  {
    id: "video",
    title: "Video & Search",
    description:
      "YouTube narrative mining plus Google/Pinterest intent signals to reveal emerging demand themes.",
    icon: Radar,
    badge: "Intent",
    backDescription:
      "Extract narrative themes from millions of videos and search queries. Identify emerging product categories and seasonal shifts before competitors.",
    buttonText: "Discover Intent Signals",
    metrics: ["2M+ videos analyzed", "Search trend forecasting", "Category emergence alerts"],
  },
  {
    id: "ops",
    title: "Service & Ops",
    description:
      "Returns, support tickets, NPS, and warranty data correlate experience issues with emotional swings in the market.",
    icon: Activity,
    badge: "Care",
    backDescription:
      "Connect operational friction to market sentiment. Predict churn risk and identify product issues before they become viral complaints.",
    buttonText: "Monitor Operations",
    metrics: ["10K+ support tickets/day", "NPS correlation", "Churn prediction"],
  },
];

export default function SentimentPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <BackgroundAura />
      <main className="relative z-10">
        <SiteNavbar variant="marketing" />
        <Hero />
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
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-slate-950" />
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] bg-purple-600/20 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[45vw] h-[45vw] bg-cyan-500/20 blur-[200px]" />
    </div>
  );
}

function Hero() {
  const stats = [
    { label: "Signals / min", value: "2.4M" },
    { label: "Platforms", value: "38" },
    { label: "Sentiment accuracy", value: "96%" },
  ];

  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-24 sm:px-10">
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-indigo-200">
            Sentiment Analysis Suite
          </div>
          <div className="mt-6">
            <AnimatedText
              text="Track Every Emotion Across Platforms in Real Time"
              highlightText="in Real Time"
              textClassName="text-4xl sm:text-5xl lg:text-6xl text-center font-semibold tracking-tight leading-tight text-white"
              underlineClassName="text-indigo-400"
              underlineDuration={1.3}
            />
          </div>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl">
            Volus AI fuses marketplace data, social buzz, and operational signals into one emotional truth so your team can respond before trends hit the headlines.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 h-12 rounded-full text-base">
              <Link href="/signup">Start 14-day Trial</Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-slate-800 bg-white/80 hover:text-white hover:bg-white/10 px-8 h-12 rounded-full text-base"
              asChild
            >
              <Link href="/contact">Book Session</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Need the full breakdown? <a href="#pricing" className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4">Check the pricing section</a> to see exactly what every tier unlocks.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} label={stat.label} targetValue={stat.value} />
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/10 blur-3xl" />
          <div className="relative rounded-[32px] border border-white/10 bg-white/5/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Emotion Heatmap</span>
              <span className="text-emerald-300">Live</span>
            </div>
            <LiveEmotionGrid />
            <DynamicNarrative />
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalSection() {
  return (
    <section className="relative px-6 py-20 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">
            Signals
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-white">
            One Canvas for Every Customer Touchpoint
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Blend qualitative emotion with quantitative performance. Each source is normalized, deduped, and attributed back to brand, SKU, region, and campaign.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center max-w-4xl mx-auto">
          {signalSources.map((signal) => (
            <FlippingCard
              key={signal.id}
              width={380}
              height={400}
              frontContent={<SignalCardFront data={signal} />}
              backContent={<SignalCardBack data={signal} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface SignalCardFrontProps {
  data: typeof signalSources[0];
}

function SignalCardFront({ data }: SignalCardFrontProps) {
  const Icon = data.icon;
  return (
    <div className="flex flex-col h-full w-full p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40">
          <Icon className="w-6 h-6 text-indigo-300" />
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-indigo-300 font-semibold">
          {data.badge}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{data.title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed flex-grow">
        {data.description}
      </p>
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500 italic">Hover to see capabilities →</p>
      </div>
    </div>
  );
}

interface SignalCardBackProps {
  data: typeof signalSources[0];
}

function SignalCardBack({ data }: SignalCardBackProps) {
  return (
    <div className="flex flex-col justify-between h-full w-full p-6">
      <div>
        <p className="text-sm text-gray-200 leading-relaxed mb-6">
          {data.backDescription}
        </p>
        <div className="space-y-2 mb-6">
          {data.metrics.map((metric, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              <span>{metric}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/25">
        {data.buttonText}
      </button>
    </div>
  );
}

function TestimonialSection() {
  return (
    <section className="relative px-6 py-20 sm:px-10">
      <div className="max-w-4xl mx-auto rounded-[32px] border border-white/10 bg-white/5/5 p-10 text-center backdrop-blur">
        <p className="text-sm uppercase tracking-[0.4em] text-indigo-300">What leaders say</p>
        <p className="mt-6 text-2xl sm:text-3xl text-gray-200">
          &ldquo;Volus AI condensed millions of chaotic comments into a single emotional storyline. Our retention task force shaved three months off their roadmap because we finally knew what mattered.&rdquo;
        </p>
        <p className="mt-4 text-sm text-gray-400">Chief Executive Officer · Kuai Sourcing Ltd.</p>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative px-6 pb-24 sm:px-10">
      <div className="max-w-5xl mx-auto rounded-[40px] border border-white/10 bg-gradient-to-br from-purple-900 via-black to-black p-12 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.4em] text-gray-300">Ready to understand emotion</p>
        <h2 className="mt-6 text-3xl sm:text-4xl font-semibold">
          Bring one emotional truth to every leadership conversation.
        </h2>
        <p className="mt-4 text-gray-300">
          Launch a pilot in <strong className="text-white">72 hours</strong> with curated dashboards, alerts, and strategy rituals led by our analyst pod.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 h-12 rounded-full px-10 text-base">
            
             <Link href="/help">Talk to Revenue Team</Link>
          </Button>
          <Button variant="outline" className="border-white/40 text-slate-800 hover:text-white hover:bg-white/10 h-12 rounded-full px-10 text-base" asChild>
            <Link href="/signup">Start free trial</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
