import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export const defaultTrialDays = Number.parseInt(
  process.env.STRIPE_TRIAL_DAYS || "14",
  10
);

export const defaultPriceId = process.env.STRIPE_PRICE_ID || "";

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    const apiKey = process.env.STRIPE_SECRET_KEY;

    if (!apiKey) {
      throw new Error(
        "STRIPE_SECRET_KEY is not configured. Please set it in your environment before using Stripe functionality."
      );
    }

    stripeClient = new Stripe(apiKey, {
      apiVersion: "2024-11-20" as Stripe.LatestApiVersion,
    });
  }

  return stripeClient;
}

// Uncomment this warning if you want to be reminded to configure Stripe
// if (!defaultPriceId) {
//   console.warn(
//     "STRIPE_PRICE_ID is not configured. Subscription creation will fail until it is provided."
//   );
// }
