import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import Utils from "@/components/utils";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "ktlab",
  description: "kt's site",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    {/*{*/}
    {/*  !isProd() && <head><script src="https://unpkg.com/react-scan/dist/auto.global.js" async /></head>*/}
    {/*}*/}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Utils/>
      <Providers>
        <main className={'min-h-screen  dark:bg-zinc-900/70'}>
          {children}
        </main>
      </Providers>
      </body>
    </html>
  );
}
