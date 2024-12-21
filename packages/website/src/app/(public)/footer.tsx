import {Suspense} from "react";
import {LastVisitorInfo, SiteViewCount} from "@/app/(public)/site-stats";

export default async function Footer() {
  return <footer className="lg:mt-8 mt-4 py-4 flex items-center justify-center min-h-16 w-full max-w-[1200px] border-dashed border-border border-t mx-auto">
    <div className={'flex-col flex items-center'}>
      <Suspense>
        <SiteViewCount/>
      </Suspense>
      <Suspense>
        <LastVisitorInfo/>
      </Suspense>
    </div>
  </footer>
}