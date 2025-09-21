import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FirebaseAnalytics } from "@/components/ui/firebase-analytics";
import { AuthProvider } from "@/components/ui/auth-provider";
import { PostHogProvider } from "@/components/providers/posthog-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbet - AI-Powered Recruitment Platform",
  description: "Transform your recruitment process with AI automation. Reduce time-to-hire by 40% while improving candidate experience.",
  keywords: "recruitment, AI, hiring, automation, HR, talent acquisition",
  authors: [{ name: "Orbet" }],
  openGraph: {
    title: "Orbet - AI-Powered Recruitment Platform",
    description: "Transform your recruitment process with AI automation. Reduce time-to-hire by 40% while improving candidate experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <AuthProvider>
            {children}
            <FirebaseAnalytics />
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
