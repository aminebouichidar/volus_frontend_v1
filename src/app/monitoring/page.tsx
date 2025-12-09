'use client';

import { motion } from 'motion/react';
import Lenis from 'lenis';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SiteNavbar } from '@/components/navigation/SiteNavbar';
import Footer from '../components/Footer';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import PricingSection from '../components/landing/PricingSection';
import { Button } from '@/components/ui/button';

const heroStats = [
  { label: 'Data sources monitored', value: '42+', detail: 'E-commerce, social media, news, blogs' },
  { label: 'Signals filtered daily', value: '2.3B', detail: 'Noise eliminated, insights delivered' },
  { label: 'Decision-ready insights', value: '<90s', detail: 'From raw data to clear action' },
  { label: 'Automations triggered', value: '120K', detail: 'Insights routed to emails, APIs' },
];

const channelClusters = [
  {
    title: 'E-commerce platforms',
    description: 'Amazon, Shopify, Etsy, eBay, and regional marketplaces, tracking prices, inventory, reviews, and seller behavior in real time.',
    tags: ['Price tracking', 'Stock alerts', 'Review sentiment'],
  },
  {
    title: 'Social media pulse',
    description: 'TikTok, Instagram, X, Reddit, Facebook, capturing trending conversations, influencer mentions, and community sentiment shifts.',
    tags: ['Trend detection', 'Influencer mentions', 'Community mood'],
  },
  {
    title: 'Video & creator economy',
    description: 'YouTube, Shorts, Reels, analyzing video mentions, engagement metrics, and creator-driven product buzz.',
    tags: ['Creator mentions', 'Engagement tracking', 'Viral moments'],
  },
  {
    title: 'News & industry insights',
    description: 'Global news wires, trade publications, blogs, Substack, monitoring breaking news, regulatory changes, and market shifts.',
    tags: ['Breaking news', 'Regulatory alerts', 'Market intelligence'],
  },
  {
    title: 'Customer feedback channels',
    description: 'App store reviews, support tickets, forums, Q&A sites, extracting pain points, feature requests, and sentiment patterns.',
    tags: ['Pain points', 'Feature requests', 'Support insights'],
  },
  {
    title: 'Competitor intelligence',
    description: 'Tracking competitor pricing, product launches, marketing campaigns, and customer reception across all monitored channels.',
    tags: ['Competitive pricing', 'Launch tracking', 'Market positioning'],
  },
];

const signalStories = [
  {
    title: 'Noise filtering intelligence',
    body: 'We collect billions of data points daily, then use NLP and sentiment analysis to eliminate irrelevant noise and surface only actionable insights that drive decisions.',
  },
  {
    title: 'Multi-source correlation',
    body: 'Price changes, social sentiment, news events, and competitor moves are automatically correlated and contextualized so you understand the full picture behind every trend.',
  },
  {
    title: 'Confidence-scored recommendations',
    body: 'Every insight comes with confidence scores and supporting evidence, helping both solo builders and enterprise teams make data-backed decisions with clarity.',
  },
];

const coverageMatrix = [
  {
    family: 'E-commerce platforms',
    entries: ['Amazon (retail + 3P marketplace)', 'Shopify stores', 'Target & big-box retailers', 'Etsy & handmade marketplaces'],
  },
  {
    family: 'Social media & communities',
    entries: ['TikTok & Instagram shops', 'Reddit discussions', 'Discord servers', 'Twitter/X trends', 'Facebook groups & marketplace'],
  },
  {
    family: 'News & industry media',
    entries: ['Bloomberg, Reuters, CNBC', 'Google News clusters', 'Industry-specific blogs', 'Substack newsletters', 'Trade publications'],
  },
  {
    family: 'Video & creator economy',
    entries: ['YouTube channels & Shorts', 'Creator product reviews', 'Unboxing videos', 'Tutorial content', 'Live shopping streams'],
  }
];

const productSignals = [
  {
    title: 'Real-time sentiment analysis',
    description: 'Advanced NLP algorithms process customer reviews, social mentions, and forum discussions to extract sentiment patterns and emotional drivers.',
    metric: 'NLP-powered',
  },
  {
    title: 'Intelligent data filtering',
    description: 'Machine learning models eliminate spam, bots, and irrelevant noise keeping only verified, meaningful data that impacts your products.',
    metric: 'AI-filtered',
  },
  {
    title: 'Cross-channel insights',
    description: 'Correlate price changes on e-commerce platforms with social buzz, news coverage, and competitor actions to reveal hidden opportunities.',
    metric: 'Multi-source',
  },
];

const parallaxImages = [
  { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80', alt: 'Marketplace dashboards' },
  { src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80', alt: 'Ecommerce warehouse' },
  { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', alt: 'Social media stream' },
  { src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1600&q=80', alt: 'Financial newsroom' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80', alt: 'Control center' },
  { src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80', alt: 'Developer analytics' },
  { src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80', alt: 'Video waveform' },
];

export default function MultiChannelMonitoringPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      lerp: 0.08,
    });

    let raf: number;
    const rafLoop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(rafLoop);
    };

    raf = requestAnimationFrame(rafLoop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const gradientBackground = useMemo(
    () => (
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_55%)]" />
    ),
    []
  );

  return (
    <div className="min-h-screen bg-[#03000A] text-white">
      <SiteNavbar variant="marketing" />
    <main>
        <Hero />
        <ChannelRibbon />
  <section className="relative px-4 py-20 sm:px-6 sm:py-24" id="monitoring">
          {gradientBackground}
          <div className="relative z-10 mx-auto max-w-6xl space-y-16">
            {/* <IntroGrid /> */}
            <ChannelGrid />
            <ProductLens />
          </div>
        </section>
                <PricingSection />

        <section className="relative bg-transparent px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center space-y-4"
            >
              <p className="text-xs uppercase tracking-[0.5em] text-indigo-200/70">Monitoring in action</p>
              <h2 className="text-3xl font-semibold text-balance sm:text-4xl">See the data sources we track, visualized</h2>
              <p className="text-base text-gray-300">
                From e-commerce platforms to social media feeds, news outlets to YouTube channels, explore the diverse data landscape we monitor 24/7 to deliver your insights.
              </p>
            </motion.div>
          </div>
        </section>
        <ZoomParallax images={parallaxImages} />
        <InsightsStrata />
        {/* <CoverageTable /> */}
        <PulseCTA />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
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
    <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12),_transparent_65%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-indigo-600/30 blur-[160px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-purple-600/20 blur-[180px]" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-stretch">
        <div className="w-full space-y-8 lg:w-1/2">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-cyan-200"
          >
            Multi-channel monitoring
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
            Always-on
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Turn billions of noisy signals into clear, actionable insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base text-gray-300 max-w-2xl sm:text-lg"
          >
            We monitor 42+ data sources e-commerce platforms, social media, news, blogs, and YouTube, filtering out spam and noise with advanced NLP and sentiment analysis. Get decision-ready insights in under 90 seconds, whether you&apos;re a solo builder or a Fortune 500 team.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onSubmit={handleSubmit}
            className="mt-6 max-w-lg space-y-3"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Monitor a brand or topic..."
                className="flex-1 bg-white/5 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 text-gray-100 rounded-full px-5 py-3 outline-none transition"
                aria-label="Monitoring search"
              />
              <Button
                type="submit"
                disabled={isDisabled}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-full h-auto"
              >
                Track
              </Button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/signup" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_45px_rgba(255,255,255,0.25)]">
              Start free trial
            </Link>
            <Link href="/contact" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white">
              Schedule demo
            </Link>
          </motion.div>
        </div>
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:w-1/2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_20px_60px_rgba(3,0,20,0.35)]"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.5em] text-white/60">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{stat.value}</p>
                </div>
                <p className="mt-4 text-sm text-gray-300">{stat.detail}</p>
              </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelRibbon() {
  const channels = ['Amazon', 'Shopify', 'Etsy', 'TikTok Shop', 'YouTube', 'Reddit', 'CNBC', 'BBC', 'Instagram', 'Facebook', 'Ebay', 'Custom Blogs'];

  return (
    <section className="relative border-y border-white/5 bg-black/40 py-6 overflow-hidden">
      <motion.div
        className="flex items-center gap-8 text-sm uppercase tracking-[0.6em] text-white/60"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
        style={{ width: 'max-content' }}
      >
        {channels.concat(channels).map((item, idx) => (
          <span key={`${item}-${idx}`} className="inline-flex items-center gap-4">
            {item}
            <span className="h-[1px] w-12 bg-white/20" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function IntroGrid() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-5"
      >
        <p className="text-xs uppercase tracking-[0.5em] text-indigo-200/70">How it works</p>
        <h2 className="text-3xl font-semibold text-balance sm:text-4xl">Intelligent monitoring designed for everyone—from solo founders to Fortune 500 teams</h2>
        <p className="text-sm text-gray-300 sm:text-base">
          Beautiful, intuitive dashboards meet powerful AI-driven analysis. Connect your data sources and let our natural language processing and sentiment analysis do the heavy lifting—no data science degree required.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {signalStories.map((story) => (
            <div key={story.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(5,2,14,0.35)]">
              <p className="text-sm uppercase tracking-[0.4em] text-indigo-200/80">{story.title}</p>
              <p className="mt-3 text-sm text-gray-200">{story.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-[32px] border border-white/10 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10 p-8"
      >
  <h3 className="text-2xl font-semibold sm:text-3xl">Always-on data intelligence</h3>
        <p className="mt-4 text-sm text-gray-300 sm:text-base">
          Our AI continuously monitors your connected sources, processing millions of signals to identify what matters. When prices shift, sentiment changes, or trends emerge, you&apos;ll know instantly with context and confidence scores.
        </p>
        <ul className="mt-6 space-y-4 text-sm text-gray-200">
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Multi-source correlation reveals hidden patterns
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            Confidence scoring helps you act with certainty
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
            Instant alerts deliver insights the moment they emerge
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

function ChannelGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {channelClusters.map((cluster, idx) => (
        <motion.div
          key={cluster.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05, duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/30 transition-colors duration-300"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-indigo-200/70">{String(idx + 1).padStart(2, '0')}</p>
          <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{cluster.title}</h3>
          <p className="mt-3 text-sm text-gray-300">{cluster.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {cluster.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProductLens() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-[36px] border border-white/10 bg-black/30 px-8 py-10"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="lg:w-1/3 space-y-3">
          <p className="text-xs uppercase tracking-[0.5em] text-cyan-200/80">Intelligence that understands context</p>
          <h3 className="text-2xl font-semibold text-balance sm:text-3xl">From raw data to confident decisions</h3>
          <p className="text-sm text-gray-300 sm:text-base">
            Our AI doesn&apos;t just collect data; it understands it. Using natural language processing and sentiment analysis, we transform millions of data points into insights you can trust, whether you&apos;re tracking product performance, competitive moves, or market trends.
          </p>
        </div>
        <div className="grid flex-1 gap-6 sm:grid-cols-3">
          {productSignals.map((signal) => (
            <div key={signal.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(3,0,20,0.35)]">
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/60">{signal.metric}</p>
              <h4 className="mt-3 text-xl font-semibold text-white">{signal.title}</h4>
              <p className="mt-2 text-sm text-gray-300">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function InsightsStrata() {
  const strata = [
    {
      title: 'Raw data ingestion',
      copy: '42+ sources monitored: E-commerce platforms, social networks, news sites, blogs, YouTube channels, and customer feedback systems.',
    },
    {
      title: 'Noise filtering & NLP',
      copy: 'Advanced NLP and sentiment analysis remove spam, bots, and irrelevant chatter keeping only verified, meaningful data.',
    },
    {
      title: 'Decision-ready insights',
      copy: 'Machine learning correlates cross-channel patterns and delivers confidence-scored recommendations in under 90 seconds.',
    },
  ];

  return (
  <section className="relative bg-gradient-to-b from-[#040112] to-[#060016] px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-indigo-200/70">The transformation process</p>
          <h2 className="text-3xl font-semibold text-balance sm:text-4xl">Three layers that turn noise into clarity</h2>
          <p className="text-sm text-gray-300 sm:text-base">
            Our intelligent pipeline processes billions of signals daily, filtering out what doesn&apos;t matter and highlighting what does—so you can make confident decisions faster.
          </p>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-3">
          {strata.map((layer, idx) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6"
            >
              <div className="text-xs uppercase tracking-[0.4em] text-white/60">Layer {idx + 1}</div>
              <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{layer.title}</h3>
              <p className="mt-3 text-sm text-gray-300">{layer.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CoverageTable() {
  return (
  <section className="relative px-4 py-20 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(147,51,234,0.15),_transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-10">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-indigo-200/70">Data sources we monitor</p>
          <h2 className="text-3xl font-semibold text-balance sm:text-4xl">42+ sources, one unified intelligence platform</h2>
          <p className="text-sm text-gray-300 sm:text-base">
            From major e-commerce platforms to emerging social channels, we monitor the data sources that matter to your business—all in one place.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {coverageMatrix.map((column) => (
            <div key={column.family} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">{column.family}</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                {column.entries.map((entry) => (
                  <li key={entry} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PulseCTA() {
  return (
  <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-sky-500/10 to-purple-600/20 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-white/70">Ready to eliminate the noise?</p>
        <h2 className="text-3xl font-semibold text-balance sm:text-4xl">Start getting decision-ready insights in under an hour</h2>
        <p className="text-sm text-white/80 sm:text-base">
          Connect your data sources, e-commerce platforms, social media, news feeds, or custom APIs, and let our AI filter billions of signals to deliver only what matters. Built for solo builders and enterprise teams alike.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/signup" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg">
            Start free trial
          </Link>
          <Link href="/demo" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white">
            Schedule a demo
          </Link>
        </div>
      </div>
    </section>
  );
}
