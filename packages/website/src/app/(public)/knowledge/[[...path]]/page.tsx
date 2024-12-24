import PostLayout from "@/app/_post-layout";
import {Metadata} from "next";
import {getAvailableCatalogsByPath, getKnowledgeBaseByPath} from "@/queries/knowledge";
import {getAllDocumentWithoutFolderByStartPath} from "@/lib/db";
import NotFound from "@/app/not-found";
import {unstable_cache} from "next/cache";
import {pathPrefix} from "@/config";
import {CatalogPage} from "@/app/(public)/knowledge/_catalog/page/catalog-page";


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
  const res = await getAllDocumentWithoutFolderByStartPath(pathPrefix.knowledgebases.basePath)
  const catalogPath = pathPrefix.knowledgebases.children.map(it => it.path.replace(pathPrefix.knowledgebases.basePath, '').replace('/',''))
  return res.map((post) => ({
    path: post.relativePath.replace(pathPrefix.knowledgebases.basePath, '').replace('/','').split('/'),
  })).concat(catalogPath.map(it => ({path: it.split('/')})))
}

const getContentByPath = unstable_cache(getKnowledgeBaseByPath, ['knowledge-base-item'], {
  revalidate: false,
  tags: ['knowledge-base-item']
})

const getCatalogByPath = unstable_cache(getAvailableCatalogsByPath, ['knowledgebase-catalog'], {
  revalidate: false,
  tags: ['knowledgebase-catalog']
})

type Params = Promise<{ path?: string[]  }>

export default async function KnowledgebasePage({
  params
}: {
  params: Params
}) {
  let path = (await params).path ?? []
  if(path.length === 1 && path[0] != encodeURIComponent(pathPrefix.knowledgebases.basePath)) {
    const catalog = await getCatalogByPath(decodeURIComponent(path[0]))
    return <CatalogPage catalog={catalog}/>
  }
  path = [encodeURIComponent(pathPrefix.knowledgebases.basePath), ...path]
  const article = await getContentByPath(path.join('/'))
  if (!article) {
    return <NotFound />
  }
  return <PostLayout {...article} withCommentArea={true}/>
}