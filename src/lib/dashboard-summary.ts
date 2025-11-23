export type SummaryMetric = {
  label: string;
  value: string;
  delta?: number;
  trend?: "up" | "down";
};

export type ServiceHealth = {
  name: string;
  status: string;
  latencyMs: number;
};

export type AlertItem = {
  title: string;
  detail: string;
  severity: "info" | "warning" | "critical";
};

export interface DashboardSummaryPayload {
  metrics?: SummaryMetric[];
  services?: ServiceHealth[];
  alerts?: AlertItem[];
  signals?: Array<{
    channel: string;
    insight: string;
    weight: string;
    timestamp: string;
  }>;
}

export const DASHBOARD_SUMMARY_FALLBACK: DashboardSummaryPayload = {
  metrics: [
    { label: "Signals captured", value: "2.4M", delta: 11, trend: "up" },
    { label: "Markets synced", value: "38", delta: 3, trend: "up" },
    { label: "Alerts routed", value: "482", delta: -6, trend: "down" },
    { label: "API uptime", value: "99.95%" },
  ],
  services: [
    { name: "FastAPI core", status: "healthy", latencyMs: 112 },
    { name: "Signal correlator", status: "healthy", latencyMs: 148 },
    { name: "Narrative generator", status: "warming", latencyMs: 201 },
  ],
  alerts: [
    {
      title: "Kitchen mixers spiking on TikTok Shop",
      detail: "+63% mentions in the past 48h. Suggested follow-up: allocate promo budget.",
      severity: "info",
    },
    {
      title: "Competitor BlitzGear dropped prices in DE",
      detail: "Average discount 12% across 23 SKUs. Margin risk flagged.",
      severity: "warning",
    },
  ],
  signals: [
    {
      channel: "Social",
      insight: "Creators mentioning foldable treadmills up 44% week-over-week",
      weight: "High",
      timestamp: "2m ago",
    },
    {
      channel: "Marketplaces",
      insight: "Amazon buy-box loss detected for SKU #4921 on two regions",
      weight: "Medium",
      timestamp: "14m ago",
    },
    {
      channel: "News",
      insight: "EU regulators draft updates on battery recyclability policy",
      weight: "Watch",
      timestamp: "32m ago",
    },
  ],
};
