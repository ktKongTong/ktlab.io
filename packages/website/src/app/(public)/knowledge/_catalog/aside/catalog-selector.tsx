'use client'

import {usePathname, useRouter} from "next/navigation";

import {useCatalog} from "@/hooks/use-catalog";

import React, {useEffect} from "react";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

import Link from "@/components/link";

export function CatalogSelector() {
  const router = useRouter()
  const {currentCatalog, catalogs, resetCatalog} = useCatalog()

  useEffect(() => resetCatalog, [])
  const changeCatalog = (v: string) => {
    const catalog = catalogs.find(it => it.name === v)!
    if(catalog) {
      if(catalog?.href) router.push(catalog.href)
    }
  }

  return <Select onValueChange={changeCatalog} defaultValue={currentCatalog?.name} value={currentCatalog?.name}>
    <SelectTrigger className=" w-full mx-auto h-8" >
      <SelectValue placeholder={currentCatalog?.name} />
    </SelectTrigger>
    <SelectContent>
      {
        catalogs.map((it,idx) => (
          <SelectItem key={it.name} value={it.name}><Link href={it.href ?? ''}>{it.name}</Link></SelectItem>
        ))
      }
    </SelectContent>
  </Select>

}