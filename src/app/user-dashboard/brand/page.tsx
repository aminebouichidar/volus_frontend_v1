import { BrandClient } from "./BrandClient";
import { auth } from "@/auth";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export default async function BrandPage() {
  const session = await auth();
  const subscription = await getUserSubscriptionPlan(session?.user?.id);

  return <BrandClient planTier={subscription.tier} />;
}
