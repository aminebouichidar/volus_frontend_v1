import prisma from "@/lib/prisma";
import {
  defaultPriceId,
  defaultTrialDays,
  getStripeClient,
} from "@/lib/stripe";
import { SubscriptionStatus } from "@prisma/client";
import { SubscriptionInfo } from "@/types/subscription";
import { determinePlanTier, PlanTier } from "@/lib/plan-tiers";

interface EnsureTrialSubscriptionResult {
  status: SubscriptionStatus;
  trialEndsAt: Date | null;
  currentPeriodEnd: Date | null;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
}

export async function ensureTrialSubscriptionForUser(
  userId: string
): Promise<EnsureTrialSubscriptionResult | null> {
  if (!defaultPriceId) {
    console.warn(
      "STRIPE_PRICE_ID is not configured. Skipping subscription provisioning."
    );
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  if (!user) {
    throw new Error("User not found when provisioning subscription");
  }

  if (!user.emailVerified) {
    throw new Error("Cannot provision subscription for unverified user");
  }

  const trialDays = Number.isFinite(defaultTrialDays) ? defaultTrialDays : 14;
  const stripe = getStripeClient();

  let stripeCustomerId = user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name ?? undefined,
      metadata: {
        userId: user.id,
      },
    });

    stripeCustomerId = customer.id;
  }

  const existingSubscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  });

  if (existingSubscription) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        stripeCustomerId,
        stripeSubscriptionId: existingSubscription.stripeSubscriptionId,
        subscriptionStatus: existingSubscription.status,
        trialEndsAt: existingSubscription.trialEndsAt,
        currentPlan: existingSubscription.priceId,
      },
    });

    return {
      status: existingSubscription.status,
      trialEndsAt: existingSubscription.trialEndsAt,
      currentPeriodEnd: existingSubscription.currentPeriodEnd,
      stripeCustomerId: existingSubscription.stripeCustomerId,
      stripeSubscriptionId: existingSubscription.stripeSubscriptionId,
    };
  }

  const subscription = await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [{ price: defaultPriceId }],
    metadata: {
      userId: user.id,
      trial_created_via: "volus-app",
    },
    trial_period_days: trialDays,
    collection_method: "charge_automatically",
  });

  const trialEndsAt = subscription.trial_end
    ? new Date(subscription.trial_end * 1000)
    : null;
  const currentPeriodEndRaw =
    (subscription as typeof subscription & {
      current_period_end?: number | null;
    }).current_period_end ?? null;
  const currentPeriodEnd = currentPeriodEndRaw
    ? new Date(currentPeriodEndRaw * 1000)
    : null;

  const storedSubscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      status: (subscription.status.toUpperCase() as SubscriptionStatus) ||
        SubscriptionStatus.TRIALING,
      priceId: defaultPriceId,
      trialEndsAt,
      currentPeriodEnd,
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      stripeCustomerId,
      stripeSubscriptionId: storedSubscription.stripeSubscriptionId,
      subscriptionStatus: storedSubscription.status,
      trialEndsAt: storedSubscription.trialEndsAt,
      currentPlan: storedSubscription.priceId,
    },
  });

  return {
    status: storedSubscription.status,
    trialEndsAt: storedSubscription.trialEndsAt,
    currentPeriodEnd: storedSubscription.currentPeriodEnd,
    stripeCustomerId: storedSubscription.stripeCustomerId,
    stripeSubscriptionId: storedSubscription.stripeSubscriptionId,
  };
}

export type UserSubscriptionPlan = SubscriptionInfo & {
  tier: PlanTier;
  isCanceled: boolean;
};

export async function getUserSubscriptionPlan(
  userId: string | undefined
): Promise<UserSubscriptionPlan> {
  if (!userId) {
    return {
      status: "inactive",
      trialEndsAt: null,
      currentPeriodEnd: null,
      stripeCustomerId: "",
      stripeSubscriptionId: "",
      priceId: null,
      tier: "starter",
      isCanceled: false,
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      stripeSubscriptionId: true,
      stripeCustomerId: true,
      subscriptionStatus: true,
      trialEndsAt: true,
      currentPlan: true,
      subscription: {
        select: {
          currentPeriodEnd: true,
        },
      },
    },
  });

  if (!user) {
    return {
      status: "inactive",
      trialEndsAt: null,
      currentPeriodEnd: null,
      stripeCustomerId: "",
      stripeSubscriptionId: "",
      priceId: null,
      tier: "starter",
      isCanceled: false,
    };
  }

  const isCanceled = false;

  const subscriptionInfo: SubscriptionInfo = {
    status: user.subscriptionStatus || "inactive",
    trialEndsAt: user.trialEndsAt ? user.trialEndsAt.toISOString() : null,
    currentPeriodEnd: user.subscription?.currentPeriodEnd
      ? user.subscription.currentPeriodEnd.toISOString()
      : null,
    stripeCustomerId: user.stripeCustomerId || "",
    stripeSubscriptionId: user.stripeSubscriptionId || "",
    priceId: user.currentPlan,
  };

  const tier = determinePlanTier(subscriptionInfo);

  return {
    ...subscriptionInfo,
    tier,
    isCanceled,
  };
}
