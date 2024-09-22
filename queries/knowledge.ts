import * as _ from "lodash-es";
import {Constants} from "@/lib/constants";
import {Article} from "@/interfaces/article";

export async function getKnowledgeBaseByPath(path: string): Promise<Article | null> {
  const url = `${Constants().BASE_URL}/api/knowledge/${path}`
  const resp =await fetch(url).then(res => res.json())
  return resp.data
}





interface CatalogItem {
  id: string,
  href?: string,
  title: string,
  createdAt: string,
  lastModifiedAt: string,
  children: CatalogItem[]
}
export async function getKnowledgeBaseCatalog(): Promise<CatalogItem[]> {
  const res = await fetch(`${Constants().BASE_URL}/api/catalog/knowledge`, {
    cache: "no-cache",
  }).then(res => res.json())
  return res.data
}

