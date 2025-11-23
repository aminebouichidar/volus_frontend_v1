import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { ensureTrialSubscriptionForUser } from "@/lib/subscription";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        if (!user.emailVerified) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      const tokenUserId = token.id as string | undefined;

      if (tokenUserId && (!token.subscription || trigger === "update")) {
        const dbUser = await prisma.user.findUnique({
          where: { id: tokenUserId },
          include: { subscription: true },
        });

        if (dbUser) {
          token.emailVerified = dbUser.emailVerified?.toISOString() ?? null;

          if (!dbUser.subscription && dbUser.emailVerified) {
            try {
              const subscription = await ensureTrialSubscriptionForUser(
                dbUser.id
              );

              if (subscription) {
                token.subscription = {
                  status: subscription.status,
                  trialEndsAt: subscription.trialEndsAt?.toISOString() ?? null,
                  currentPeriodEnd:
                    subscription.currentPeriodEnd?.toISOString() ?? null,
                  stripeCustomerId: subscription.stripeCustomerId,
                  stripeSubscriptionId: subscription.stripeSubscriptionId,
                };
              }
            } catch (error) {
              console.error("Subscription provisioning failed", error);
            }
          }

          if (dbUser.subscription) {
            token.subscription = {
              status: dbUser.subscription.status,
              trialEndsAt: dbUser.subscription.trialEndsAt
                ? dbUser.subscription.trialEndsAt.toISOString()
                : null,
              currentPeriodEnd: dbUser.subscription.currentPeriodEnd
                ? dbUser.subscription.currentPeriodEnd.toISOString()
                : null,
              stripeCustomerId: dbUser.subscription.stripeCustomerId,
              stripeSubscriptionId: dbUser.subscription.stripeSubscriptionId,
            };
          }
        }
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = (token.email as string) ?? session.user.email;
        session.user.name = (token.name as string) ?? session.user.name;
        session.user.image = (token.picture as string) ?? session.user.image;
        // @ts-expect-error - emailVerified type mismatch between JWT (string) and Session (Date), we store as ISO string
        session.user.emailVerified = (token.emailVerified as string | null) ?? null;
        session.user.subscription = token.subscription as
          | {
              status: string;
              trialEndsAt: string | null;
              currentPeriodEnd: string | null;
              stripeCustomerId: string;
              stripeSubscriptionId: string;
            }
          | undefined;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to user-dashboard after sign in
      if (url === baseUrl || url.startsWith(baseUrl)) {
        return `${baseUrl}/user-dashboard`;
      }
      // Handle relative URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Handle external URLs
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return `${baseUrl}/user-dashboard`;
    },
  },
  events: {
    async signIn({ user }) {
      if (user.id && user.emailVerified) {
        try {
          await ensureTrialSubscriptionForUser(user.id);
        } catch (error) {
          console.error("Failed to provision trial subscription on sign in", error);
        }
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
});
