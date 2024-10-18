import {Constants} from "@/lib/constants";
import {Article} from "@/interfaces/article";
import {getAllDocumentWithoutFolder, getDocumentById, getDocumentsByTags} from "@/lib/db";



export async function getBlogPostById(id: string): Promise<Article> {
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
  // return fetch(`${Constants().BASE_URL}/api/blog/${id}`, {})
  //   .then(res => res.json()).then((data: any) => data.data);
}


export async function getBlogPostsByCategory(categoryId: string): Promise<any> {
  const posts = await getDocumentsByTags([categoryId])
  const res = posts.map((it,idx)=> ({
    id: it.id,
    title: it.title,
    link: `/blog/`+it.id,
    excerpt: it.excerpt,
    createdAt: it.createdAt,
    lastModifiedAt: it.lastModifiedAt,
    tags: it.tags,
    wordCount: 0,
    click: 0,
    like: 0,
    dislike: 0,
  }))
  return res
}

export async function getBlogPostMetas() {
  const blogs = await getAllDocumentWithoutFolder()
  const res = blogs.map((it,idx)=> ({
    id: it.id,
    title: it.title,
    link: `/blog/`+it.id,
    excerpt: it.excerpt,
    createdAt: it.createdAt.toString(),
    lastModifiedAt: it.lastModifiedAt.toString(),
    description: it.excerpt ?? "",
    tags: it.tags,
    wordCount: 0,
    click: 0,
    like: 0,
    dislike: 0,
  }))
  return res
}