import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureTrialSubscriptionForUser } from "@/lib/subscription";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  const baseUrl =
    process.env.NEXTAUTH_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/verify-email?status=missing`);
  }

  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(`${baseUrl}/verify-email?status=invalid`);
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } }).catch(() => null);
      return NextResponse.redirect(`${baseUrl}/verify-email?status=expired`);
    }

    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      await prisma.verificationToken.delete({ where: { token } }).catch(() => null);
      return NextResponse.redirect(`${baseUrl}/verify-email?status=invalid`);
    }

    if (!user.emailVerified) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    }

    await prisma.verificationToken.deleteMany({
      where: { identifier: verificationToken.identifier },
    });

    try {
      await ensureTrialSubscriptionForUser(user.id);
    } catch (subscriptionError) {
      console.error("Failed to provision subscription", subscriptionError);
      return NextResponse.redirect(
        `${baseUrl}/verify-email?status=verified&subscription=failed`
      );
    }

    return NextResponse.redirect(`${baseUrl}/verify-email?status=verified`);
  } catch (error) {
    console.error("Email verification failed", error);
    return NextResponse.redirect(`${baseUrl}/verify-email?status=error`);
  }
}
