import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "RealEstateAI",
  description: "AI-powered real estate platform - Be Your Own Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-900 text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
