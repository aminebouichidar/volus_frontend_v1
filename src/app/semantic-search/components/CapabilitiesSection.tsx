"use client";

import { GridSection } from "@/components/ui/grid-section";

const capabilities = [
  {
    id: 1,
    title: "Deep Understanding",
    category: "AI Analysis",
    description: "Go beyond keywords. Our AI understands context, intent, and nuance to find exactly what you mean.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Cross-Platform",
    category: "Unified Search",
    description: "Search across Amazon, TikTok, Google, and Meta simultaneously to spot trends everywhere.",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Real-Time Insights",
    category: "Live Data",
    description: "Get up-to-the-minute data on product performance, sentiment, and velocity.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Smart Filtering",
    category: "Precision",
    description: "Filter noise and focus on high-potential opportunities with intelligent ranking algorithms.",
    imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Predictive Trends",
    category: "Forecasting",
    description: "Identify emerging opportunities weeks before they become mainstream.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
  }
];

export function CapabilitiesSection() {
  return (
    <GridSection
      title="Why Semantic Search?"
      description="Unlock the power of AI-driven product discovery with features designed for modern sellers."
      backgroundLabel="AI"
      backgroundPosition="right"
      posts={capabilities}
      className="mb-16"
    />
  );
}
