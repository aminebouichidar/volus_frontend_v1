"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  TrendingUp, 
  Swords, 
  ArrowRight, 
  Eye,
  ShieldAlert,
  LineChart,
  Globe2,
  Bell,
  Sparkles
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import IntroAnimation from "@/components/ui/intro-animation";
import { FlippingCard } from "@/components/ui/flipping-card";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import PricingSection from "@/app/components/landing/PricingSection";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import GradientText from "@/components/ui/gradient-text";


const FEATURES = [
  {
    title: "Market Share Mapping",
    description: "Visualize exactly how much category revenue your competitors are capturing week over week.",
    icon: TrendingUp,
    color: "rgba(99, 102, 241, 0.25)",
  },
  {
    title: "Ad Spend Spy",
    description: "Reverse-engineer their paid strategy. See which keywords they bid on and which creatives they run.",
    icon: Target,
    color: "rgba(14, 165, 233, 0.25)",
  },
  {
    title: "Battlecards",
    description: "Auto-generated one-pagers comparing your product vs theirs on features, price, and sentiment.",
    icon: Swords,
    color: "rgba(168, 85, 247, 0.25)",
  },
];

const SIGNAL_SOURCES = [
  {
    id: "pricing",
    title: "Dynamic Pricing Intel",
    description: "Track every price change, discount, and promotion your competitors run across all channels.",
    icon: LineChart,
    badge: "Pricing",
    backDescription: "Get real-time alerts when competitors adjust pricing. Visualize their discount strategy against sales rank to predict their next move and stay one step ahead.",
    buttonText: "Track Pricing",
    metrics: ["Hourly price monitoring", "Promotion detection", "MAP violation alerts"],
  },
  {
    id: "ads",
    title: "Creative & Ad Vault",
    description: "See every ad creative your competitors are running across Meta, TikTok, and Google.",
    icon: Eye,
    badge: "Ads",
    backDescription: "Access a searchable library of competitor ads. Filter by format, platform, and engagement to find winning hooks and angles you can improve upon.",
    buttonText: "Spy on Ads",
    metrics: ["10M+ ads indexed", "Engagement metrics", "Copy analysis"],
  },
  {
    id: "reviews",
    title: "Sentiment Analysis",
    description: "Aggregate thousands of reviews to pinpoint exactly what customers hate about their product.",
    icon: ShieldAlert,
    badge: "Sentiment",
    backDescription: "Turn competitor weaknesses into your roadmap. Our AI surfaces recurring complaints, feature gaps, and service failures you can capitalize on.",
    buttonText: "Analyze Reviews",
    metrics: ["Multi-platform reviews", "Complaint clustering", "Opportunity scoring"],
  },
  {
    id: "inventory",
    title: "Stock & Availability",
    description: "Monitor competitor inventory levels. Strike when they're out of stock to capture demand.",
    icon: Globe2,
    badge: "Inventory",
    backDescription: "Real-time stock monitoring across marketplaces. Get alerts when competitors run low so you can increase ad spend and capture the overflow traffic.",
    buttonText: "Monitor Stock",
    metrics: ["Stock level tracking", "Out-of-stock alerts", "Restock predictions"],
  },
];

const USE_CASES = [
  {
    title: "Product Launch",
    description:
      "Don't launch in the dark. Analyze competitor feature sets, pricing tiers, and customer complaints to position your product for immediate success.",
    content: (
      <div className="h-full w-full flex items-center justify-center p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
            fill
            className="object-cover opacity-80"
            alt="Product Launch"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>
    ),
  },
  {
    title: "Marketing Campaigns",
    description:
      "Stop guessing what works. See exactly which ad creatives and copy angles are driving conversions for your rivals, then do it better.",
    content: (
      <div className="h-full w-full flex items-center justify-center p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1000&auto=format&fit=crop"
            fill
            className="object-cover opacity-80"
            alt="Marketing Campaigns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>
    ),
  },
  {
    title: "Inventory Planning",
    description:
      "Predict demand spikes by monitoring competitor stock-outs. When they run out, you step in to capture the overflow traffic.",
    content: (
      <div className="h-full w-full flex items-center justify-center p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
            fill
            className="object-cover opacity-80"
            alt="Inventory Planning"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>
    ),
  },
  {
    title: "Pricing Strategy",
    description:
      "Never get undercut again. Monitor real-time pricing across all your competitors and adjust your strategy to maximize margins while staying competitive.",
    content: (
      <div className="h-full w-full flex items-center justify-center p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop"
            fill
            className="object-cover opacity-80"
            alt="Pricing Strategy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>
    ),
  },
  {
    title: "Brand Positioning",
    description:
      "Understand exactly how customers perceive you vs. competitors. Use sentiment data to craft messaging that highlights your unique advantages.",
    content: (
      <div className="h-full w-full flex items-center justify-center p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
            fill
            className="object-cover opacity-80"
            alt="Brand Positioning"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>
    ),
  },
];

const TESTIMONIALS = [
  {
    quote: "Volus helped us identify a gap in the market that our main competitor was ignoring. We launched a feature to address it and saw a 40% conversion lift.",
    name: "Sarah Jenkins",
    role: "Head of Product at TechFlow",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    quote: "The ad spy feature is insane. We literally just looked at what was working for them, improved the creative, and lowered our CPA by half.",
    name: "Marcus Chen",
    role: "Growth Lead at ScaleUp",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "I used to spend hours manually checking competitor prices. Now I get a Slack alert whenever they change a SKU. Game changer.",
    name: "Elena Rodriguez",
    role: "E-commerce Manager",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const STATS = [
  { label: "Competitors Tracked", value: "50K+" },
  { label: "Price Changes / Day", value: "2.1M" },
  { label: "Avg. Revenue Lift", value: "18%" },
];


function BackgroundAura() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-blue-950/40" />
      <div className="absolute -top-1/3 left-1/4 w-[60vw] h-[60vw] bg-blue-600/15 blur-[200px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-cyan-500/10 blur-[180px] rounded-full" />
      <div className="absolute top-1/2 left-0 w-[30vw] h-[30vw] bg-purple-600/10 blur-[150px] rounded-full" />
    </div>
  );
}

function AnimatedStat({ label, value, delay = 0 }: { label: string; value: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </motion.div>
  );
}

interface SignalData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  backDescription: string;
  buttonText: string;
  metrics: string[];
}

function SignalCardFront({ data }: { data: SignalData }) {
  const Icon = data.icon;
  return (
    <div className="flex flex-col h-full w-full p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-transparent">
          <Icon className="w-7 h-7 text-blue-300" />
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-blue-300 font-semibold px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10">
          {data.badge}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{data.title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed flex-grow">
        {data.description}
      </p>
      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Hover to explore capabilities
        </p>
      </div>
    </div>
  );
}

function SignalCardBack({ data }: { data: SignalData }) {
  return (
    <div className="flex flex-col justify-between h-full w-full p-8">
      <div>
        <p className="text-sm text-gray-200 leading-relaxed mb-6">
          {data.backDescription}
        </p>
        <div className="space-y-3 mb-6">
          {data.metrics.map((metric, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
              <span>{metric}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25">
        {data.buttonText}
      </button>
    </div>
  );
}

export default function CompetitorAnalysisPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const isDisabled = useMemo(() => !query.trim(), [query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery) return;
    router.push(`/insights?query=${encodeURIComponent(nextQuery)}`);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <BackgroundAura />
      
      <main className="relative z-10">
        <SiteNavbar variant="marketing" />

        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-28 pb-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-blue-300 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Competitor Intelligence
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
                Know Their Next Move{" "}
                <br className="hidden sm:block" />
                <GradientText
                  colors={["#60a5fa", "#38bdf8", "#a78bfa", "#60a5fa"]}
                  animationSpeed={4}
                  showBorder={false}
                  className="inline-flex"
                >
                  Before They Make It
                </GradientText>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Stop guessing. See your competitors&apos; sales velocity, ad spend, pricing strategy, and customer complaints in one unified dashboard.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Enter a competitor brand or product..."
                    className="flex-1 bg-white/5 border border-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 text-gray-100 rounded-full px-6 py-4 outline-none transition text-base"
                    aria-label="Competitor search"
                  />
                  <Button
                    type="submit"
                    disabled={isDisabled}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-full h-auto text-base shadow-lg shadow-blue-500/25 transition-all duration-300"
                  >
                    Analyze <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-3">Compare up to 5 competitors instantly. No credit card required.</p>
              </form>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 h-12 rounded-full text-base shadow-lg shadow-blue-500/25" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white bg-white/5 hover:bg-white/10 px-8 h-12 rounded-full text-base backdrop-blur"
                  asChild
                >
                  <Link href="/help">Book Demo</Link>
                </Button>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {STATS.map((stat, i) => (
                <AnimatedStat key={stat.label} label={stat.label} value={stat.value} delay={0.5 + i * 0.1} />
              ))}
            </motion.div>

            {/* Platform Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 pt-10 border-t border-white/10 max-w-3xl mx-auto"
            >
              <p className="text-sm font-medium text-gray-400 mb-6 text-center">Real-time monitoring across</p>
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                {["Amazon", "eBay", "Walmart", "Target", "TikTok Shop", "Meta Ads"].map((platform) => (
                  <span key={platform} className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-default">
                    {platform}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">
                Core Features
              </span>
              <h2 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Everything You Need to Outmaneuver the Competition
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                From pricing intelligence to ad creative analysis, get the full picture of your competitive landscape.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <SpotlightCard className="p-8 h-full flex flex-col gap-4" spotlightColor={feature.color}>
                      <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-blue-300 border border-blue-500/20">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-300">{feature.description}</p>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="relative w-full py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-center max-w-3xl mx-auto mb-12 px-6 relative z-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-amber-300">
              Interactive Demo
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              See the Unseen
            </h2>
            <p className="text-lg text-gray-400">
              Explore the data points that give you the competitive edge.
            </p>
          </motion.div>
          <div className="h-[800px] w-full relative">
            <IntroAnimation />
          </div>
        </section>

        {/* Signal Sources Section */}
        <section className="relative px-6 py-24 sm:px-10 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-purple-300">
                Deep Dive
              </span>
              <h2 className="mt-6 text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Intelligence That Goes Beyond Surface Level
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Each signal source is normalized, deduplicated, and attributed back to brand, SKU, region, and campaign for actionable insights.
              </p>
            </motion.header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center max-w-5xl mx-auto">
              {SIGNAL_SOURCES.map((signal, i) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <FlippingCard
                    width={400}
                    height={380}
                    frontContent={<SignalCardFront data={signal} />}
                    backContent={<SignalCardBack data={signal} />}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="relative px-6 py-24 sm:px-10">
          {/* Subtle background gradient for section depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-emerald-300">
                Use Cases
              </span>
              <h2 className="mt-6 text-3xl md:text-5xl font-bold text-white">Built for Every Stage of Growth</h2>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                Whether you&apos;re launching your first product or dominating a category, Volus gives you the intelligence to win.
              </p>
            </motion.div>
            <div className="w-full">
              <StickyScroll content={USE_CASES} />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* Testimonials */}
        <section className="relative px-6 py-24 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 mb-4">Success Stories</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Trusted by Growth Teams Worldwide</h2>
            </motion.div>
            <TestimonialSlider testimonials={TESTIMONIALS} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative px-6 pb-24 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto rounded-[40px] border border-white/10 bg-gradient-to-br from-blue-950/50 via-black to-purple-950/30 p-12 md:p-16 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-blue-300 mb-6">
                <Bell className="w-3.5 h-3.5" />
                Limited Time
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Ready to Steal Market Share?
              </h2>
              <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                Our users see an average of <strong className="text-white">18% revenue lift</strong> by identifying competitor stock-outs and capitalizing on their negative reviews.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 h-14 rounded-full px-10 text-lg font-semibold shadow-lg shadow-blue-500/25" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 rounded-full px-10 text-lg" asChild>
                  <Link href="/help">Talk to Sales</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-gray-500">No credit card required · 14-day free trial · Cancel anytime</p>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
