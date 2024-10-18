import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/(header)";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ktlab",
  description: "kt's site",
};

const navItems = [{
  name: '首页',
  link:'/',
  childrenNav: []
}, {
  name: '文稿',
  link:'/blog',
  childrenNav: [{
    name: '生活',
    link:'/blog/categories/life',
    childrenNav: []
  },{
    name: '个人',
    link:'/blog/categories/personal',
    childrenNav: []
  },
  {
    name: '技术流水账',
    link:'/blog/categories/tech',
    childrenNav: []
  }]
}, {
  name: '知识库',
  link:'/knowledge/知识库/index.md',
  childrenNav: []
}]

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
          <Header img={"/avatar.jpg"} navItems={navItems} fallback={"KT"} className=" w-full fixed top-0 bg-background/90 z-10 backdrop-blur-sm" />
          {children}
        </main>
      </Providers>
      </body>
    </html>
  );
}
