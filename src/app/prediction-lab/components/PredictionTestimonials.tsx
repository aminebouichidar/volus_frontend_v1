"use client";

import { TestimonialSlider } from "@/components/ui/testimonial-slider";

const testimonials = [
  {
    img: "https://randomuser.me/api/portraits/men/86.jpg",
    quote: "The accuracy of the demand forecasts is scary good. We reduced our inventory holding costs by 30% in the first quarter alone.",
    name: "David Kim",
    role: "Supply Chain Lead at NovaRetail",
  },
  {
    img: "https://randomuser.me/api/portraits/women/28.jpg",
    quote: "Prediction Lab helped us spot the 'Matcha' trend 3 weeks before our competitors. That head start was worth millions.",
    name: "Sophia Martinez",
    role: "Head of Product at GlowUp",
  },
  {
    img: "https://randomuser.me/api/portraits/men/54.jpg",
    quote: "I don't make a single purchasing decision without checking the Trend Velocity score first. It's become our north star.",
    name: "James Wilson",
    role: "Senior Buyer at UrbanStyle",
  }
];

export function PredictionTestimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />
      
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Success Stories
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          See how forward-thinking brands are using predictive AI to dominate their categories.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  );
}
