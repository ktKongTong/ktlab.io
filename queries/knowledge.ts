import { SSRArticleWithContent } from "@/interfaces/article";
import {Constants} from "@/lib/constants";
import {getAllDocumentWithFolders, getDocumentByPath} from "@/lib/db";
import convertToTree from "@/app/api/[[...route]]/_utils/convert-to-tree";

export async function getKnowledgeBaseByPath(path: string): Promise<SSRArticleWithContent | null> {
  const p = decodeURIComponent(path)
  const res = await getDocumentByPath(p)
  if(res) {
    const resp = await fetch(`${Constants().RESOURCE_URL}/${res.relativePath}`)
    const content = await resp.text()
    return {
      id: res.id,
      title: res.title,
      excerpt: res.excerpt ?? "",
      slug: res.relativePath,
      createdAt: res.createdAt.toString(),
      lastModifiedAt: res.lastModifiedAt.toString(),
      wordCount: 0,
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
  const treeRes = convertToTree(res, "知识库")
  return treeRes
}