import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";
import Stripe from "stripe";

export const runtime = "nodejs";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const toSubscriptionStatus = (status: Stripe.Subscription.Status) => {
  switch (status) {
    case "trialing":
      return SubscriptionStatus.TRIALING;
    case "active":
      return SubscriptionStatus.ACTIVE;
    case "past_due":
      return SubscriptionStatus.PAST_DUE;
    case "incomplete":
      return SubscriptionStatus.INCOMPLETE;
    case "incomplete_expired":
      return SubscriptionStatus.INCOMPLETE_EXPIRED;
    case "canceled":
      return SubscriptionStatus.CANCELED;
    default:
      return SubscriptionStatus.TRIALING;
  }
};

async function syncSubscription(subscription: Stripe.Subscription) {
  const status = toSubscriptionStatus(subscription.status);
  const trialEndsAt = subscription.trial_end
    ? new Date(subscription.trial_end * 1000)
    : null;

  const currentPeriodEndRaw =
    (subscription as Stripe.Subscription & {
      current_period_end?: number | null;
    }).current_period_end ?? null;

  const currentPeriodEnd = currentPeriodEndRaw
    ? new Date(currentPeriodEndRaw * 1000)
    : null;

  const stripeSubscriptionId = subscription.id;
  const stripeCustomerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const userId = subscription.metadata.userId;

  if (!userId) {
    const existing = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId },
    });

    if (!existing) {
      console.warn(
        "Received subscription webhook without user metadata and no local record",
        stripeSubscriptionId
      );
      return;
    }

    await prisma.subscription.update({
      where: { stripeSubscriptionId },
      data: {
        status,
        trialEndsAt,
        currentPeriodEnd,
      },
    });

    await prisma.user.update({
      where: { id: existing.userId },
      data: {
        subscriptionStatus: status,
        trialEndsAt,
        currentPlan: subscription.items.data[0]?.price.id,
      },
    });

    return;
  }

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId },
    create: {
      userId,
      stripeCustomerId,
      stripeSubscriptionId,
      status,
      priceId: subscription.items.data[0]?.price.id ?? "",
      trialEndsAt,
      currentPeriodEnd,
    },
    update: {
      status,
      priceId: subscription.items.data[0]?.price.id ?? "",
      trialEndsAt,
      currentPeriodEnd,
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeCustomerId,
      stripeSubscriptionId,
      subscriptionStatus: status,
      trialEndsAt,
      currentPlan: subscription.items.data[0]?.price.id ?? "",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET not configured" },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature missing" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  const stripe = getStripeClient();

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
      case "customer.subscription.trial_will_end": {
        const subscription = event.data.object as Stripe.Subscription;
        await syncSubscription(subscription);
        break;
      }
      default: {
        console.log(`Unhandled Stripe event type ${event.type}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling Stripe webhook", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
