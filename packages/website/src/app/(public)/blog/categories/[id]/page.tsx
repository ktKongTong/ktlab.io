import { getBlogPostsByCategory as getBlogPostsMetaByCategory } from "@/queries/blog";
import {ArticleList} from "@/components/article-list";
import {unstable_cache} from "next/cache";
import {Metadata} from "next";

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

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: "ktlab | " + params.id,
    description: "Blog Category | " + params.id,
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
  params: {
    id: string
  }
}) {
  const posts = getCategoryBlogs(params.id)
  return (
    <div className={'max-w-2xl w-full mx-10'}>
      <div className={'text-3xl font-bold '}>{params.id}</div>
      <ArticleList postsPromise={posts}/>
    </div>
  )
}