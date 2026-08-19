import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aivora AI — Intelligent Workflow Orchestration",
  description:
    "Aivora AI transforms natural-language goals into intelligent workflows that research, reason, decide, and execute. AI workflow orchestration for ambitious teams.",
  keywords: ["AI workflow", "automation", "AI agents", "workflow orchestration", "business automation"],
  openGraph: {
    title: "Aivora AI — Intelligent Workflow Orchestration",
    description:
      "Turn ambitious goals into intelligent action with Aivora AI's workflow orchestration platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
