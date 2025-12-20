import type { Metadata } from "next";
import Providers from "@/components/contexts/Providers";
import "./globals.css";
import "../public/fonts/remixicon/remixicon.css";
import AppWrapper from "@/components/views/AppWrapper";
import AppBottomTabs from "@/components/views/AppBottomTabs";
import Icon from "@/components/fields/Icon";

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
    <html lang="ku" dir="rtl" suppressHydrationWarning>
      <body className={`flex items-center justify-center text-xs antialiased`}>
        <Providers>
          <AppWrapper>
            {children}
          </AppWrapper>
        </Providers>
      </body>
    </html>
  );
}
