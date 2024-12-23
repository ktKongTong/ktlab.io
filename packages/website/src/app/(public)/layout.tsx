import Header from "@/app/(public)/_header";
import Footer from "@/app/(public)/footer";
import {navItems} from "@/config";
import FAB from "@/app/(public)/_fab";

export default async function PublicLayout(
  {
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className={'min-h-screen flex flex-col items-center max-w-[1200px] mx-auto'}>
        <Header img={"/avatar.jpg"} navItems={navItems} fallback={"KT"} className="w-full fixed top-0  z-10"/>
        {children}
        <Footer/>
        <FAB/>
      </main>

    </>

  )
}