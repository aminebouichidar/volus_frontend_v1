'use client';

import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContainerScroll, CardSticky } from '@/components/blocks/cards-stack';
import { SiteNavbar } from '@/components/navigation/SiteNavbar';
import PricingSection from '../components/landing/PricingSection';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const heroStats = [
  { label: 'Signals reconciled each minute', value: '31K' },
  { label: 'Average revenue lift', value: '+41%' },
  { label: 'Markets actively trained', value: '27' },
];

const capabilityPillars = [
  {
    title: 'Unified signal fabric',
    body:
      'Commerce telemetry, ad spend, ops health, and macro noise flow into one clean stream with confidence scores anyone can read.',
  },
  {
    title: 'Narrative-grade forecasting',
    body:
      'Explainable ensembles paint clear upside, and base stories so solo leads and enterprise teams know what happens next.',
  },
  {
    title: 'Autonomous playbooks',
    body:
      'Insights ship with suggested actions and owners, so placing POs, refreshing creative, or pausing spend takes one click.',
  },
];

const processPhases = [
  {
    id: 'phase-1',
    title: 'Unified telemetry uplink',
    description:
      'Volus ingests SKU velocity, paid media shifts, creator chatter, and freight signals, stitching them into a single latency-aware stream.',
  },
  {
    id: 'phase-2',
    title: 'Context window tuning',
    description:
      'Adaptive context learns promo cadence, margins, and vendor habits to highlight only the signals that actually move your model.',
  },
  {
    id: 'phase-3',
    title: 'Narrative trajectory forge',
    description:
      'Rolling 2, 6, and 12-week curves call out tipping points, scenario gaps, and the exact levers bending the line.',
  },
  {
    id: 'phase-4',
    title: 'Adaptive action sequencer',
    description:
      'Volus routes instructions with PO quantities, creative briefs, budget shifts, and guardrails straight into Slack, email, or your ops queue.',
  },
];

const signalBursts = [
  {
    label: 'Discovery velocity',
    detail: 'TikTok Shop conversions up 38% in 36h with a green light to restock hero bundles.',
  },
  {
    label: 'Sentiment inflection',
    detail: 'Amazon review halo forecast from 4.0 → 4.5, flagging copy tweaks that drove the spike.',
  },
  {
    label: 'Media efficiency',
    detail: 'Meta CPM glidepath -16% after creator remix push, tagged with best performing hooks.',
  },
  {
    label: 'Margin guardrail',
    detail: 'Freight spot rates dipping 11% through Q2, warning finance before the curve rebounds.',
  },
];

const gallerySpotlight = {
  eyebrow: 'Spotlight cut',
  badge: 'Forecast pulse · Week 06',
  title: 'Live storyboard panels exported straight from Volus AI.',
  description:
    'Annotated frames surface demand curves, cash velocity, and the simple adjustments ops or a solo founder should make before the next standup.',
  statLabel: 'Decisions pulled forward',
  statValue: '14 days',
  image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
};

const galleryMoments = [
  {
    id: 'gallery-1',
    label: 'Ops vignette',
    title: 'Replenishment runway composer',
    description: 'Vendor SLAs, buffer stock, and SKU velocity stitch into a single ribbon so supply leads know exactly when to accelerate POs.',
    stat: '+9 days runway',
    clipPath: 'polygon(0% 0%, 100% 6%, 95% 100%, 0% 94%)',
    gradient: 'linear-gradient(145deg, rgba(5,2,14,0.7), rgba(5,2,14,0.3))',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gallery-2',
    label: 'Growth pulse',
    title: 'Creative fatigue radar',
    description: 'Engagement decay, audition cost, and fresh asset lift are layered to show which concepts deserve more spend.',
    stat: '-18% CPM',
    clipPath: 'polygon(0% 10%, 100% 0%, 100% 90%, 6% 100%)',
    gradient: 'linear-gradient(160deg, rgba(5,2,14,0.7), rgba(5,2,14,0.25))',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gallery-3',
    label: 'Finance note',
    title: 'Contribution margin guardrail',
    description: 'Margin levers animate with every scenario so finance can greenlight upside pushes without breaking cash constraints.',
    stat: '+4.2 pts margin',
    clipPath: 'polygon(0% 0%, 100% 0%, 94% 100%, 0% 86%)',
    gradient: 'linear-gradient(140deg, rgba(5,2,14,0.75), rgba(5,2,14,0.35))',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
  },
];

function useReveal<T extends HTMLElement = HTMLElement>(amount = 0.3) {
  const ref = useRef<T | null>(null);
  const isInView = useInView(ref, { once: true, amount });

  return { ref, isInView };
}

export default function PredictiveForecastingPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.08,
      smoothWheel: true,
    });

    let lenisScroll = window.scrollY;
    const handleLenisScroll = ({ scroll }: { scroll: number }) => {
      lenisScroll = scroll;
      ScrollTrigger.update();
    };

    lenis.on('scroll', handleLenisScroll);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenisScroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    const handleRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', handleRefresh);

    const gradientTweens: gsap.core.Tween[] = [];
    const sections = gsap.utils.toArray<HTMLElement>('[data-gradient-section]');
    sections.forEach((section) => {
      const gradientLayer = section.querySelector<HTMLElement>('[data-gradient-layer]');
      if (!gradientLayer) return;

      const tween = gsap.fromTo(
        gradientLayer,
        { opacity: 0.15, yPercent: 10, filter: 'blur(24px)' },
        {
          opacity: 0.9,
          yPercent: 0,
          filter: 'blur(0px)',
          ease: 'linear',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'bottom 10%',
            scrub: true,
          },
        }
      );

      gradientTweens.push(tween);
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener('refresh', handleRefresh);
      gradientTweens.forEach((tween) => tween.kill());
      cancelAnimationFrame(rafId);
      lenis.off('scroll', handleLenisScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#05020E] text-white">
      <SiteNavbar variant="marketing" />
      <Hero />
      <CapabilityGrid />
      <PredictiveLoop />
      <MediaGallery />
      <SignalStream />
      <PricingBridge />
      <CallToAction />
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
    <section className="relative overflow-hidden" data-gradient-section>
      <div className="pointer-events-none absolute inset-0 opacity-60" data-gradient-layer>
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/30 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/3 rounded-full bg-purple-600/20 blur-[180px]" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-32 lg:flex-row lg:items-center">
        <div className="max-w-2xl space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm uppercase tracking-[0.5em] text-indigo-200/80"
          >
            Forecasting in your dashboard
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-semibold leading-snug text-balance sm:text-5xl"
            >
                See the next turn <span className="text-indigo-500">before anyone else</span>, from solo founders to global teams.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-300"
          >
            Volus AI blends commerce telemetry, audience mood, spend efficiency, and macro pressure into rolling stories the whole team can act on, no data science degree required.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onSubmit={handleSubmit}
            className="max-w-lg space-y-3"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Forecast a product or category..."
                className="flex-1 bg-white/5 border border-white/15 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 text-gray-100 rounded-full px-5 py-3 outline-none transition"
                aria-label="Forecasting search"
              />
              <Button
                type="submit"
                disabled={isDisabled}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-full h-auto"
              >
                Predict
              </Button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/signup"
              className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Watch live predictions
            </Link>
            <Link
              href="/demo"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold tracking-wide text-white/80 hover:text-white"
            >
              Share with your CTO
            </Link>
          </motion.div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          {heroStats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{stat.label}</p>
            </div>
          ))}
          <div className="col-span-3 rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-indigo-200/70">Latest projection</p>
            <p className="mt-2 text-sm text-gray-300">
              Signal stack shows +22% upside when the creator blitz pairs with faster inbound freight before the buffer slips under 2.1 weeks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityGrid() {
  const { ref, isInView } = useReveal<HTMLElement>(0.35);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mx-auto px-6 py-24"
      data-gradient-section
    >
      {/* Smooth transition to next section - unified hue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-[#05020E]/60 to-[#05020E]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-20 h-20 translate-y-1/2 bg-gradient-to-b from-transparent via-[#05020E]/50 to-[#05020E]/80 blur-xl" />
      
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent"
        data-gradient-layer
      />
      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-indigo-200/70">Command center</p>
          <h2 className="text-4xl font-semibold text-balance">A forecasting stack ready for fast teams</h2>
          <p className="text-gray-400 text-base">
            Clear tiles for founders, deep controls for analysts. Automations hand you context, ratios, and owners before the next standup begins.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {capabilityPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.12, duration: 0.6 }}
              className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_20px_60px_rgba(2,6,23,0.5)]"
            >
              <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">{pillar.body}</p>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-indigo-200/80">
                <span className="h-0.5 w-10 bg-indigo-400" />
                Always-on
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function PredictiveLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section background gradient on scroll
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0.8 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );

      // Animate left column text
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 70%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate cards individually
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.9,
            y: 60,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-transparent py-20 -mt-20">
      {/* Smooth transition overlays unified to deep indigo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#05020E] via-[#05020E]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -top-20 h-20 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#05020E]/50 to-transparent blur-2xl" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-[#05020E]/45 to-[#05020E]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-20 h-20 translate-y-1/2 bg-gradient-to-b from-transparent via-[#05020E]/50 to-[#05020E]/80 blur-2xl" />
      
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/5 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Sticky Left Column */}
          <div ref={leftColRef} className="sticky top-0 h-screen content-center space-y-4 py-12">
            <p className="text-xs uppercase tracking-[0.5em] text-indigo-200/80">Predictive loop</p>
             <h2 className="text-4xl font-semibold text-balance text-white">
                 Watch Volus turn raw signals into <span className="text-indigo-500">guided moves</span>.
             </h2>
             <p className="text-sm text-gray-300 leading-relaxed">
                 This is the live flow inside the app: ingest telemetry, weigh it against margin policy, shape multi-week trajectories, then hand ops and finance a move with ownership baked in.
             </p>
         </div>

          {/* Scrolling Right Column */}
          <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
            {processPhases.map((phase, index) => (
              <CardSticky
                key={phase.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                index={index + 2}
                incrementY={20}
                incrementZ={1}
                className="rounded-3xl border border-white/15 bg-white/5 p-8 text-white shadow-[0_25px_80px_rgba(5,2,14,0.45)] backdrop-blur-2xl"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-indigo-300/90">Step {index + 1}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{phase.title}</h3>
                  </div>
                  <span className="text-4xl font-semibold text-indigo-400">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-gray-100">{phase.description}</p>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}

function SignalStream() {
  const { ref, isInView } = useReveal<HTMLElement>(0.25);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative px-6 py-24"
      data-gradient-section
    >
      {/* Smooth transition overlay unified with base */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#05020E]/50 to-transparent" data-gradient-layer />
      <div className="relative z-10 max-w-5xl mx-auto grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.5em] text-indigo-200/70">Signal stream</p>
          <h2 className="text-3xl font-semibold text-balance">Bursts that drop with probability and a next best move</h2>
          <p className="text-sm text-gray-400">
            Volus skips the messy dashboard hunt. Each burst shows why it matters, the confidence band, and the lever ops or the founder should pull next.
          </p>
          <div className="grid gap-4">
            {signalBursts.map((signal, index) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm text-indigo-200">{signal.label}</p>
                <p className="text-lg font-medium text-white">{signal.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-[32px] border border-white/10 bg-gradient-to-br from-indigo-600/20 via-purple-700/10 to-black p-8 shadow-[0_60px_120px_rgba(80,49,217,0.2)]"
        >
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">Confidence bands</p>
              <p className="text-4xl font-semibold text-white">72% probability</p>
              <p className="text-sm text-white/70">Baseline scenario hits target by week 6 once the guardrail actions fire.</p>
            </div>
            <div className="space-y-3">
              {[72, 18, 10].map((percent, index) => (
                <div key={percent}>
                  <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-gray-400">
                    <span>{['Expected', 'Upside', 'Guardrail'][index]}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${index === 0 ? 'bg-white' : index === 1 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/20 bg-black/40 p-4">
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-100">Action cue</p>
              <p className="mt-2 text-sm text-gray-200">
                Submit PO for 14,000 units by Friday to lock freight rates before the curve rebounds. Dashboard cards track the handoff in real time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function MediaGallery() {
  const { ref, isInView } = useReveal<HTMLElement>(0.3);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      className="relative px-6 py-24"
      data-gradient-section
    >
      {/* Smooth transition from previous section - unified hue */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#05020E] via-[#05020E]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#05020E]/40 to-transparent blur-2xl" />
      
      <div
        className="pointer-events-none absolute -top-10 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[160px]"
        data-gradient-layer
      />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[280px] translate-y-1/3 rounded-full bg-purple-500/10 blur-[160px]" />
      <div className="relative z-10 max-w-5xl mx-auto space-y-4 pb-10">
        <p className="text-xs uppercase tracking-[0.5em] text-indigo-200/70">Immersive gallery</p>
        <h2 className="text-4xl font-semibold text-balance">Shareable panels for decks, investors, and ops chat</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          Real telemetry, overlays, and light grain make each frame feel alive. Paste them into planning docs, investor notes, or send as a live link from the dashboard.
        </p>
      </div>
      <div className="relative z-10  mx-auto max-w-5xl  grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="group relative overflow-hidden rounded-[40px] border border-white/10 p-8"
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 70% 100%, 0 100%)',
            }}
            >
            {/* Background image layer with zoom effect */}
            <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                backgroundImage: `linear-gradient(120deg, rgba(5,2,14,0.75), rgba(5,2,14,0.4)), url(${gallerySpotlight.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.4em] text-white/70">
                {gallerySpotlight.badge}
              </span>
              <h3 className="text-3xl font-semibold text-white">{gallerySpotlight.title}</h3>
              <p className="text-base text-white/80 max-w-xl">{gallerySpotlight.description}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-indigo-100">
              <span className="text-xs uppercase tracking-[0.4em] text-white/60">{gallerySpotlight.statLabel}</span>
              <span className="text-3xl font-semibold text-white">{gallerySpotlight.statValue}</span>
            </div>
          </div>
        </motion.div>
        <div className="space-y-6">
          {galleryMoments.map((moment, index) => (
            <motion.div
                key={moment.id}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.12, duration: 0.6 }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 p-6"
                style={{
                clipPath: moment.clipPath,
                }}
            >
                {/* Background image layer with zoom effect */}
                <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                    backgroundImage: `${moment.gradient}, url(${moment.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                />
              <div className="relative z-10 space-y-3">
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">{moment.label}</p>
                <h3 className="text-2xl font-semibold text-white">{moment.title}</h3>
                <p className="text-sm text-white/80">{moment.description}</p>
                <p className="text-sm font-semibold text-indigo-100">{moment.stat}</p>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function PricingBridge() {
  return (
    <section className="relative bg-transparent" data-gradient-section>
   
        <PricingSection />
    </section>
  );
}

function CallToAction() {
  return (
    <section className="relative overflow-hidden py-24" data-gradient-section>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#4F46E5]/30 to-[#312E81]/30 blur-3xl opacity-50"
        data-gradient-layer
      />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-white/70">Ready for clarity</p>
        <h2 className="text-4xl font-semibold text-balance">Let Volus AI live inside your launch dashboard</h2>
        <p className="text-base text-white/80">
          Plug in Shopify, Amazon, ad spend, or finance data in under an hour. Solo clients get instant storylines, while enterprise teams unlock routed playbooks, audits, and custom signals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/signin"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore your dashboard
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg"
          >
            Talk to a forecasting lead
          </Link>
        </div>
      </div>
    </section>
  );
}
