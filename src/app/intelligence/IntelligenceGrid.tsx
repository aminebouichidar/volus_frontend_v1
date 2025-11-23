'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crosshair, 
  Globe2, 
  Search, 
  ShieldAlert, 
  Target, 
  TrendingUp
} from 'lucide-react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 18 },
  },
};

export default function IntelligenceGrid() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">Competitive Landscape</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            See the entire board. <span className="text-indigo-400">In real time.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Volus AI tracks 150M+ product signals daily to reconstruct your competitors&apos; strategies before they execute them.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 h-auto md:h-[800px]"
        >
          {/* Large Feature: Competitor Map */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2">
            <Card className="relative h-full overflow-hidden border-white/10 bg-black/40 group">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-black/80" />
              
              {/* Abstract Map Visualization Background */}
              <div className="absolute inset-0 opacity-40">
                 <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                    alt="Global data network"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between p-8">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="border-indigo-400/30 bg-indigo-500/10 text-indigo-300 backdrop-blur-md">
                    <Globe2 className="mr-2 h-3 w-3" /> Global Recon
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white">Market Share Topography</h3>
                  <p className="max-w-md text-gray-300">
                    Visualize exactly where you&apos;re winning and losing. Our models ingest pricing, inventory, and search share data to build a live tactical map of your category.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-sm">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Category Growth</p>
                      <p className="mt-1 text-2xl font-semibold text-emerald-400">+14.2%</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-sm">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Your Share</p>
                      <p className="mt-1 text-2xl font-semibold text-indigo-400">28.5%</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Top Right: Price Intelligence */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
            <Card className="relative h-full overflow-hidden border-white/10 bg-white/5 transition-colors hover:bg-white/10">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>
                <CardTitle className="text-xl text-white">Pricing Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Detect competitor price changes instantly. Our agents simulate cart behaviors to uncover hidden discounts and shipping thresholds.
                </p>
                <div className="mt-6 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between rounded bg-white/5 p-2 text-xs">
                      <span className="text-gray-300">Competitor {String.fromCharCode(64 + i)}</span>
                      <span className="font-mono text-red-400">-${(i * 2.5).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom Right: Trend Spotting */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
            <Card className="relative h-full overflow-hidden border-white/10 bg-gradient-to-br from-purple-900/20 to-black transition-colors hover:from-purple-900/30">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                  <Search className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-xl text-white">Emerging Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Spot rising search terms before they appear in standard SEO tools.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['sustainable', 'AI-native', 'modular', 'carbon-neutral'].map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-purple-500/10 text-purple-200 hover:bg-purple-500/20">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Bottom Row of Smaller Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: ShieldAlert,
              title: "Threat Detection",
              desc: "Get alerted when a new entrant gains velocity in your core categories.",
              color: "text-orange-400",
              bg: "bg-orange-500/10"
            },
            {
              icon: Target,
              title: "Ad Spend Recon",
              desc: "Reverse-engineer competitor ad strategies and keyword bidding budgets.",
              color: "text-cyan-400",
              bg: "bg-cyan-500/10"
            },
            {
              icon: Crosshair,
              title: "Gap Analysis",
              desc: "Identify underserved customer segments your competitors are ignoring.",
              color: "text-pink-400",
              bg: "bg-pink-500/10"
            }
          ].map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:bg-white/10">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
