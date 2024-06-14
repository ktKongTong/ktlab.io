import PostLayout from "@/app/(post-layout)";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import { getKnowledgeBaseByPath } from "@/queries/knowledge";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";


const metadata: Metadata = {
  title: 'ktlab | knowledge base',
  description: 'knowledge base page of ktlab.io',
};


export async function generateMetadata(
  { params }: {
  params: { path?: string[]  }
},
): Promise<Metadata> {

  let path = params.path ?? []
  const content = await getKnowledgeBaseByPath(path.join('/'))
  if(content?.title) {
    return {
      title: "ktlab | " + content.title,
      description: content.excerpt,
    }
  }
  return metadata
}

export default async function KnowledgeBasePage({
  params
}: {
  params: { path?: string[]  }
}) {
  let path = params.path ?? []
  return <Suspense fallback={<Skeleton className={'w-full h-full'}/>}>
    <PostLoader path={path}/>
  </Suspense>
}


async function PostLoader(
  {
    path
  }:{
    path: string[]
  }
) {

  const article = await getKnowledgeBaseByPath(path.join('/'))
  if (!article) {
    notFound()
  }
  return <PostLayout {...article} withCommentArea={true}/>
}