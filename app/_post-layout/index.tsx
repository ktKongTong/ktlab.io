import Header from "@/app/_post-layout/header";
import {CircleArrowUp} from "lucide-react";
import ClientNavLink from "@/app/_post-layout/NavLink";
import Toc from "@/app/_post-layout/toc";
import ScrollToTop from "@/app/_post-layout/scrollToTop";
import { SSRArticleWithContent} from "@/interfaces/article";
import Reaction from "@/components/comment/reaction"
import {PostContextProvider} from "@/app/_post-layout/PostContextProvider";
import {RawMarkdownRender} from "@/components/markdown/xlog/render";
import {renderPageContent} from "@/components/markdown/xlog";
import TocLoader from "@/app/_post-layout/toc-loader";
import dynamic from "next/dynamic";
import {Skeleton} from "@/components/ui/skeleton";

const LzyFooter = dynamic(() => import('./footer'), {
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
  tags,
  content,
  wordCount,
  withCommentArea = false,
  withToc = true,
  withReactionArea = true,
  withHeader = true,
}:PostLayoutProps) {

  const inParsedContent = renderPageContent({content})
  const toc = inParsedContent.toToc()
  return (
    <PostContextProvider contentId={id}>
      <div className={'flex justify-between space-x-2 slide-in-from-bottom-2 grow mx-auto'}>
        <main className={'flex flex-col px-4 max-w-4xl grow mx-auto'}>
          {withHeader &&
              <Header
                  title={title}
                  createdAt={createdAt}
                  wordCount={wordCount}
                  tags={tags.map(tag => ({name: tag, href: `/blog/categories/${tag}`}))}
              />
          }
          <article>
             <RawMarkdownRender content={content}/>
          </article>
          <LzyFooter documentId={id} className={'pb-10 pt-5 mt-5 border-t  border-dashed'} />
        </main>
        <aside className={'sticky top-32 hidden lg:flex flex-col max-h-[calc(100vh-96px)] w-[180px] p-2'}>
          {withToc && toc && <TocLoader toc={toc}/>}
          {withToc && toc && <Toc className={'min-w-[180px]'} toc={toc}/>}
          <ClientNavLink href={''} className={'font-medium text-sm mt-4 underline hover:underline-offset-4 underline-offset-2 transition-all hover:text-primary'}>
            CD ../
          </ClientNavLink>
          <ScrollToTop className={'text-sm font-medium mt-4 flex items-center space-x-1'}>
            <span>scroll to top</span>
            <span><CircleArrowUp className={'h-4 w-4'}/></span>
          </ScrollToTop>
          {
            withReactionArea && <>
                  <div className={'pb-20 mt-auto'}>
                      <Reaction id={id}/>
                  </div>
              </>
          }
        </aside>
      </div>
    </PostContextProvider>
  )
}
