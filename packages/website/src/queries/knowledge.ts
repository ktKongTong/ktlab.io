import {SSRArticle, SSRArticleWithContent} from "@/interfaces/article";
import {Constants} from "@/lib/constants";
import {getAllDocumentWithFolders, getDocumentByPath} from "@/lib/db";
import convertToTree from "@/app/api/[[...route]]/_utils/convert-to-tree";
import {pathPrefix} from "@/config";
import {DocumentDBO} from "@/interfaces";
import {CatalogItem} from "@/interfaces/catalog-item";

const documentDBOToSSRArticle = (it: DocumentDBO):SSRArticle=> {
  return {
    id: it.id,
    title: it.title,
    slug: it.relativePath,
    createdAt: it.createdAt.toString(),
    lastModifiedAt: it.lastModifiedAt.toString(),
    tags: it.tags,
    excerpt: it.mdMetadata?.excerpt ?? "",
    timeliness: it.mdMetadata?.timeliness ? Boolean(it.mdMetadata.timeliness) : false,
    wordcount: it.mdMetadata?.wordcount ?? 0,
  }
}

export async function getKnowledgeBaseByPath(path: string): Promise<SSRArticleWithContent | null> {
  const p = decodeURIComponent(path)
  const document = await getDocumentByPath(p)
  if(document) {
    const resp = await fetch(`${Constants().RESOURCE_URL}/${document.relativePath}`)
    const content = await resp.text()
    return {
      ...documentDBOToSSRArticle(document),
      content,
    }
  }
  return null;
}

export async function getKnowledgeBaseCatalog(): Promise<CatalogItem[]> {
  const res = await getAllDocumentWithFolders()
  return convertToTree(res, pathPrefix['knowledge-base'])
}