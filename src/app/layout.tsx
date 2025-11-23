import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Volus AI - Monitor Products, Predict Trends, Drive Decisions",
  description: "Continuous product sentiment monitoring built on behavioural data fusion, predictive modelling, and automated insights. Track marketplace trends, social sentiment, and forecast demand with AI.",
  keywords: ["product sentiment", "AI analytics", "predictive modeling", "market intelligence", "sentiment analysis", "demand forecasting"],
  authors: [{ name: "Volus AI" }],
  openGraph: {
    title: "Volus AI - Monitor Products, Predict Trends, Drive Decisions",
    description: "Continuous product sentiment monitoring built on behavioural data fusion, predictive modelling, and automated insights.",
    type: "website",
    locale: "en_US",
    siteName: "Volus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volus AI - Monitor Products, Predict Trends, Drive Decisions",
    description: "Continuous product sentiment monitoring built on behavioural data fusion, predictive modelling, and automated insights.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
