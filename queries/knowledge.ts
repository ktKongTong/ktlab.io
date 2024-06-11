import * as _ from "lodash-es";
import {Constants} from "@/lib/constants";

export async function getKnowledgeBaseByPath(path: string): Promise<Article | null> {
  return fetch(`${Constants().BASE_URL}/api/knowledge-base/${path}`, {}).then(res => res.json()).then(data=>data.data).catch(reason => null);
}




interface Article {
  id: string,
  url: string,
  title: string
  description: string
  tags: string[]
  image?: string
  date?: Date
  content: string,
  click: number
  like: number,
  dislike: number
  comments: number
}

interface CatalogItem {
  href?: string,
  title: string,
  level: number,
  catalogs: CatalogItem[]
}
export async function getKnowledgeBaseCatalog(): Promise<CatalogItem[]> {
  const res = await fetch(`${Constants().BASE_URL}/api/knowledgebase/catalog`, {}).then(res => res.json())
  return res.data
}

