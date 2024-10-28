'use client';
import React, {HTMLProps, useEffect } from "react";
import {cn} from "@/lib/utils";
import useToc from "@/hooks/use-toc";
import {CatalogItem, CatalogItemProps} from "@/app/knowledge/catalog-item";

export default function Catalog({
  catalogs,
  ...rest
}: {
  catalogs:CatalogItemProps[]
} & HTMLProps<HTMLDivElement>) {

  const {updateCatalogs} = useToc()
  useEffect(() => {
    updateCatalogs(catalogs)
    return ()=> {
      updateCatalogs(undefined)
    }
  }, [catalogs, updateCatalogs]);
  return (
    <div {...rest} className={cn('relative', rest.className)}>
      <div className={'text-lg font-bold py-2'}>Catalog</div>
      <ul>
        {
          catalogs.map((catalog, idx) => (<CatalogItem key={idx} {...catalog} />))
        }
      </ul>
    </div>
  )
}