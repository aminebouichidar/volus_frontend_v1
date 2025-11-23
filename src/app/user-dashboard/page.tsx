import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function UserDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return <DashboardClient user={session.user} />;
}
