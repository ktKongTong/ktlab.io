import PostLayout from "@/app/(post-layout)";
import {Metadata} from "next";
import { getKnowledgeBaseByPath } from "@/queries/knowledge";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {getAllDocumentWithoutFolderByStartPath} from "@/lib/db";
import NotFound from "@/app/not-found";
import {unstable_cache} from "next/cache";
import {getBlogPostMetas} from "@/queries/blog";


const metadata: Metadata = {
  title: 'ktlab | knowledge base',
  description: 'knowledge-base page of ktlab.io',
};

export async function generateStaticParams() {
  const res = await getAllDocumentWithoutFolderByStartPath("知识库")
  return res.map((post) => ({
    path: post.relativePath.split('/'),
  }))
}

const getContentByPath = unstable_cache(getKnowledgeBaseByPath, ['knowledge-base-item'], {
  revalidate: false,
  tags: ['knowledge-base-item']
})
export async function generateMetadata(
  { params }: {
  params: { path?: string[]  }
},
): Promise<Metadata> {

  let path = params.path ?? []
  const content = await getContentByPath(path.join('/'))
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
  const article = await getContentByPath(path.join('/'))
  if (!article) {
    return <NotFound />
  }
  return <PostLayout {...article} withCommentArea={true}/>
}