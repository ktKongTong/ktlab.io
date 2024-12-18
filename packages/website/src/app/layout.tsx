import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "@/components/providers";
import {cn, isProd} from "@/lib/utils";
import Utils from "@/components/utils";

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
    {
      !isProd() && <head>
      <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
    </head>
    }
      <body className={cn(inter.className)}>
      <Utils/>
      <Providers>
        <main className={'min-h-screen bg-background'}>
          {children}
        </main>
      </Providers>
      </body>
    </html>
  );
}
