import PostLayout from "@/app/_post-layout";
import {getBlogPostBySlugOrId} from "@/queries/blog";
import {Metadata} from "next";
import {getAllDocumentWithoutFolder} from "@/lib/db";
import {unstable_cache} from "next/cache";
import NotFound from "@/app/not-found";
import {NotKnowledgebasePage} from "@/hooks/use-toc";
import React from "react";

const metadata: Metadata = {
  title: 'ktlab | Blog',
  description: 'Blog Page',
};

export const revalidate = false;

const getPosts = unstable_cache(getBlogPostBySlugOrId,['blogs'], { revalidate: false})

export async function generateStaticParams() {
  const blogs = await getAllDocumentWithoutFolder()
  const ids = blogs.map(it => ({id:it.id.split('\/')}))
  return ids
}
type Params = Promise<{ id: string[]  }>
export async function generateMetadata(
  { params }: {
    params: Params
  },
): Promise<Metadata> {

  let path = (await params).id ?? []
  const blog =  await getBlogPostBySlugOrId(path.join('/'));
  if(blog?.title) {
    return {
      title: "ktlab | " + blog.title,
      description: blog.excerpt,
    }
  }
  return metadata
}

export default async function BlogPage({
  params
}: {
  params: Params
}) {
  const blog =  await getPosts((await params).id.join('/'));
  if (!blog) {
    return <NotFound />
  }
  return (
    <>
      <PostLayout {...blog} withCommentArea={true}/>
      <NotKnowledgebasePage/>
    </>
  )
}