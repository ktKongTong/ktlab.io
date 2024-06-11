import { notFound } from "next/navigation";
import PostLayout from "@/app/(post-layout)";
import { getBlogPostById } from "@/queries/blog";
import { useArticle } from "@/hooks/useArticle";
import {Metadata} from "next";

const metadata: Metadata = {
  title: 'ktlab | knowledge base',
  description: 'knowledge base page of ktlab.io',
};


export async function generateMetadata(
  { params }: {
    params: { id: string[]  }
  },
): Promise<Metadata> {

  let path = params.id ?? []
  const blog =  await getBlogPostById(params.id.join('/'));
  if(blog?.title) {
    return {
      title: "ktlab | " + blog.title,
      description: blog.description,
    }
  }
  return metadata
}

export default async function KnowledgeBasePage({
  params
}: {
  params: { id: string[]  }
}) {
  const blog =  await getBlogPostById(params.id.join('/'));
  if (!blog) {
    notFound()
  }
  const article = useArticle(blog)
  return (
    <PostLayout {...article}/>
  )
}