"use client";

import { GridSection } from "@/components/ui/grid-section";

const capabilities = [
  {
    id: 1,
    title: "Demand Forecasting",
    category: "AI Prediction",
    description: "Predict future sales with 94% accuracy using our proprietary AI models trained on billions of data points.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Trend Velocity",
    category: "Momentum",
    description: "Track how fast a trend is accelerating to time your entry perfectly and maximize ROI.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Inventory Optimization",
    category: "Logistics",
    description: "Never run out of stock or overstock again. Smart recommendations based on predicted demand.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Market Simulation",
    category: "Strategy",
    description: "Simulate different pricing and marketing scenarios to see potential outcomes before you commit.",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Seasonal Analysis",
    category: "Patterns",
    description: "Automatically detect and adjust for seasonal patterns, holidays, and recurring market events.",
    imageUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000&auto=format&fit=crop",
  }
];

export function PredictionCapabilities() {
  return (
    <GridSection
      title="Predict The Future"
      description="Stop guessing. Start knowing. Our predictive engine gives you the foresight to lead the market."
      backgroundLabel="FUTURE"
      backgroundPosition="left"
      posts={capabilities}
      className="mb-16"
    />
  );
}
