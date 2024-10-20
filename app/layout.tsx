import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";

import Header from "app/_header";

import Providers from "@/components/providers";

import {navItems} from "@/config";

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
      <body className={inter.className}>
      <Providers>
        <main className={'min-h-screen'}>
          <Header img={"/avatar.jpg"} navItems={navItems} fallback={"KT"} className="w-full fixed top-0 bg-background/90 z-10 backdrop-blur-sm" />
          {children}
        </main>
      </Providers>
      </body>
    </html>
  );
}
