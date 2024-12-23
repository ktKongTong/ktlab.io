import { getBlogPostsByCategory as getBlogPostsMetaByCategory } from "@/queries/blog";
import {ArticleList} from "@/components/article-list";
import {unstable_cache} from "next/cache";
import {Metadata} from "next";
import {NotPostPage} from "@/app/_post-layout/use-post";
import {NotKnowledgebasePage} from "@/hooks/use-toc";

export async function generateStaticParams() {
  return [
    {
      id: "life"
    },
    {
      id: "tech",
    },
    {
      id: "personal"
    }
  ]
}

type Params = Promise<{ id: string  }>
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const id = (await params).id
  return {
    title: "ktlab | " + id,
    description: "Blog Category | " + id,
  }
}

const getCategoryBlogs = unstable_cache(getBlogPostsMetaByCategory, ['blogs'], {
  revalidate: 3600,
  tags: ['blogs']
})

export default async function Page(
{
    params
}:{
  params: Params
}) {
  const id = (await params).id
  const posts = getCategoryBlogs(id)
  return (
    <div className={'max-w-2xl w-full mx-10'}>
      <div className={'text-3xl font-bold '}>{id}</div>
      <ArticleList postsPromise={posts}/>
      <NotPostPage/>
      <NotKnowledgebasePage/>
    </div>
  )
}