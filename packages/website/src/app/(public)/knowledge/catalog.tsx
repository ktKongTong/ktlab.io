'use client';
import React, {HTMLProps, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import useToc from "@/hooks/use-toc";
import {CatalogItem, CatalogItemProps} from "./catalog-item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Catalog as CatalogProps} from "@/interfaces/catalog-item";
export default function Catalog({
  catalogs,
  ...rest
}: {
  catalogs: CatalogProps[]
} & HTMLProps<HTMLDivElement>) {
  const {updateCatalogs} = useToc()

  const [currentCatalogIdx, setCurrentCatalogIdx] = useState(0)
  const currentCatalog = catalogs[currentCatalogIdx]
  useEffect(() => {
    updateCatalogs(currentCatalog.catalogs)
    return ()=> {
      updateCatalogs(undefined)
    }
  }, [catalogs])
  return (
    <div {...rest} className={cn('relative', rest.className)}>
      <div className={'text-lg font-bold py-2'}>Catalog</div>
      <Select>
        <SelectTrigger className="w-[236px] mx-auto h-8" value={currentCatalogIdx} onSelect={(e)=> {
          setCurrentCatalogIdx(parseInt(e.currentTarget.value))
        }}>
          <SelectValue placeholder={currentCatalog.name} />
        </SelectTrigger>
        <SelectContent>
          {
            catalogs.map((it,idx) => (
              <SelectItem key={it.name} value={idx.toString()}>{it.name}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>
      <ul className={'pt-3'}>
        {
          currentCatalog.catalogs.map((catalog, idx) => (<CatalogItem key={idx} {...catalog} />))
        }
      </ul>
    </div>
  )
}