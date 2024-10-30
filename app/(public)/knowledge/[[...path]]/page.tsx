import PostLayout from "app/_post-layout";
import {Metadata} from "next";
import { getKnowledgeBaseByPath } from "@/queries/knowledge";
import {getAllDocumentWithoutFolderByStartPath} from "@/lib/db";
import NotFound from "@/app/not-found";
import {unstable_cache} from "next/cache";
import {pathPrefix} from "@/config";


const metadata: Metadata = {
  title: 'ktlab | knowledge base',
  description: 'knowledge-base page',
};

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