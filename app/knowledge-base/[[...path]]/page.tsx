import PostLayout from "@/app/(post-layout)";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import { getKnowledgeBaseByPath } from "@/queries/knowledge";
import {useArticle} from "@/hooks/useArticle";


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
      description: content.description,
    }
  }
  return metadata
}

export default async function KnowledgeBasePage({
  params
}: {
  params: { path?: string[]  }
}) {
  let id = params.path ?? []
  const content = await getKnowledgeBaseByPath(id.join('/'))
  if (!content) {
    notFound()
  }
  const postDetail = useArticle(content)
  return <PostLayout {...postDetail}/>
}