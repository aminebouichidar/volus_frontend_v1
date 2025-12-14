import { auth } from "@/auth";
import { determinePlanTier, hasPlanAccess } from "@/lib/plan-tiers";
import { getUserSubscription } from "@/lib/user-actions";
import TrendsLanding from "./TrendsLanding";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8001/api").replace(/\/$/, "");

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error("trend-explorer fetch failed", error);
    return null;
  }
}

export type TrendProduct = {
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

type TrendListResponse = {
  products?: TrendProduct[];
  hot_products?: TrendProduct[];
  count?: number;
};

// All available categories with their display info
export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "📱", color: "from-blue-500/20 to-cyan-500/20", borderColor: "border-blue-500/30" },
  { id: "cosmetics", name: "Cosmetics & Beauty", icon: "💄", color: "from-pink-500/20 to-rose-500/20", borderColor: "border-pink-500/30" },
  { id: "health_wellness", name: "Health & Wellness", icon: "💊", color: "from-emerald-500/20 to-green-500/20", borderColor: "border-emerald-500/30" },
  { id: "home_appliances", name: "Home Appliances", icon: "🏠", color: "from-amber-500/20 to-orange-500/20", borderColor: "border-amber-500/30" },
  { id: "baby_kids", name: "Baby & Kids", icon: "👶", color: "from-sky-500/20 to-blue-500/20", borderColor: "border-sky-500/30" },
  { id: "outdoor_camping", name: "Outdoor & Camping", icon: "⛺", color: "from-lime-500/20 to-green-500/20", borderColor: "border-lime-500/30" },
  { id: "watches_jewelry", name: "Watches & Jewelry", icon: "⌚", color: "from-yellow-500/20 to-amber-500/20", borderColor: "border-yellow-500/30" },
  { id: "arts_crafts", name: "Arts & Crafts", icon: "🎨", color: "from-purple-500/20 to-violet-500/20", borderColor: "border-purple-500/30" },
  { id: "music_audio", name: "Music & Audio", icon: "🎵", color: "from-indigo-500/20 to-purple-500/20", borderColor: "border-indigo-500/30" },
  { id: "office_stationery", name: "Office & Stationery", icon: "📎", color: "from-slate-500/20 to-gray-500/20", borderColor: "border-slate-500/30" },
  { id: "travel_luggage", name: "Travel & Luggage", icon: "✈️", color: "from-cyan-500/20 to-teal-500/20", borderColor: "border-cyan-500/30" },
  { id: "automotive", name: "Automotive", icon: "🚗", color: "from-red-500/20 to-orange-500/20", borderColor: "border-red-500/30" },
  { id: "books_literature", name: "Books & Literature", icon: "📚", color: "from-brown-500/20 to-amber-500/20", borderColor: "border-amber-500/30" },
] as const;

export type CategoryId = typeof CATEGORIES[number]["id"];

// Fetch trending products for a specific category
async function fetchCategoryTrends(category: string): Promise<TrendProduct[]> {
  const data = await fetchJson<TrendListResponse>(`/trends/?category=${category}&limit=6&min_score=20`);
  return data?.products ?? [];
}

export default async function TrendExplorerPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  const subscription = await getUserSubscription(session?.user?.id);
  const planTier = determinePlanTier(subscription);
  const unlockedPro = hasPlanAccess(planTier, "pro");
  const unlockedEnterprise = hasPlanAccess(planTier, "enterprise");

  const selectedCategory = params.category || null;

  // Fetch hot products across all categories for the hero section
  const [hotData, categoryTrends] = await Promise.all([
    fetchJson<TrendListResponse>("/trends/hot?limit=8"),
    selectedCategory ? fetchCategoryTrends(selectedCategory) : Promise.resolve([]),
  ]);

  const hotProducts = hotData?.hot_products ?? [];

  return (
    <TrendsLanding
      categories={CATEGORIES}
      selectedCategory={selectedCategory}
      categoryTrends={categoryTrends}
      hotProducts={hotProducts}
      planTier={planTier}
      unlockedPro={unlockedPro}
      unlockedEnterprise={unlockedEnterprise}
    />
  );
}
