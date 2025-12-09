"use client";

import { motion, useMotionValue, useMotionTemplate, type MotionStyle, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BellRing, Sparkles, Building2 } from "lucide-react";
import { type MouseEvent } from "react";

type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>;
  "--y": MotionValue<string>;
};

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    badge: "Starter",
    price: "$49",
    yearlyPrice: "$499",
    period: "/month",
    description: "Perfect for small businesses tracking essential product intelligence",
    features: [
      "Track up to 5 products",
      "Real-time data from 3 platforms",
      "Basic sentiment analysis",
      "Weekly AI trend forecasts",
      "Email alerts",
      "Competitor price tracking",
      "Historical data (30 days)",
      "Basic dashboard & reports",
      "Community support",
    ],
    icon: BellRing,
    gradient: "from-indigo-600/20 via-purple-600/10 to-transparent",
    borderGradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    id: "business",
    name: "Business",
    badge: "Scale",
    price: "$99",
    yearlyPrice: "$1099",
    period: "/month",
    description: "Best value for growing businesses needing comprehensive market insights",
    features: [
      "Everything in Starter, plus:",
      "Track up to 50 products",
      "All 7+ data sources",
      "Advanced AI predictions & forecasts",
      "Real-time sentiment analysis",
      "Custom reports & analytics",
      "Competitor intelligence",
      "Historical data (6 months)",
      "Export to CSV/Excel",
      "Priority email support",
      "Team collaboration (5 users)",
    ],
    icon: Sparkles,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderGradient: "from-cyan-500 via-blue-500 to-violet-500",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "Enterprise",
    price: "$199",
    yearlyPrice: "$2199",
    period: "/month",
    description: "Unlimited access with priority support for data-driven organizations",
    features: [
      "Everything in Business, plus:",
      "Unlimited products tracking",
      "Full API access & webhooks",
      "Custom AI model training",
      "White-label reports",
      "Advanced data visualization",
      "Historical data (limited only by data availability)",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom integrations",
      "Unlimited team members",
      "SSO & advanced security",
    ],
    icon: Building2,
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    borderGradient: "from-violet-500 via-fuchsia-500 to-orange-500",
  },
];

function PricingCard({ tier, index }: { tier: typeof pricingTiers[0]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = tier.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      {/* Glow effect on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />

      <div
        className={`relative h-full rounded-3xl border bg-black/40 backdrop-blur-xl transition-all duration-300 ${
          tier.popular
            ? "border-indigo-500/50 shadow-[0_0_40px_-8px_rgba(99,102,241,0.3)]"
            : "border-white/10 group-hover:border-white/20"
        }`}
      >
        {tier.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-200 backdrop-blur-xl">
              <Sparkles className="h-3 w-3" />
              Most Popular
            </span>
          </div>
        )}

        <div className="flex flex-col gap-6 p-8">
          {/* Header */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
                style={{
                  background: `linear-gradient(135deg, ${tier.gradient})`,
                }}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                {tier.badge}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
            <p className="mt-2 text-sm text-gray-400">{tier.description}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-white">{tier.price}</span>
            {tier.period && (
              <span className="text-base text-gray-400">{tier.period}</span>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {tier.features.map((feature, idx) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                className="flex items-start gap-3 text-sm text-gray-300"
              >
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <Button
            className={`mt-4 h-12 w-full rounded-full text-base font-semibold transition-all duration-300 ${
              tier.popular
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.5)]"
                : "border-white/20 bg-white/5 hover:bg-white/10"
            }`}
            variant={tier.popular ? "default" : "outline"}
          >
            {tier.id === "enterprise" ? "Contact Sales" : "Start 14-day Trial"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function AnimatedPricingCards() {
  return (
    <section id="pricing" className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-indigo-200">
            <Sparkles className="h-3.5 w-3.5" />
            Pricing
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose Your Intelligence Tier
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Every plan includes onboarding rituals, alert routing, and access to our human
            analysts. Scale as your emotional intelligence needs grow.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-700/20 via-purple-700/10 to-transparent p-6 text-center backdrop-blur-sm"
        >
          <p className="text-sm text-gray-300">
            Need a custom data agreement or procurement support?{" "}
            <Link
              href="mailto:pricing@volus.ai"
              className="font-semibold text-indigo-300 underline decoration-indigo-300/30 underline-offset-4 transition-colors hover:text-indigo-200"
            >
              Email pricing@volus.ai
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
