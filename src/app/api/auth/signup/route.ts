import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { randomUUID } from "crypto";
import { sendVerificationEmail } from "@/lib/zeptomail";
import { defaultTrialDays } from "@/lib/stripe";

const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = signupSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    let userId = existingUser?.id;

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    if (existingUser) {
      if (existingUser.emailVerified) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 400 }
        );
      }

      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: validatedData.fullName,
          company: validatedData.company || null,
          password: hashedPassword,
        },
      });

      userId = updatedUser.id;

      await prisma.verificationToken.deleteMany({
        where: { identifier: existingUser.email },
      });
    }

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          name: validatedData.fullName,
          email: validatedData.email,
          company: validatedData.company || null,
          password: hashedPassword,
        },
      });

      userId = user.id;
    }

    const token = randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    await prisma.verificationToken.create({
      data: {
        identifier: validatedData.email,
        token,
        expires,
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || `${req.nextUrl.origin}`;
    const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;

    try {
      await sendVerificationEmail({
        email: validatedData.email,
        name: validatedData.fullName,
        verificationUrl,
        trialDays: Number.isFinite(defaultTrialDays) ? defaultTrialDays : 14,
      });
    } catch (emailError) {
      console.error("Failed to send verification email", emailError);

      if (!existingUser && userId) {
        await prisma.user.delete({ where: { id: userId } }).catch(() => null);
      }

      return NextResponse.json(
        {
          error:
            "We could not send the verification email. Please try again in a moment.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Account created. Please check your inbox to verify your email and activate your free trial.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
