import { auth } from "@/auth";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import Footer from "../components/Footer";
import { determinePlanTier, planLabel } from "@/lib/plan-tiers";
import { getUserSubscription } from "@/lib/user-actions";
import { SearchClient } from "./SearchClient";
import GradientText from "@/components/ui/gradient-text";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import SemanticLoader from "@/components/ui/semantic-loader";
import PricingSection from "@/app/components/landing/PricingSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

export default async function SemanticSearchPage() {
  const session = await auth();
  const subscription = await getUserSubscription(session?.user?.id);
  const planTier = determinePlanTier(subscription);

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNavbar variant="marketing" planBadge={{ title: planLabel(planTier), description: "Semantic Search" }} />

      <main className="mx-auto pt-24 max-w-7xl space-y-16 px-4 pb-16 sm:px-6 lg:px-8">
        <header className="space-y-6 text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-indigo-200">
            Semantic Intelligence
          </div>
          <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl tracking-tight leading-tight">
            <GradientText
              colors={["#818cf8", "#c084fc", "#38bdf8", "#818cf8"]}
              animationSpeed={5}
              showBorder={false}
              className="inline-flex mx-0 cursor-default"
            >
              One Search
            </GradientText>{" "}
            Across All Sources
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Query unified products across Amazon, eBay, Pinterest, Reddit, Meta Ads, TikTok Shop, and news/blogs. Starter shows preview tiles; upgrade to unblur full results.
          </p>
        </header>

        <div className="w-full -mt-8 relative z-10">
          <SemanticLoader />
        </div>

        <CapabilitiesSection />

        <div className="max-w-5xl mx-auto">
          <SearchClient planTier={planTier} />
        </div>

        <TestimonialsSection />
        
        <PricingSection />
      </main>

      <Footer />
    </div>
  );
}
