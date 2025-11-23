'use client';

import { SiteNavbar } from '@/components/navigation/SiteNavbar';
import Footer from '@/app/components/Footer';
import PricingSection from '@/app/components/landing/PricingSection';
import IntelligenceGrid from './IntelligenceGrid';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BrainCircuit, Globe, Lock, Zap } from 'lucide-react';
import { BGPattern } from '../ui/backgrounds/bg-patterns';

export default function IntelligencePage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-black to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-indigo-600/10 blur-[120px] opacity-50" />
      </div>

  <SiteNavbar variant="marketing" />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <BGPattern variant="grid" mask="fade-edges" />
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-indigo-300 backdrop-blur-md">
                <BrainCircuit className="h-3 w-3" />
                Market Intelligence Suite
              </div>
              
              <h1 className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Decode the market before <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  it makes a move.
                </span>
              </h1>
              
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
                Turn millions of fragmented signals into a single source of truth. 
                Volus AI monitors competitors, supply chains, and consumer sentiment 
                to give you the unfair advantage of foresight.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="h-12 cursor-pointer rounded-full bg-white px-8 text-black hover:bg-gray-300">
                    Start Scanning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo-volus">
                  <Button size="lg" variant="outline" className="h-12 cursor-pointer rounded-full border-white/10 bg-white/5 px-8 text-white hover:bg-white/10">
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intelligence Grid Feature Section */}
        <IntelligenceGrid />

        {/* Deep Dive Features */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-3">
              {[
                {
                  icon: Globe,
                  title: "Global Signal Network",
                  desc: "We ingest data from 40+ countries, translating local market nuances into standardized metrics for global strategy teams."
                },
                {
                  icon: Zap,
                  title: "Predictive Velocity",
                  desc: "Our models don't just report what happened. They calculate the momentum of every trend to forecast its lifespan and peak."
                },
                {
                  icon: Lock,
                  title: "Enterprise Grade",
                  desc: "SOC2 Type II certified. Your strategic queries are isolated in private enclaves, ensuring your research never leaks to the public model."
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative group"
                >
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative h-full rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-4 text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* CTA Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-black p-12 text-center md:p-20">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Stop guessing. Start knowing.
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
                  Join the world&apos;s fastest-growing brands who use Volus AI to navigate market uncertainty with high precision.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="h-14 rounded-full bg-white px-8 text-base font-semibold text-black hover:bg-gray-200">
                      Get Started Now
                    </Button>
                  </Link>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  No credit card required for 14-day trial.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
