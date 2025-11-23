import { SubscriptionInfo } from "@/types/subscription";

export type PlanTier = "starter" | "pro" | "enterprise";

const PLAN_ORDER: PlanTier[] = ["starter", "pro", "enterprise"];

export function determinePlanTier(subscription?: SubscriptionInfo | null): PlanTier {
  if (!subscription) {
    return "starter";
  }

  const normalizedPriceId = subscription.priceId?.toLowerCase() ?? "";

  if (normalizedPriceId.includes("enterprise")) {
    return "enterprise";
  }

  if (normalizedPriceId.includes("pro")) {
    return "pro";
  }

  if ((subscription.status ?? "").toUpperCase() === "TRIALING") {
    return "starter";
  }

  return "pro";
}

export function hasPlanAccess(current: PlanTier, required: PlanTier) {
  return PLAN_ORDER.indexOf(current) >= PLAN_ORDER.indexOf(required);
}

export function planLabel(plan: PlanTier) {
  switch (plan) {
    case "starter":
      return "Starter";
    case "pro":
      return "Pro";
    case "enterprise":
      return "Enterprise";
    default:
      return "Starter";
  }
}

export function planDescription(plan: PlanTier, isTrial: boolean, daysLeft: number | null) {
  if (plan === "starter") {
    if (isTrial) {
      if (daysLeft !== null) {
        const suffix = daysLeft === 1 ? "day" : "days";
        return `${daysLeft} ${suffix} left • Starter trial`;
      }
      return "Starter trial active";
    }
    return "Starter plan";
  }

  if (plan === "pro") {
    return "Pro workspace";
  }

  return "Enterprise network";
}

export function isTrialPlan(subscription?: SubscriptionInfo | null) {
  if (!subscription) {
    return true;
  }
  return (subscription.status ?? "").toUpperCase() === "TRIALING";
}
