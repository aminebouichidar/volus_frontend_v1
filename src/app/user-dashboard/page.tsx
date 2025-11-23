import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./ControlRoomClient";
import { getUserSubscription } from "@/lib/user-actions";

export default async function UserDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const subscription = await getUserSubscription(session.user.id);

  return <DashboardClient user={session.user} subscription={subscription} />;
}
