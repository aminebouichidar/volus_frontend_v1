import { auth } from "@/auth";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import Footer from "../components/Footer";
import { determinePlanTier, planLabel } from "@/lib/plan-tiers";
import { getUserSubscription } from "@/lib/user-actions";
import { PredictionClient } from "./PredictionClient";
import GradientText from "@/components/ui/gradient-text";
import { PredictionCapabilities } from "./components/PredictionCapabilities";
import { PredictionTestimonials } from "./components/PredictionTestimonials";
import PricingSection from "@/app/components/landing/PricingSection";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { NeonRaymarcher } from "@/components/ui/neon-raymarcher";

export default async function PredictionLabPage() {
  const session = await auth();
  const subscription = await getUserSubscription(session?.user?.id);
  const planTier = determinePlanTier(subscription);

  const parallaxImages = [
    { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", alt: "Data Visualization" },
    { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", alt: "Analytics Dashboard" },
    { src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop", alt: "Inventory Management" },
    { src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop", alt: "AI Simulation" },
    { src: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000&auto=format&fit=crop", alt: "Seasonal Trends" },
    { src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1000&auto=format&fit=crop", alt: "Smart Filtering" },
    { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", alt: "Global Network" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-indigo-500/30">
      <SiteNavbar variant="marketing" planBadge={{ title: planLabel(planTier), description: "Prediction Lab" }} />

      {/* Ambient Background Effect - Extended to cover Header + Prediction Engine */}
      <div className="absolute top-0 left-0 w-full h-[180vh] z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-100 mix-blend-screen">
          <NeonRaymarcher />
        </div>
        {/* Gradient to fade it out at the bottom and ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90" />
      </div>

      <main className="relative z-10">
        {/* Section 1: Header */}
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-indigo-300 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            Future Intelligence
          </div>
          <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl tracking-tight leading-[1.1]">
            <GradientText
              colors={["#a5b4fc", "#c084fc", "#7dd3fc", "#a5b4fc"]}
              animationSpeed={6}
              showBorder={false}
              className="inline-flex mx-0 cursor-default pb-2"
            >
              Prediction Lab
            </GradientText>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed drop-shadow-lg">
            Run forward-looking demand predictions per SKU and browse trending forecasts.
            <span className="block mt-2 text-gray-400 text-base">
              Starter sees a masked preview; upgrade to unblur confidence and recommendations.
            </span>
          </p>
        </section>

        {/* Section 2: Live Prediction Engine (Moved Up) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-8">
          <div className="relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 sm:p-12 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-semibold tracking-tight text-white">Live Prediction Engine</h2>
              <p className="text-gray-400">Real-time analysis of your inventory data</p>
            </div>
            <PredictionClient planTier={planTier} />
          </div>
        </section>

        {/* Section 3: Capabilities (Grid) */}
        <section className="relative py-24 bg-black">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 blur-3xl -z-10 rounded-full opacity-30" />
              <PredictionCapabilities />
            </div>
          </div>
        </section>

        {/* Section 4: Parallax (Visuals) */}
        <div className="w-full -mx-4 sm:-mx-6 lg:-mx-8">
          <ZoomParallax images={parallaxImages} />
        </div>

        {/* Section 5: Testimonials & Pricing */}
        <section className="max-w-7xl mx-auto space-y-24 px-4 sm:px-6 lg:px-8 py-24">
          <PredictionTestimonials />
          <PricingSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}

