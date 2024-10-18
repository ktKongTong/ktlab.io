import {Constants} from "@/lib/constants";
import {Article} from "@/interfaces/article";
import {getAllDocumentWithFolders, getDocumentByPath} from "@/lib/db";
import convertToTree from "@/app/api/[[...route]]/_utils/convert-to-tree";

export async function getKnowledgeBaseByPath(path: string): Promise<Article | null> {
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
      click: 0,
      like: 0,
      dislike: 0,
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
    // const res = await fetch(`${Constants().BASE_URL}/api/catalog/knowledge`, {
    //   cache: "no-cache",
    // }).then(res => res.json())
    // return res.data
}