'use client'
import {useEffect} from "react";
import {Catalog} from "@/interfaces/catalog-item";
import {create} from "zustand";
import {usePathname} from "next/navigation";
import {findMatchedCatalogByPath} from "@/app/(public)/knowledge/_catalog/aside/catalog";
type CatalogStore = {
  currentCatalog?: Catalog
  availableCatalogs: Catalog[]
}

type Action = {
  updateCatalogs: (catalogs?: Catalog) => void
  updateCurrentCatalogByName: (name:string) => void
  setAvailableCatalog: (catalogs: Catalog[]) => void
}

const useCatalogStore = create<CatalogStore & Action>((set,get) => ({
  currentCatalog: undefined,
  availableCatalogs: [],
  updateCurrentCatalogByName: (name: string) => {
    const catalogs = get().availableCatalogs
    const catalog = catalogs.find((it) => it.name === name)
    if(catalog) {
      set((state)=> ({...state, currentCatalog: catalog}))
    }
  },
  setAvailableCatalog: (catalogs: Catalog[]) => {
    let currentCatalog = get().currentCatalog
    if(!currentCatalog && catalogs.length > 0) currentCatalog = catalogs[0]
      set((state) => ({...state, availableCatalogs: catalogs, currentCatalog: currentCatalog}))
  },
  updateCatalogs: (catalogs?: Catalog) => {
    set((state)=> ({...state, currentCatalog: catalogs}))
  }
}))

export const useCatalog = () => {
  const currentCatalog = useCatalogStore(state => state.currentCatalog)
  const catalogs = useCatalogStore(state => state.availableCatalogs)
  const setAvailableCatalog = useCatalogStore(state => state.setAvailableCatalog)
  const updateCurrentCatalogByName = useCatalogStore(state => state.updateCurrentCatalogByName)
  const updateCatalogs = useCatalogStore(state => state.updateCatalogs)
  const resetCatalog = () => {
    updateCatalogs()
  }


  const pathname = usePathname()
  const catalog = currentCatalog ?? findMatchedCatalogByPath(catalogs, pathname) ?? catalogs?.[0]

  const isKnowledgebasePage = catalogs != undefined
  return {
    currentCatalog: catalog,
    setAvailableCatalog,
    catalogs,
    updateCatalogs,
    updateCurrentCatalogByName,
    resetCatalog,
    isKnowledgebasePage
  }
}

export const NotKnowledgebasePage = () => {
  const {resetCatalog} = useCatalog()
  useEffect(() => {
    resetCatalog()
  }, [])
  return null
}
