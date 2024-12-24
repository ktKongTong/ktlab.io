import { getAvailableCatalogs } from "@/queries/knowledge";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {CatalogLoader} from "@/app/(public)/knowledge/_catalog/aside/catalog-loader";




export default function KnowledgeLayout({
  children
}:{
  children:React.ReactNode;
}){
  const availableCatalogPromise = getAvailableCatalogs()
  return <main className="flex grow justify-center max-w-[1440px] basis-full mx-auto pt-24 w-full lg:px-20">
    <div className={"sticky top-24 w-[240px] hidden  lg:block shrink-0 overflow-y-auto max-h-[calc(100vh-96px)] mr-2 pb-5"}>
      <Suspense fallback={<Skeleton className="w-[240px] h-full rounded-lg" />}>
        <CatalogLoader catalogPromise={availableCatalogPromise}/>
      </Suspense>
    </div>
    {children}
  </main>
}
