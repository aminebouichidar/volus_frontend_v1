"use client"

import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import PricingSection from "../components/landing/PricingSection";
import CommerceIntelShowcase from "./CommerceIntelShowcase";

const heroStats = [
  { label: "Avg. sales lift", value: "+18%" },
  { label: "Catalog synced", value: "4.2M SKUs" },
  { label: "Signals correlated", value: "12 data pipes" },
  { label: "Automation rules", value: "320+" },
];

const skewCards = [
  {
    title: "Marketplace command center",
    desc: "Track buy-box health, price swings, and fulfillment SLAs across Amazon, Walmart, and Shopify in a single view.",
    gradientFrom: "#7c3aed",
    gradientTo: "#312e81",
  },
  {
    title: "Audience & intent pulse",
    desc: "Fuse creator chatter, search lift, and paid media performance to surface the demand moments worth funding.",
    gradientFrom: "#06b6d4",
    gradientTo: "#2563eb",
  },
  {
    title: "Margin-safe automation",
    desc: "Trigger price, promo, or inventory workflows only when AI confidence is high enough to protect contribution margin.",
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
  },
];

const dashboardShots = [
  {
    title: "Multi-channel revenue stack",
    description: "Overlay transactional feeds with marketing and operations KPIs to see the full story behind every spike.",
    image:
      "https://volus-public.s3.us-east-1.amazonaws.com/multichannel.jpg",
  },
  {
    title: "SKU anomaly map",
    description: "Daily anomaly detection highlights products losing velocity, sentiment, or buy-box control.",
    image:
      "https://volus-public.s3.us-east-1.amazonaws.com/sku_anomaly.jpg",
  },
];

const servicePillars = [
  {
    title: "Retail media intelligence",
    points: [
      "Automatically categorize campaigns by intent stage",
      "Blend sales + ROAS with organic share to fund winners",
      "Route alerts to Slack, Teams, or PagerDuty",
    ],
  },
  {
    title: "Operations + CX telemetry",
    points: [
      "Correlate returns, reviews, and tickets with fulfillment data",
      "Spot supplier risk before it becomes a stockout",
      "Pipe raw data back into your Snowflake or BigQuery lake",
    ],
  },
  {
    title: "Executive-ready storytelling",
    points: [
      "Auto-generate narratives tailored for merch, growth, or finance",
      "Brandable dashboards for clients and partner teams",
      "Weekly briefings with next best actions and forecast deltas",
    ],
  },
];

const StatPill = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 shadow-lg shadow-indigo-500/10">
    <p className="text-sm uppercase tracking-[0.25em] text-indigo-200">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
  </div>
);

const SkewInsightCard = ({
  title,
  desc,
  gradientFrom,
  gradientTo,
}: {
  title: string;
  desc: string;
  gradientFrom: string;
  gradientTo: string;
}) => (
  <div className="group relative m-6 h-[380px] w-[320px] transition-all duration-500">
    <span
      className="absolute left-[50px] top-0 h-full w-1/2 rounded-2xl skew-x-[15deg] transition-all duration-500 group-hover:left-5 group-hover:w-[calc(100%-70px)] group-hover:skew-x-0"
      style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
    />
    <span
      className="absolute left-[50px] top-0 h-full w-1/2 rounded-2xl skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:left-5 group-hover:w-[calc(100%-70px)] group-hover:skew-x-0"
      style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
    />

    <span className="pointer-events-none absolute inset-0 z-10">
      <span className="animate-blob absolute left-0 top-0 h-0 w-0 rounded-2xl bg-white/10 opacity-0 shadow-[0_5px_15px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 group-hover:left-10 group-hover:top-[-40px] group-hover:h-24 group-hover:w-24 group-hover:opacity-100" />
      <span className="animation-delay-1000 animate-blob absolute bottom-0 right-0 h-0 w-0 rounded-2xl bg-white/10 opacity-0 shadow-[0_5px_15px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 group-hover:bottom-[-40px] group-hover:right-10 group-hover:h-24 group-hover:w-24 group-hover:opacity-100" />
    </span>

    <div className="relative z-20 left-0 rounded-2xl bg-white/5 p-6 text-white shadow-xl backdrop-blur-md transition-all duration-500 group-hover:left-[-25px] group-hover:p-10">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-gray-200">{desc}</p>
      <div className="mt-6 inline-flex items-center text-sm font-semibold text-black">
        <span className="rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.35em] text-black">Details</span>
      </div>
    </div>
  </div>
);

export default function EcommerceAnalyticsPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-slate-950" />
        <div className="absolute top-1/3 left-1/2 h-[50vw] w-[60vw] -translate-x-1/2 bg-purple-600/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[40vw] w-[35vw] bg-cyan-500/10 blur-[220px]" />
      </div>

      <div className="relative z-10">
        <SiteNavbar variant="marketing" />

        <main>
          <section className="px-4 pt-28 pb-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-indigo-200">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1">E-commerce analytics</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1">Realtime + Predictive</span>
              </div>
              <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
                <div>
                  <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                    AI-powered intelligence turning every e-commerce signal into your advantage.
                  </h1>
                  <p className="mt-6 text-lg text-gray-300">
                    We normalize every marketplace, DTC storefront, and retail media signal to reveal what is driving revenue, what is dragging margin, and which playbooks to trigger next.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/insights"
                      className="cursor-pointer rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-purple-500/40"
                    >
                      Launch a live scan
                    </Link>
                    <a
                      href="#demo"
                      className="cursor-pointer rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-white hover:text-white"
                    >
                      See a sample dashboard
                    </a>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {heroStats.map((stat) => (
                    <StatPill key={stat.label} {...stat} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 pb-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-3xl border border-white/5 bg-white/5 p-8 shadow-[0_20px_120px_-40px_rgba(79,70,229,0.8)]">
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-indigo-200">Noise to navigation</p>
                  <h2 className="text-3xl font-semibold">One pipeline for commerce, sentiment, and supply data.</h2>
                  <p className="text-lg text-gray-300">
                    Consolidate feeds from Amazon, Walmart, Shopify, TikTok Shop, Google, Reddit, and your ERP. Our agents enrich every row with taxonomy, attribution, and AI-explained anomalies so stakeholders skip straight to action.
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-400" />
                      <span>AI narrates the why behind every spike or slide.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-400" />
                      <span>Role-based views for merchandising, growth, finance, and ops.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      <span>Push alerts to Emails, Teams, or your internal tools.</span>
                    </li>
                  </ul>
                </div>
                <div className="relative" id="demo">
                  <div className="absolute -left-6 top-6 h-full w-full rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-2xl" />
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80"
                    alt="Volus AI commerce dashboard"
                    width={1200}
                    height={800}
                    className="relative rounded-3xl border border-white/10 shadow-2xl shadow-black/50"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 pb-24 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-wrap justify-center">
              {skewCards.map((card) => (
                <SkewInsightCard key={card.title} {...card} />
              ))}
            </div>
          </section>

          <section className="px-4 pb-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-12">
              <header className="max-w-3xl space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-indigo-200">Dashboards in the wild</p>
                <h2 className="text-3xl font-semibold">Client-ready canvases that explain what already happened and what comes next.</h2>
                <p className="text-lg text-gray-300">
                  Drop these directly into executive reviews or investor decks. Every module is editable, API-accessible, and can inherit your brand system in seconds.
                </p>
              </header>
              <div className="grid gap-10 lg:grid-cols-2">
                {dashboardShots.map((shot) => (
                  <article
                    key={shot.title}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl"
                  >
                    <Image
                      src={shot.image}
                      alt={shot.title}
                      width={1200}
                      height={800}
                      className="h-[320px] w-full object-cover opacity-80 transition duration-500 group-hover:opacity-100"
                    />
                    <div className="space-y-3 px-6 py-6">
                      <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Volus OS</p>
                      <h3 className="text-2xl font-semibold">{shot.title}</h3>
                      <p className="text-gray-300">{shot.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <CommerceIntelShowcase />

          <section className="px-4 pb-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-10">
              <div className="grid gap-8 lg:grid-cols-3">
                {servicePillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-2xl border border-white/10 bg-black/40 p-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Service Layer</p>
                    <h3 className="mt-3 text-2xl font-semibold">{pillar.title}</h3>
                    <ul className="mt-5 space-y-3 text-gray-300">
                      {pillar.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <PricingSection />

          <section className="px-4 pb-32 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-black p-10 text-center shadow-2xl shadow-indigo-900/40">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Next step</p>
              <h2 className="mt-4 text-4xl font-semibold">Invite Volus AI into your commerce stack.</h2>
              <p className="mt-4 text-lg text-gray-300">
                Whether you manage ten SKUs or ten thousand, we plug into your stack in days and deliver executive-ready answers on week one.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/signup"
                  className="cursor-pointer rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
                >
                  Start free trial
                </Link>
                <a
                  href="mailto:hello@volus.ai"
                  className="cursor-pointer rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:border-white"
                >
                  Talk to us
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .animate-blob {
          animation: blob 3.5s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: -1.5s;
        }
      `}</style>
    </div>
  );
}
