import {getBlogPosts} from "@/queries/blog";
import {ArticleList} from "@/components/article-list";
import {unstable_cache} from "next/cache";
import {Metadata} from "next";
import {NotPostPage} from "@/app/_post-layout/use-post";
import {NotKnowledgebasePage} from "@/hooks/use-catalog";
import React from "react";


const getBlogs = unstable_cache(getBlogPosts, ['blogs'], {
  revalidate: 3600,
  tags: ['blogs']
})

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ktlab | Blogs",
    description: "Blogs",
  }
}

export default async function Page() {
  const posts =  getBlogs()
  return (
    <div className={'max-w-2xl w-full mx-10'}>
      <div className={'text-3xl font-bold '}>{"文稿"}</div>
      <ArticleList postsPromise={posts}/>
      <NotPostPage/>
      <NotKnowledgebasePage/>
    </div>
  )
}