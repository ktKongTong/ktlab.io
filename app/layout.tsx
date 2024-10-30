import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "@/components/providers";
import {cn} from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ktlab",
  description: "kt's site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
      <Providers>
        <main className={'min-h-screen'}>
          {children}
        </main>
      </Providers>
      </body>
    </html>
  );
}
