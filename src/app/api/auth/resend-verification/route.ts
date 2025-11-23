import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { randomUUID } from "crypto";
import { sendVerificationEmail } from "@/lib/zeptomail";
import { defaultTrialDays } from "@/lib/stripe";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "We couldn't find an account with that email" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "This account is already verified" },
        { status: 400 }
      );
    }

    await prisma.verificationToken.deleteMany({ where: { identifier: email } });

    const token = randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || `${req.nextUrl.origin}`;
    const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;

    await sendVerificationEmail({
      email,
      name: user.name,
      verificationUrl,
      trialDays: Number.isFinite(defaultTrialDays) ? defaultTrialDays : 14,
    });

    return NextResponse.json({
      message: "Verification email resent. Please check your inbox.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Resend verification failed", error);
    return NextResponse.json(
      { error: "We couldn't resend the verification email. Please try again." },
      { status: 500 }
    );
  }
}
