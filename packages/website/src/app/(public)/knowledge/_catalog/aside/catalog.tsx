'use client';
import React, {HTMLProps, useEffect} from "react";
import {cn} from "@/lib/utils";
import {useCatalog} from "@/hooks/use-catalog";
import { CatalogItem } from "./catalog-item";
import {Catalog as CatalogProps} from "@/interfaces/catalog-item";
import {CatalogSelector} from "@/app/(public)/knowledge/_catalog/aside/catalog-selector";
import {usePathname} from 'next/navigation'

export const findMatchedCatalogByPath = (  catalogs: CatalogProps[], path: string) => {
  const res = catalogs.find(it => path.startsWith(it.href) || path.startsWith(it.href.slice(1)))
  return res
}

export default function Catalog({
  catalogs,
  ...rest
}: {
  catalogs: CatalogProps[]
} & HTMLProps<HTMLDivElement>) {
  const { currentCatalog, setAvailableCatalog } = useCatalog()
  useEffect(() => {
    setAvailableCatalog(catalogs)
  }, [catalogs]);
  const pathname = usePathname()
  const catalog = currentCatalog ?? findMatchedCatalogByPath(catalogs, pathname) ?? catalogs[0]

  return (
    <div {...rest} className={cn('relative', rest.className)}>
      <div className={'flex items-center gap-2 px-2 justify-between'}>
      <CatalogSelector/>
      </div>
      <ul className={'pt-3'}>
        {
          catalog?.catalogs.map((catalog, idx) => (<CatalogItem key={idx} {...catalog} />))
        }
      </ul>
    </div>
  )
}
