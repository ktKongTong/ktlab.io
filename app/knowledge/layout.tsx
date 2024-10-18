import Catalog from "@/app/knowledge/catalog";
import {getKnowledgeBaseCatalog} from "@/queries/knowledge";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";




export default function KnowledgeLayout({
  children
}:{
  children:React.ReactNode;
}){
  return <main className="knowledge-layout flex grow justify-center max-w-[1440px] mx-auto pt-24 w-full min-h-screen space-x-2 lg:px-20">
    <div className={"sticky top-24 w-[240px] hidden lg:block shrink-0 overflow-y-scroll max-h-[calc(100vh-96px)] pt-5 pb-5 "}>
      <Suspense fallback={<Skeleton className="w-[240px] h-full rounded-lg" />}>
        <CatalogLoader />
      </Suspense>
    </div>
    <div className={'grow'}>
      {children}
    </div>
  </main>
}


async function CatalogLoader() {
  const catalog = await getKnowledgeBaseCatalog();
  return <Catalog catalogs={catalog} className={'w-[240px]'}/>
}