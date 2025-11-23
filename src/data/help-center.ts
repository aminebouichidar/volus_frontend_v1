export type HelpFAQ = {
  id: string;
  category:
    | "Getting Started"
    | "Billing & Plans"
    | "Product Intelligence"
    | "Integrations"
    | "Security";
  question: string;
  answer: string;
  linkLabel?: string;
  linkHref?: string;
};

export const helpCenterFaqs: HelpFAQ[] = [
  {
    id: "getting-started-01",
    category: "Getting Started",
    question: "How do I start generating Volus AI insights?",
    answer:
      "Visit the Insights hub, enter a product or keyword, and Volus AI will query every connected data source before visualizing opportunity scores, lifecycle stage, and marketing angles. Saved searches sync with your dashboard so you can keep tracking momentum.",
    linkLabel: "Open insights",
    linkHref: "/insights",
  },
  {
    id: "getting-started-02",
    category: "Getting Started",
    question: "Why do I need to verify my email before signing in?",
    answer:
      "We send a verification link after sign‑up to keep your workspace secure and unlock the free trial subscription. Once the link is confirmed you can sign in normally or with Google.",
    linkLabel: "Resend verification",
    linkHref: "/signin?status=missing",
  },
  {
    id: "billing-01",
    category: "Billing & Plans",
    question: "What are the differences between Starter, Business, and Enterprise plans?",
    answer:
      "Starter ($49/mo) tracks 5 products with core alerts. Business ($99/mo) expands to 50 products, unlocks all 7+ data sources, real‑time sentiment, and collaboration for 5 teammates. Enterprise ($199/mo) removes limits, adds API/webhooks, SSO, and a dedicated account partner.",
    linkLabel: "View pricing",
    linkHref: "#pricing",
  },
  {
    id: "billing-02",
    category: "Billing & Plans",
    question: "Can I switch between monthly and yearly billing?",
    answer:
      "Yes. Inside Billing → Subscription you can toggle between monthly and yearly at any time. Upgrades happen instantly and prorated credits carry over to your next invoice.",
  },
  {
    id: "product-01",
    category: "Product Intelligence",
    question: "Where does Volus AI source data for the Product Insight cards?",
    answer:
      "We merge competitor listings, marketplace velocity, ad library data, social chatter, review sentiment, and macro signals. The scoring engine normalizes everything so urgency, profit potential, and saturation are comparable across niches.",
  },
  {
    id: "product-02",
    category: "Product Intelligence",
    question: "Can Volus AI suggest marketing angles or ad creative ideas?",
    answer:
      "Yes. The Product Insight page includes Marketing Angle Generator, Selling Angles & Branding Blueprint, and Auto-Generated Product Brief modules. Use \"Ask AI to generate ad creatives\" inside the Next Steps panel for channel-ready copy.",
  },
  {
    id: "integrations-01",
    category: "Integrations",
    question: "Which marketplaces and data sources can I connect?",
    answer:
      "Volus AI tracks Shopify, Amazon, TikTok Shop, Etsy, Walmart Marketplace, Meta Ads Library, Reddit, YouTube, TikTok sentiment, and Stripe subscription telemetry. Enterprise plans unlock custom sources through the API.",
  },
  {
    id: "security-01",
    category: "Security",
    question: "How is my data protected?",
    answer:
      "All requests flow through our secure proxy, credentials are stored using OAuth or encrypted secrets in Prisma, and Enterprise plans offer SSO plus audit logging. Reach out to security@volus.ai for a detailed whitepaper.",
    linkLabel: "Email security team",
    linkHref: "mailto:security@volus.ai",
  },
];

export const helpAssistantContext = `
Brand: Volus AI
Mission: Help commerce operators spot, validate, and launch winning products faster.

Core capabilities:
1. Insights Library — unified search hitting 7+ live data feeds (marketplaces, ad libraries, sentiment, pricing).
2. Product Intelligence Cards — show trend trajectory, confidence heatmap, opportunity score, competitor snapshot, pricing recs, lifecycle stage, marketing angles, social signal requests, review predictions, supplier briefs, and action engine tasks.
3. Dashboard — saved products, alerts (price drops, review spikes, social buzz), and billing.
4. Automation — request social data pulls (YouTube, Reddit, Meta, TikTok), add products to tracking queue, generate ad creatives, export CSV, and trigger supplier briefs.

Plan guide:
- Starter ($49/mo or $499/yr): 5 tracked products, 3 live data sources, weekly AI trend forecasts, email alerts, 30 days of history, community support.
- Business ($99/mo or $1,099/yr): 50 tracked products, all data sources, advanced AI forecasts, real-time sentiment, 12 months of history, CSV/Excel exports, competitor intelligence, 5-seat collaboration, priority email support.
- Enterprise ($199/mo or $2,199/yr): Unlimited products, API + webhooks, custom AI model training, white-label reports, advanced dashboards, history limited only by data availability, dedicated manager, 24/7 priority support, custom integrations, unlimited seats, SSO & security add-ons.

Support policies:
- Email: support@volus.ai (24h SLA on Starter, 8h on Business, 2h on Enterprise).
- Billing changes: self-serve in dashboard, prorated credits applied automatically.
- Data freshness: marketplace + ad sources refresh hourly, social sentiment refreshes every 30 minutes, macro signals daily.
- Verification: users must confirm email before accessing dashboard; Google SSO supported.

Answer customers referencing only this canon. If a question falls outside scope, politely offer to escalate to support@volus.ai.`;
