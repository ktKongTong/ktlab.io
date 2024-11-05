import {getKnowledgeBaseCatalog} from "@/queries/knowledge";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CatalogLoader } from "@/app/(public)/knowledge/catalog-loader";




export default function KnowledgeLayout({
  children
}:{
  children:React.ReactNode;
}){
  const catalogPromise = getKnowledgeBaseCatalog()
  return <main className="flex grow justify-center max-w-[1440px] mx-auto pt-24 w-full space-x-2 lg:px-20">
    <div className={"sticky top-24 w-[240px] hidden lg:block shrink-0 overflow-y-scroll max-h-[calc(100vh-96px)] pb-5"}>
      <Suspense fallback={<Skeleton className="w-[240px] h-full rounded-lg" />}>
        <CatalogLoader catalogPromise={catalogPromise}/>
      </Suspense>
    </div>
    {children}
  </main>
}