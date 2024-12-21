import { Catalog } from "@/interfaces/catalog-item";
import {use} from "react";
import CatalogComp from "./catalog";

export function CatalogLoader(
  {
    catalogPromise
  }:{
    catalogPromise: Promise<Catalog[]>
  }
) {
  const catalog = use(catalogPromise);
  return <CatalogComp catalogs={catalog} className={'w-[240px]'}/>
}

