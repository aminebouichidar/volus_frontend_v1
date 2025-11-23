import Footer from "../components/Footer";
import { Navbar } from "../components/landing/HeroSection";
import { FAQAccordion } from "./components/FAQAccordion";
import { HelpAssistant } from "./components/HelpAssistant";
import { helpCenterFaqs } from "@/data/help-center";

export const metadata = {
  title: "Help Center | Volus AI",
  description:
    "Guides, FAQs, and the Volus AI assistant to help you troubleshoot billing, insights, and automation workflows.",
};

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-black text-white">
        <Navbar />
      <div className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[680px] bg-purple-600/20 blur-[160px]" />
          <div className="absolute top-10 right-0 w-[420px] h-[420px] bg-indigo-500/20 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">Help Center</p>
          <h1 className="text-4xl md:text-5xl font-semibold">
            Answers, guidance, and live AI support
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto">
            Browse our curated FAQs or chat with the Volus AI concierge powered by our own model. From onboarding to automation, we have you covered.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[{ label: 'Avg. first response', value: '11 min' }, { label: 'Data sources monitored', value: '50+' }, { label: 'Enterprise SLA', value: '24/7' }].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm">
                <p className="text-xs text-gray-400 uppercase tracking-[0.3em]">{stat.label}</p>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24 space-y-16">
        <section>
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-200/70">FAQs</p>
              <h2 className="text-3xl font-semibold mt-2">Most asked questions</h2>
              <p className="text-gray-400 text-sm mt-1">We keep this list updated with every release.</p>
            </div>
            <a
              href="mailto:support@volus.ai"
              className="text-sm text-indigo-300 hover:text-indigo-100 border border-white/10 rounded-full px-4 py-2"
            >
              Still need help? Email us →
            </a>
          </div>
          <FAQAccordion faqs={helpCenterFaqs} />
        </section>

        <HelpAssistant />
      </main>
      <Footer />
    </div>
  );
}
