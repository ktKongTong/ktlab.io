import Header from "@/app/_post-layout/header";
import {CircleArrowUp} from "lucide-react";
import ClientNavLink from "@/app/_post-layout/NavLink";
import Toc from "@/app/_post-layout/toc";
import ScrollToTop from "@/app/_post-layout/scrollToTop";
import { SSRArticleWithContent} from "@/interfaces/article";
import {PostContextProvider} from "@/app/_post-layout/post-context-provider";
import {Markdown} from "@/components/markdown";
import {renderPageContent} from "@/components/markdown/xlog";
import TocLoader from "@/app/_post-layout/toc-loader";
import dynamic from "next/dynamic";
import {Skeleton} from "@/components/ui/skeleton";
import {ContentSelectionMenuClient as ContentSelectionMenu} from "@/app/_post-layout/content-selection-menu.client";
import {ClientCommentIDProvider} from "./comment/hooks/use-client-comment-id";

const LazyFooter = dynamic(() => import('./footer'), {
  loading: ()=> <Skeleton className={'w-full h-full'}/>
})

type  PostLayoutProps = SSRArticleWithContent & {
  withCommentArea?: boolean;
  withToc?: boolean
  withReactionArea?: boolean
  withHeader?: boolean
}

export default function PostLayout(
{
  id,
  title,
  createdAt,
  lastModifiedAt,
  tags,
  content,
  wordcount,
  timeliness,
  withToc = true,
  withHeader = true,
}:PostLayoutProps) {

  const inParsedContent = renderPageContent({content})
  const toc = inParsedContent.toToc()
  return (
    <PostContextProvider contentId={id}>
      <ClientCommentIDProvider>
        <>
          <main className={'flex flex-col px-4 max-w-4xl grow basis-0 mx-auto min-w-0 shrink overflow-x-auto'}>
              {
                withHeader &&
                  <Header
                      title={title}
                      createdAt={createdAt}
                      wordcount={wordcount}
                      lastModifiedAt={lastModifiedAt}
                      timeliness={timeliness}
                      tags={tags.map(tag => ({name: tag, href: `/blog/categories/${tag}`}))}
                  />
              }
              <ContentSelectionMenu/>
              <Markdown content={content} as={'article'}
                        className={'selection:text-primary-foreground selection:bg-primary select-text'}/>
              <LazyFooter documentId={id} className={'pb-10 pt-5 mt-5 border-t border-border border-dashed'}/>
          </main>
          <aside
            className={'sticky top-32 hidden lg:flex flex-col max-h-[calc(100vh-96px)] w-[180px] p-2 select-none'}>
            {withToc && toc && <TocLoader toc={toc}/>}
            {withToc && toc && <Toc className={'min-w-[180px]'} toc={toc}/>}
            <ClientNavLink href={''} className={'font-medium text-sm mt-4 animate-underline'}>
              CD ../
            </ClientNavLink>
            <ScrollToTop className={'text-sm font-medium mt-4 flex items-center space-x-1'}>
              <span>scroll to top</span>
              <CircleArrowUp className={'h-4 w-4'}/>
            </ScrollToTop>
          </aside>
        </>
      </ClientCommentIDProvider>
    </PostContextProvider>
  )
}
