'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ensureTrialSubscriptionForUser } from "@/lib/subscription";
import { Subscription } from "@prisma/client";
import { SubscriptionInfo } from "@/types/subscription";

export async function getUserSubscription(userId?: string): Promise<SubscriptionInfo | null> {
  const resolvedUserId =
    userId ?? (await auth())?.user?.id;

  if (!resolvedUserId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: resolvedUserId },
    include: { subscription: true },
  });

  if (!user) {
    return null;
  }

  // If no subscription exists and email is verified, create trial
  if (!user.subscription && user.emailVerified) {
    try {
      await ensureTrialSubscriptionForUser(user.id);
    } catch (error) {
      console.error("Failed to provision trial subscription", error);
      return null;
    }

    const refreshed = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    return serializeSubscription(refreshed);
  }

  return serializeSubscription(user.subscription);
}

function serializeSubscription(subscription: Subscription | null): SubscriptionInfo | null {
  if (!subscription) {
    return null;
  }

  return {
    status: subscription.status,
    trialEndsAt: subscription.trialEndsAt?.toISOString() ?? null,
    currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
    stripeCustomerId: subscription.stripeCustomerId,
    stripeSubscriptionId: subscription.stripeSubscriptionId,
    priceId: subscription.priceId,
  };
}
