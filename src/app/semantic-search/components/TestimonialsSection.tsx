"use client";

import { TestimonialSlider } from "@/components/ui/testimonial-slider";

const testimonials = [
  {
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "The semantic search capabilities have completely transformed how we identify market gaps. It's not just finding products; it's understanding the 'why' behind the trends.",
    name: "Sarah Chen",
    role: "Product Director at TechFlow",
  },
  {
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "I used to spend hours cross-referencing data from TikTok and Amazon. Volus AI does it in seconds. The depth of understanding in the search results is unmatched.",
    name: "Marcus Rodriguez",
    role: "E-commerce Strategist",
  },
  {
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "Finally, a tool that understands context. Being able to search for 'cozy minimalist decor' and get results that actually match the vibe across platforms is a game changer.",
    name: "Elena Volkov",
    role: "Brand Manager",
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />
      
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Trusted by Industry Leaders
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          See how top brands and agencies are using semantic search to stay ahead of the curve.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  );
}
