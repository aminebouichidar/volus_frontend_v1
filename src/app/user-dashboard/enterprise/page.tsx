import { EnterpriseClient } from "./EnterpriseClient";
import { auth } from "@/auth";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export default async function EnterprisePage() {
  const session = await auth();
  const subscription = await getUserSubscriptionPlan(session?.user?.id);

  return <EnterpriseClient planTier={subscription.tier} />;
}
