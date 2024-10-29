import { SSRArticleWithContent } from "@/interfaces/article";
import {Constants} from "@/lib/constants";
import {getAllDocumentWithFolders, getDocumentByPath} from "@/lib/db";
import convertToTree from "@/app/api/[[...route]]/_utils/convert-to-tree";
import {pathPrefix} from "@/config";

export async function getKnowledgeBaseByPath(path: string): Promise<SSRArticleWithContent | null> {
  const p = decodeURIComponent(path)
  const res = await getDocumentByPath(p)
  if(res) {
    const resp = await fetch(`${Constants().RESOURCE_URL}/${res.relativePath}`)
    const content = await resp.text()
    return {
      id: res.id,
      title: res.title,
      excerpt: res.mdMetadata?.excerpt ?? "",
      slug: res.mdMetadata?.slug ?? res.relativePath,
      createdAt: res.createdAt.toString(),
      lastModifiedAt: res.lastModifiedAt.toString(),
      wordcount: res.mdMetadata?.wordcount ?? 0,
      timeliness: res.mdMetadata?.timeliness ?? false,
      tags: res.tags ?? [],
      content,
    }
  }
  return null;
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
  const res = await getAllDocumentWithFolders()
  const treeRes = convertToTree(res, pathPrefix['knowledge-base'])
  return treeRes
}