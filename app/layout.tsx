import type { Metadata } from "next";
import Providers from "@/lib/Providers";
import "./globals.css";
import './remixicon.css'

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
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
