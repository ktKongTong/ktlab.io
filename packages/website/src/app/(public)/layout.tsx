import Header from "@/app/(public)/_header";
import Footer from "@/app/(public)/footer";
import {navItems} from "@/config";

export default async function PublicLayout(
  {
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <main className={'min-h-screen flex flex-col'}>
        <Header img={"/avatar.jpg"} navItems={navItems} fallback={"KT"} className="w-full fixed top-0 bg-background z-10" />
        {children}
        <Footer />
      </main>
    </div>
  )
}