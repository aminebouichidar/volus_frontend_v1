import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      emailVerified?: string | null;
      subscription?: {
        status: string;
        trialEndsAt: string | null;
        currentPeriodEnd: string | null;
        stripeCustomerId: string;
        stripeSubscriptionId: string;
      } | null;
    };
  }

  interface User {
    id: string;
    emailVerified?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    emailVerified?: string | null;
    subscription?: {
      status: string;
      trialEndsAt: string | null;
      currentPeriodEnd: string | null;
      stripeCustomerId: string;
      stripeSubscriptionId: string;
    } | null;
  }
}
