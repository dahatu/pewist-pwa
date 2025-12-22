import type { Metadata } from "next";
import Providers from "@/components/contexts/Providers";
import "./globals.css";
import "../public/fonts/remixicon/remixicon.css";
import AppWrapper from "@/components/views/AppWrapper";

export const metadata: Metadata = {
  title: "Pewist",
  description: "Pewist",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ku" dir="ltr" suppressHydrationWarning>
      <body className={`flex items-center justify-center text-xs antialiased`}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
