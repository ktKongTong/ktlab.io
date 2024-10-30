import Header from "@/app/_header";
import {navItems} from "@/config";
import Footer from "@/app/(public)/footer";

export default async function PublicLayout(
  {
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <main className={'min-h-screen '}>
        <Header img={"/avatar.jpg"} navItems={navItems} fallback={"KT"} className="w-full fixed top-0 bg-background z-10" />
        {children}
        <Footer />
      </main>
    </div>
  )
}