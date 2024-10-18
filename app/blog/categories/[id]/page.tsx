import { getBlogPostsByCategory as getBlogPostsMetaByCategory } from "@/queries/blog";
import {ArticleList} from "@/components/article-list";
import {unstable_cache} from "next/cache";

export async function generateStaticParams() {
  return ["life", "tech", "personal"]
}

const getCategoryBlogs = unstable_cache(getBlogPostsMetaByCategory, ['blogs'], {
  revalidate: 3600,
  tags: ['blogs']
})

export default async function Page(
{
    params
}:{
  params: {
    id: string
  }
}) {
  const posts = getCategoryBlogs(params.id);
  return (
    <div className={'max-w-2xl w-full  mx-10'}>
      <div className={'text-3xl font-bold '}>{params.id}</div>
      <ArticleList postsPromise={posts}/>
    </div>
  )
}