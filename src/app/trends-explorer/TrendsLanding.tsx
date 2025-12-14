"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PricingSection from "@/app/components/landing/PricingSection";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import Footer from "@/app/components/Footer";
import { AnimatedValueSection } from "./components/AnimatedValueSection";
import { TestimonialSlider, Testimonial } from "@/components/ui/testimonial-slider";
import {
  Search,
  Flame,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Sparkles,
  X,
  Filter,
  LayoutGrid,
  Bell
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LockedTile } from "@/components/ui/locked-tile";
import { planLabel, PlanTier } from "@/lib/plan-tiers";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "@/components/ui/gradient-text";
import { cn } from "@/lib/utils";

// Testimonials data
const testimonials: Testimonial[] = [
  {
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    quote: "Category trends helped us identify a winning product niche three months before it went mainstream. We captured 23% of the market before competitors even noticed.",
    name: "Maya Chen",
    role: "E-commerce Director, Nexus Brands",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    quote: "We stopped relying on gut feelings and started using data. The category intelligence feature alone saved us from investing in three declining niches.",
    name: "James Wilson",
    role: "Founder, Atlas Commerce",
  },
  {
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
    quote: "The trend alerts are incredibly accurate. We now launch products with confidence knowing the demand curve is on our side.",
    name: "Sarah Martinez",
    role: "Product Strategist, Bloom Co.",
  },
];

// Types
type TrendProduct = {
  id: number;
  name?: string;
  normalized_name?: string;
  brand?: string | null;
  category?: string | null;
  trend_status?: string;
  trend_score?: number;
  momentum?: number;
  platforms_count?: number;
  platforms?: Record<string, boolean> | string[];
};

type CategoryInfo = {
  id: string;
  name: string;
  icon: string;
  color: string;
  borderColor: string;
};

interface TrendsLandingProps {
  categories: readonly CategoryInfo[];
  selectedCategory: string | null;
  categoryTrends: TrendProduct[];
  hotProducts: TrendProduct[];
  planTier: PlanTier;
  unlockedPro: boolean;
  unlockedEnterprise: boolean;
}

function productName(product: TrendProduct) {
  return product.name || product.normalized_name || "Untitled product";
}

function formatScore(score?: number) {
  if (score === undefined || score === null) return "—";
  return `${score.toFixed(1)}`;
}

function getTrendStatusColor(status?: string) {
  switch (status?.toLowerCase()) {
    case "hot": return "bg-red-500/20 text-red-300 border-red-500/30";
    case "rising": 
    case "growing": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "emerging": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "stable": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
}

export default function TrendsLanding({
  categories,
  selectedCategory,
  categoryTrends,
  hotProducts,
  planTier,
  unlockedPro,
  unlockedEnterprise,
}: TrendsLandingProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategorySelect = useCallback((categoryId: string) => {
    router.push(`/trends-explorer?category=${categoryId}`);
  }, [router]);

  const clearCategory = useCallback(() => {
    router.push("/trends-explorer");
  }, [router]);

  const filteredCategories = searchQuery 
    ? categories.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  const selectedCategoryInfo = selectedCategory 
    ? categories.find(c => c.id === selectedCategory) 
    : null;

  return (
    <div className="relative min-h-screen bg-black text-white">
      <BackgroundAura />
      <main className="relative z-10">
        <SiteNavbar variant="marketing" planBadge={{ title: planLabel(planTier), description: "Trend Explorer" }} />
        
        <Hero />
        
        <CategoryExplorer
          categories={filteredCategories}
          selectedCategory={selectedCategory}
          selectedCategoryInfo={selectedCategoryInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCategorySelect={handleCategorySelect}
          onClearCategory={clearCategory}
        />

        {selectedCategory && selectedCategoryInfo && (
          <CategoryResults
            category={selectedCategoryInfo}
            products={categoryTrends}
            unlockedPro={unlockedPro}
          />
        )}

        <HotTrendsSection 
          products={hotProducts} 
          unlockedPro={unlockedPro} 
        />

        <AnimatedValueSection />

        <HowItWorksSection />
        <TestimonialSection />
        <PricingSection />
        <FinalCta />
        <Footer />
      </main>
    </div>
  );
}

function BackgroundAura() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-indigo-950/50" />
      <div className="absolute -top-1/3 left-1/4 w-[60vw] h-[60vw] bg-indigo-600/15 blur-[200px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-purple-500/10 blur-[180px] rounded-full" />
      <div className="absolute top-1/2 left-0 w-[30vw] h-[30vw] bg-cyan-500/10 blur-[150px] rounded-full" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-16 sm:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-indigo-300 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Category Trends
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
            Discover What&apos;s{" "}
            <GradientText
              colors={["#818cf8", "#c084fc", "#38bdf8", "#818cf8"]}
              animationSpeed={4}
              showBorder={false}
              className="inline-flex"
            >
              Trending
            </GradientText>{" "}
            in Every Category
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Select a category to explore the hottest products, emerging trends, and market opportunities. 
            Our AI analyzes millions of data points across Amazon, TikTok, and Google.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time data</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span>13 categories</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>15M+ products tracked</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface CategoryExplorerProps {
  categories: readonly { id: string; name: string; icon: string; color: string; borderColor: string }[];
  selectedCategory: string | null;
  selectedCategoryInfo: { id: string; name: string; icon: string; color: string; borderColor: string } | null | undefined;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCategorySelect: (categoryId: string) => void;
  onClearCategory: () => void;
}

function CategoryExplorer({
  categories,
  selectedCategory,
  selectedCategoryInfo,
  searchQuery,
  setSearchQuery,
  onCategorySelect,
  onClearCategory,
}: CategoryExplorerProps) {
  return (
    <section className="relative px-6 py-12 sm:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="w-full bg-white/5 border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 text-gray-100 rounded-full pl-12 pr-4 py-4 outline-none transition text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Selected Category Indicator */}
        <AnimatePresence>
          {selectedCategory && selectedCategoryInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-sm text-gray-400">Viewing trends for:</span>
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-gradient-to-r",
                  selectedCategoryInfo.color,
                  selectedCategoryInfo.borderColor
                )}>
                  <span className="text-xl">{selectedCategoryInfo.icon}</span>
                  <span className="font-medium text-white">{selectedCategoryInfo.name}</span>
                  <button
                    onClick={onClearCategory}
                    className="ml-2 p-1 rounded-full hover:bg-white/10 transition"
                  >
                    <X className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category, i) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => onCategorySelect(category.id)}
              className={cn(
                "group relative flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300",
                selectedCategory === category.id
                  ? `bg-gradient-to-br ${category.color} ${category.borderColor} shadow-lg`
                  : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
              )}
            >
              <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                {category.icon}
              </span>
              <span className={cn(
                "text-sm font-medium text-center transition-colors",
                selectedCategory === category.id ? "text-white" : "text-gray-300 group-hover:text-white"
              )}>
                {category.name}
              </span>
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/50"
                />
              )}
            </motion.button>
          ))}
        </div>

        {categories.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-400">No categories found matching &ldquo;{searchQuery}&rdquo;</p>
          </div>
        )}
      </div>
    </section>
  );
}

interface CategoryResultsProps {
  category: { id: string; name: string; icon: string; color: string; borderColor: string };
  products: TrendProduct[];
  unlockedPro: boolean;
}

function CategoryResults({ category, products, unlockedPro }: CategoryResultsProps) {
  return (
    <section className="relative px-6 py-16 sm:px-10">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Trending in {category.name}
                </h2>
                <p className="text-gray-400 mt-1">
                  {products.length > 0 
                    ? `${products.length} trending products found`
                    : "Analyzing trends..."
                  }
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 rounded-full"
              asChild
            >
              <Link href={`/semantic-search?category=${category.id}`}>
                <Search className="w-4 h-4 mr-2" />
                Search Products
              </Link>
            </Button>
          </div>
        </motion.div>

        {products.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, idx) => {
              const unlocked = unlockedPro || idx < 2;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <LockedTile
                    unlocked={unlocked}
                    label="Upgrade to Pro"
                    upgradeHref="/#pricing"
                    compact={false}
                  >
                    <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-white truncate group-hover:text-indigo-200 transition-colors">
                            {productName(product)}
                          </h3>
                          {product.brand && (
                            <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                          )}
                        </div>
                        <Badge className={cn("shrink-0 text-xs", getTrendStatusColor(product.trend_status))}>
                          {product.trend_status || "Trending"}
                        </Badge>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-white">{formatScore(product.trend_score)}</p>
                            <p className="text-[10px] uppercase tracking-wider text-gray-500">Score</p>
                          </div>
                          {product.platforms_count && (
                            <div className="text-center">
                              <p className="text-lg font-bold text-white">{product.platforms_count}</p>
                              <p className="text-[10px] uppercase tracking-wider text-gray-500">Platforms</p>
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                      </div>
                    </div>
                  </LockedTile>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
            <Filter className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No trends data yet</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We&apos;re currently analyzing this category. Check back soon or try a different category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

interface HotTrendsSectionProps {
  products: TrendProduct[];
  unlockedPro: boolean;
}

function HotTrendsSection({ products, unlockedPro }: HotTrendsSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="relative px-6 py-20 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-amber-300">
            <Flame className="w-3.5 h-3.5" />
            Hot Right Now
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">
            Top Trending Products Across All Categories
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            The fastest-moving products based on sales velocity, social mentions, and search growth.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product, idx) => {
            const unlocked = unlockedPro || idx < 2;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <LockedTile
                  unlocked={unlocked}
                  label="Upgrade to Pro"
                  upgradeHref="/#pricing"
                  compact={true}
                >
                  <div className="group relative rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:bg-white/[0.05] hover:border-amber-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <Badge className={cn("text-[10px]", getTrendStatusColor(product.trend_status))}>
                        {product.trend_status || "Trending"}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-medium text-white truncate group-hover:text-amber-200 transition-colors">
                      {productName(product)}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{product.category?.replace(/_/g, " ") || "General"}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">Score: <span className="text-white font-medium">{formatScore(product.trend_score)}</span></span>
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                </LockedTile>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Select a Category",
      description: "Choose from 13 product categories covering everything from electronics to cosmetics.",
      icon: LayoutGrid,
    },
    {
      number: "02", 
      title: "View Trending Products",
      description: "See products ranked by our proprietary trend score based on sales, social, and search data.",
      icon: TrendingUp,
    },
    {
      number: "03",
      title: "Set Up Alerts",
      description: "Get notified when new products start trending in your selected categories.",
      icon: Bell,
    },
    {
      number: "04",
      title: "Deep Dive Analysis",
      description: "Click any product to see detailed analytics, competitor data, and opportunity scores.",
      icon: Search,
    },
  ];

  return (
    <section className="relative px-6 py-20 sm:px-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-purple-300">
            How It Works
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">
            Find Your Next Winning Product in Minutes
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-indigo-500/50">{step.number}</span>
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-300" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-white/20" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="relative px-6 py-24 sm:px-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-emerald-300">
            Trusted By Leaders
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-[32px] border border-white/10 bg-white/[0.02] p-10 backdrop-blur-sm"
        >
          <TestimonialSlider testimonials={testimonials} />
        </motion.div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative px-6 pb-24 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto rounded-[40px] border border-white/10 bg-gradient-to-br from-indigo-950/50 via-black to-purple-950/30 p-12 md:p-16 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-indigo-300 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Start Free
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Stop Chasing Yesterday&apos;s Trends
          </h2>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of sellers who discover winning products before they peak. 
            Start exploring category trends for free.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 h-14 rounded-full px-10 text-lg font-semibold shadow-lg shadow-indigo-500/25" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 rounded-full px-10 text-lg" asChild>
              <Link href="/semantic-search">Search Products</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">No credit card required · 14-day free trial</p>
        </div>
      </motion.div>
    </section>
  );
}
