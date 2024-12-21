import PostLayout from "@/app/_post-layout";
import {Metadata} from "next";
import { getKnowledgeBaseByPath } from "@/queries/knowledge";
import {getAllDocumentWithoutFolderByStartPath} from "@/lib/db";
import NotFound from "@/app/not-found";
import {unstable_cache} from "next/cache";
import {pathPrefix} from "@/config";
import {use} from "react";


const metadata: Metadata = {
  title: 'ktlab | knowledgebase',
  description: 'knowledgebase page',
};

export async function generateMetadata(
  { params }: {
    params: Params
  },
): Promise<Metadata> {

  let path = (await params).path ?? []
  const content = await getContentByPath(path.join('/'))
  if(content?.title) {
    return {
      title: "ktlab | " + content.title,
      description: content.excerpt,
    }
  }
  return metadata
}

export async function generateStaticParams() {
  const res = await getAllDocumentWithoutFolderByStartPath(pathPrefix["knowledge-base"])
  return res.map((post) => ({
    path: post.relativePath.split('/'),
  }))
}

const getContentByPath = unstable_cache(getKnowledgeBaseByPath, ['knowledge-base-item'], {
  revalidate: false,
  tags: ['knowledge-base-item']
})

type Params = Promise<{ path?: string[]  }>

export default async function KnowledgeBasePage({
  params
}: {
  params: Params
}) {
  let path = (await params).path ?? []
  const article = await getContentByPath(path.join('/'))
  if (!article) {
    return <NotFound />
  }
  return <PostLayout {...article} withCommentArea={true}/>
}