import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStripeClient } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      stripeCustomerId: true,
    },
  });

  if (!user?.stripeCustomerId) {
    return NextResponse.json(
      { error: "Billing is not available for this account yet" },
      { status: 400 }
    );
  }

  const returnUrl =
    process.env.NEXTAUTH_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const portalSession = await getStripeClient().billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${returnUrl}/user-dashboard`,
  });

  return NextResponse.json({ url: portalSession.url });
}
