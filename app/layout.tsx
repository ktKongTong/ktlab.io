import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";

import Header from "app/_header";

import Providers from "@/components/providers";

import {navItems} from "@/config";
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
          <Header img={"/avatar.jpg"} navItems={navItems} fallback={"KT"} className="w-full fixed top-0 bg-background z-10" />
          {children}
        </main>
      </Providers>
      </body>
    </html>
  );
}
