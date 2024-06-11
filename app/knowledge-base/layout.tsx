import Catalog from "@/app/knowledge-base/catalog";
import {getKnowledgeBaseCatalog} from "@/queries/knowledge";


export default async function KnowledgeLayout({
  children
}:{
  children:React.ReactNode;
}){
  const catalog = await getKnowledgeBaseCatalog();
  return <main className="knowledge-layout flex grow justify-center max-w-[1200px] mx-auto pt-24 w-full min-h-screen space-x-2 lg:px-20">
        <Catalog catalogs={catalog} className={'w-[240px] h-fit sticky top-24 hidden lg:block shrink-0'}/>
        <div className={'grow'}>
          {children}
        </div>
      </main>
}