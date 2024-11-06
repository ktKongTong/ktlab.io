import {Constants} from "@/lib/constants";
import {SSRArticle, SSRArticleWithContent} from "@/interfaces/article";
import {getAllDocumentWithoutFolder, getDocumentById, getDocumentByIdOrSlug, getDocumentsByTags} from "@/lib/db";
import {DocumentDBO} from "@/interfaces";


const documentDBOToSSRArticle = (it: DocumentDBO):SSRArticle=> {
  return {
    id: it.id,
    title: it.title,
    slug: `/blog/`+(it.mdMetadata?.slug ?? it.id),
    excerpt: it.mdMetadata?.excerpt ?? "",
    createdAt: it.createdAt.toString(),
    lastModifiedAt: it.lastModifiedAt.toString(),
    timeliness: it.mdMetadata?.timeliness ? Boolean(it.mdMetadata.timeliness) : false,
    tags: it.tags,
    wordcount: it.mdMetadata?.wordcount ?? 0,
  }
}

export async function getBlogPostBySlugOrId(id: string): Promise<SSRArticleWithContent | null> {
  const res = await getDocumentByIdOrSlug(id)
  if(!res) return null;
  const resp = await fetch(`${Constants().RESOURCE_URL}/${res.relativePath}`)
  if(resp.status >= 300) { return null }
  const content = await resp.text()
  return {
    ...documentDBOToSSRArticle(res),
    content
  }
}

export async function getBlogPostsByCategory(categoryId: string): Promise<SSRArticle[]> {
  const posts = await getDocumentsByTags([categoryId])
  return posts.map(documentDBOToSSRArticle)
}

export async function getBlogPosts():Promise<SSRArticle[]> {
  const posts = await getAllDocumentWithoutFolder()
  return posts.map(documentDBOToSSRArticle)
}