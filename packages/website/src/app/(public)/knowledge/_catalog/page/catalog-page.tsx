import {NotKnowledgebasePage} from "@/hooks/use-catalog";
import React from "react";
import {NotPostPage} from "@/app/_post-layout/use-post";
import {Catalog} from "@/interfaces/catalog-item";
import {CatalogList} from "./list";

export const CatalogPage = (
  {catalog}: {catalog:  Catalog}
) => {
  const currentCatalog = catalog
  const name = currentCatalog?.name
  const description = currentCatalog?.description
  return <main className={'w-full flex items-center flex-col px-4  py-4'}>
    <div className={'space-y-2 self-start'}>
      <span  className={'text-xl font-black'}>{name}</span>
      <p className={'text-zinc-500 text-sm'}>{description}</p>
    </div>
    <div className={'w-full grow'}>
      {
        currentCatalog && currentCatalog.catalogs.map((it) => {
          return <CatalogList title={it.title} createdAt={it?.createdAt} href={it.href} key={it.title} children={it?.children ?? []}/>
        })
      }
    </div>
    <NotKnowledgebasePage/>
    <NotPostPage/>
  </main>
}
