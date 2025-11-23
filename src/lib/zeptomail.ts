import { createHash } from "crypto";

interface SendVerificationEmailParams {
  email: string;
  name?: string | null;
  verificationUrl: string;
  trialDays: number;
}

const apiKey = process.env.ZEPTOMAIL_API_KEY;
const baseUrl = process.env.ZEPTOMAIL_BASE_URL || "https://api.zeptomail.com/v1.1/email";
const fromAddress = process.env.ZEPTOMAIL_FROM_EMAIL;
const fromName = process.env.ZEPTOMAIL_FROM_NAME || "Volus AI";

const redactKey = (key?: string) => {
  if (!key) return "";
  return createHash("sha256").update(key).digest("hex").slice(0, 10);
};

export async function sendVerificationEmail({
  email,
  name,
  verificationUrl,
  trialDays,
}: SendVerificationEmailParams) {
  if (!apiKey) {
    throw new Error("ZEPTOMAIL_API_KEY is not configured");
  }

  if (!fromAddress) {
    throw new Error("ZEPTOMAIL_FROM_EMAIL is not configured");
  }

  const payload = {
    from: {
      address: fromAddress,
      name: fromName,
    },
    to: [
      {
        email_address: {
          address: email,
          name: name ?? undefined,
        },
      },
    ],
    subject: "Confirm your Volus AI account",
    htmlbody: `
      <div style="font-family: Arial, sans-serif; color: #0f172a;">
        <h1 style="color: #4c1d95;">Welcome to Volus AI 👋</h1>
        <p>Hi ${name ?? "there"},</p>
        <p>Thanks for creating your account. Before you can access the platform, please confirm your email address.</p>
        <p>Your free ${trialDays}-day trial will start as soon as you confirm your email.</p>
        <p style="margin: 32px 0;">
          <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(90deg,#4f46e5,#7c3aed); color: #fff; border-radius: 9999px; text-decoration: none; font-weight: 600;">Verify email</a>
        </p>
        <p>This link expires in 24 hours. If you did not request this, please ignore this email.</p>
        <p style="margin-top: 24px;">– The Volus AI team</p>
      </div>
    `,
    textbody: `Welcome to Volus AI!\n\nHi ${name ?? "there"},\n\nThanks for creating your account. Before you can access the platform, please confirm your email address using the link below.\n\nYour free ${trialDays}-day trial will start as soon as you confirm your email.\n\nVerify your email: ${verificationUrl}\n\nThis link expires in 24 hours. If you did not request this, please ignore this email.\n\n– The Volus AI team`,
  };

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Zoho-enczapikey ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("ZeptoMail error", {
      status: response.status,
      response: errorBody,
      hashedKey: redactKey(apiKey),
    });
    throw new Error("Failed to send verification email. Please try again later.");
  }
}
