import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-dm-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RecallIQ",
  description: "AI-powered spaced repetition for durable learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative isolate bg-background">
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #E5E5E2 2px, transparent 2px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
