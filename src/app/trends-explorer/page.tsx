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

type TrendListResponse = {
  products?: TrendProduct[];
  hot_products?: TrendProduct[];
  count?: number;
};

type Category = {
  name: string;
  keywords_sample?: string[];
};

type CategoriesResponse = {
  categories: Category[];
};

const FALLBACK_PRODUCTS: TrendProduct[] = [
  { id: 1, name: "Amazon Fire TV Stick", category: "electronics", trend_status: "emerging", trend_score: 42.2, platforms_count: 1 },
  { id: 2, name: "Dyson Airwrap", category: "cosmetics", trend_status: "hot", trend_score: 95.2, platforms_count: 5 },
  { id: 3, name: "Reusable Water Bottle", category: "health_wellness", trend_status: "growing", trend_score: 68.5, platforms_count: 3 },
  { id: 4, name: "LED Strip Lights", category: "home_appliances", trend_status: "stable", trend_score: 35.0, platforms_count: 2 },
  { id: 5, name: "TikTok Shop Beauty Set", category: "cosmetics", trend_status: "hot", trend_score: 88.0, platforms_count: 4 },
];

export default async function TrendExplorerPage() {
  const session = await auth();
  const subscription = await getUserSubscription(session?.user?.id);
  const planTier = determinePlanTier(subscription);
  const unlockedPro = hasPlanAccess(planTier, "pro");
  const unlockedEnterprise = hasPlanAccess(planTier, "enterprise");

  const [trending, hot, cross, categories] = await Promise.all([
    fetchJson<TrendListResponse>("/trends/?limit=12&min_score=30"),
    fetchJson<TrendListResponse>("/trends/hot?limit=12"),
    fetchJson<TrendListResponse>("/trends/cross-platform?limit=12&min_platforms=2"),
    fetchJson<CategoriesResponse>("/trends/categories"),
  ]);

  const trendingProducts = trending?.products?.length ? trending.products : FALLBACK_PRODUCTS;
  const hotProducts = hot?.hot_products?.length ? hot.hot_products : trendingProducts.slice(0, 4);
  const crossPlatformProducts = cross?.products?.length ? cross.products : trendingProducts.slice(1, 5);
  const categoryList = categories?.categories ?? [];

  return (
    <TrendsLanding
      hotProducts={hotProducts}
      crossPlatformProducts={crossPlatformProducts}
      categoryList={categoryList}
      planTier={planTier}
      unlockedPro={unlockedPro}
      unlockedEnterprise={unlockedEnterprise}
    />
  );
}
