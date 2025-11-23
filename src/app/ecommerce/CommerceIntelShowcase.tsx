'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Activity, BarChart4, Sparkles, Zap } from 'lucide-react';

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

interface BentoGridShowcaseProps {
  integrations: React.ReactNode;
  featureTags: React.ReactNode;
  mainFeature: React.ReactNode;
  secondaryFeature: React.ReactNode;
  statistic: React.ReactNode;
  journey: React.ReactNode;
  className?: string;
}

const BentoGridShowcase = ({
  integrations,
  featureTags,
  mainFeature,
  secondaryFeature,
  statistic,
  journey,
  className,
}: BentoGridShowcaseProps) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        'grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-3 auto-rows-[minmax(200px,auto)]',
        className,
      )}
    >
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        {integrations}
      </motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-3">
        {mainFeature}
      </motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        {featureTags}
      </motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        {secondaryFeature}
      </motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
        {statistic}
      </motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        {journey}
      </motion.div>
    </motion.section>
  );
};

const IntegrationsCard = () => (
  <Card className="h-full border-white/10 bg-white/5 text-white">
    <CardHeader>
      <CardTitle className="text-lg">Live integrations</CardTitle>
      <CardDescription className="text-sm text-gray-300">
        Amazon, Shopify, Walmart, TikTok Shop, Klaviyo, GA4
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-indigo-200">
      {['Amazon', 'Shopify', 'Target', 'Meta', 'TikTok'].map((label) => (
        <span key={label} className="rounded-full border border-white/10 px-3 py-1 text-[11px]">
          {label}
        </span>
      ))}
    </CardContent>
  </Card>
);

const FeatureTagsCard = () => (
  <Card className="h-full border-white/10 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-black text-white">
    <CardContent className="flex h-full flex-col justify-center gap-3">
      {[
        'Demand forecasting',
        'Basket affinities',
        'Margin guardrails',
      ].map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="w-fit border-indigo-300/40 bg-white/5 text-indigo-100"
        >
          {tag}
        </Badge>
      ))}
    </CardContent>
  </Card>
);

const MainFeatureCard = () => (
  <Card className="relative h-full overflow-hidden border-white/10 bg-black/40">
    <Image
      src="https://volus-public.s3.us-east-1.amazonaws.com/volus_ai_dashboards-min.png"
      alt="Volus AI canvas"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 33vw"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
    <div className="relative z-10 flex h-full flex-col justify-between p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">Commerce OS</p>
        <h3 className="mt-3 text-3xl font-semibold text-white">
          Explain every sales swing with attribution-ready insights.
        </h3>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-sm p-4">
        <p className="text-sm text-gray-200">
          Elastic panels show correlated sentiment, pricing, media, and supply telemetry in one stack.
        </p>
      </div>
    </div>
  </Card>
);

const SecondaryFeatureCard = () => (
  <Card className="relative h-full overflow-hidden border-white/10 bg-white/5 text-white">
    <CardHeader>
      <CardTitle className="text-xl">Merchandising snapshot</CardTitle>
      <CardDescription className="text-sm text-gray-300">
        SKU mix, attach rates, and hero product gaps delivered daily.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3 text-sm text-gray-200">
        {[
          'Attach rate +4.8% after TikTok spark ads',
          'Returns cluster on 2P sellers with slow ship times',
          'Channel-ready copy blocks auto-generated',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const StatCard = () => (
  <Card className="flex h-full flex-col justify-between border-white/10 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 p-6 text-white">
    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-emerald-100">
      <Activity className="h-5 w-5" />
      Confidence layers
    </div>
    <div>
      <p className="text-6xl font-bold">92%</p>
      <p className="mt-2 text-sm text-emerald-50">
        Average accuracy of demand surges predicted 10 days ahead.
      </p>
    </div>
  </Card>
);

const JourneyCard = () => (
  <Card className="relative h-full overflow-hidden border-white/10 bg-black/60 text-white">
    <CardHeader>
      <CardTitle className="text-lg">Weekly journey</CardTitle>
      <CardDescription className="text-sm text-gray-300">
        Who sees what — and when — across your organization.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {[
        { label: 'Monday', detail: 'Ops pulse: fill-rate + supplier risk heatmap', initials: 'OP' },
        { label: 'Wednesday', detail: 'Growth lab: creative + search intent pairings', initials: 'GL' },
        { label: 'Friday', detail: 'Exec tape: AI-written summary with unlocks', initials: 'EX' },
      ].map((entry) => (
        <div key={entry.label} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-semibold uppercase tracking-widest text-white">
            {entry.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{entry.label}</p>
            <p className="text-xs text-gray-300">{entry.detail}</p>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

const CommerceIntelShowcase = () => {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-indigo-200">Volus briefings</p>
          <h2 className="text-3xl font-semibold text-white">
            Every subscription includes an intelligence layer we refresh daily.
          </h2>
          <p className="text-lg text-gray-300">
            See exactly how we translate multi-channel noise into roadmap-ready stories for merchandising, growth, and finance teams.
          </p>
        </header>
        <BentoGridShowcase
          integrations={<IntegrationsCard />}
          featureTags={<FeatureTagsCard />}
          mainFeature={<MainFeatureCard />}
          secondaryFeature={<SecondaryFeatureCard />}
          statistic={<StatCard />}
          journey={<JourneyCard />}
        />
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-gray-200 md:grid-cols-3">
          {[
            { icon: <Sparkles className="h-5 w-5 text-indigo-300" />, title: 'Narratives', desc: 'Auto-generated briefs with rationale, impact, and playbook suggestions.' },
            { icon: <BarChart4 className="h-5 w-5 text-cyan-300" />, title: 'Benchmarks', desc: 'Compare SKU velocity and ROAS versus category peers.' },
            { icon: <Zap className="h-5 w-5 text-purple-300" />, title: 'Actions', desc: 'Send one-click automations to pricing, ads, or supply tools.' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="rounded-full border border-white/10 bg-black/40 p-3">
                {item.icon}
              </div>
              <div>
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommerceIntelShowcase;
