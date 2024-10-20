import {Constants} from "@/lib/constants";
import {SSRArticle, SSRArticleWithContent} from "@/interfaces/article";
import {getAllDocumentWithoutFolder, getDocumentById, getDocumentsByTags} from "@/lib/db";



export async function getBlogPostById(id: string): Promise<SSRArticleWithContent> {
  const res = await getDocumentById(id) as any
  const resp = await fetch(`${Constants().RESOURCE_URL}/${res.relativePath}`)

  if(resp.status >= 300) {
    return null as any
  }
  const content = await resp.text()
  return {
    ...res,
    content
  }
}


export async function getBlogPostsByCategory(categoryId: string): Promise<SSRArticle[]> {
  const posts = await getDocumentsByTags([categoryId])
  return posts.map((it,idx)=> ({
    id: it.id,
    title: it.title,
    slug: `/blog/`+it.id,
    excerpt: it.excerpt ?? "",
    createdAt: it.createdAt.toString(),
    lastModifiedAt: it.lastModifiedAt.toString(),
    tags: it.tags,
    wordCount: 0,
  }))
}

export async function getBlogPostMetas():Promise<SSRArticle[]> {
  const blogs = await getAllDocumentWithoutFolder()
  const res = blogs.map((it,idx)=> ({
    id: it.id,
    title: it.title,
    slug: `/blog/`+it.id,
    excerpt: it.excerpt ?? '',
    createdAt: it.createdAt.toString(),
    lastModifiedAt: it.lastModifiedAt.toString(),
    tags: it.tags,
    wordCount: 0,
  }))
  return res
}