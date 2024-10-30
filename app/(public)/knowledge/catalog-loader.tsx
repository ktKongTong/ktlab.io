import {CatalogItem} from "@/interfaces/catalog-item";
import {use} from "react";
import Catalog from "./catalog";

export function CatalogLoader(
  {
    catalogPromise
  }:{
    catalogPromise: Promise<CatalogItem[]>
  }
) {
  const catalog = use(catalogPromise);
  return <Catalog catalogs={catalog} className={'w-[240px]'}/>
}