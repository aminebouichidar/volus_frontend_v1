import { PlaybooksClient } from "./PlaybooksClient";
import { auth } from "@/auth";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export default async function PlaybooksPage() {
  const session = await auth();
  const subscription = await getUserSubscriptionPlan(session?.user?.id);

  return <PlaybooksClient planTier={subscription.tier} />;
}
