import Header from "@/app/_post-layout/header";
import Markdown from "@/components/markdown";
import {CircleArrowUp} from "lucide-react";
import ClientNavLink from "@/app/_post-layout/NavLink";
import Toc from "@/app/_post-layout/toc";
import ScrollToTop from "@/app/_post-layout/scrollToTop";
import {SSRArticle, SSRArticleWithContent} from "@/interfaces/article";
import Comments from "@/components/comment/comments";
import {ClientOnly} from "@/components/client-only";
import CommentEditor from "@/components/comment/comment-editor";
import Reaction from "@/components/comment/reaction"
import {PostContextProvider} from "@/app/_post-layout/PostContextProvider";
import {RawMarkdownRender} from "@/components/markdown/xlog/render";
import {renderPageContent} from "@/components/markdown/xlog";
import TocLoader from "@/app/_post-layout/toc-loader";


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
        <div className={'flex flex-col space-y-10  px-4 max-w-4xl mx-auto'}>
          <article className={'pb-10'}>
            {withHeader &&
                <Header
                    title={title}
                    createdAt={createdAt}
                    wordCount={wordCount}
                    tags={tags.map(tag => ({name: tag, href: `/blog/categories/${tag}`}))}
                />
            }

              <RawMarkdownRender content={content}/>
          </article>
          {
            withCommentArea &&
              <div>
                  <ClientOnly>
                      <CommentEditor documentId={id}/>
                      <Comments documentId={id}/>
                  </ClientOnly>
              </div>
          }
        </div>
        <div className={'sticky top-32 hidden lg:flex flex-col max-h-[calc(100vh-96px)]   w-[180px]   p-2'}>
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
        </div>
      </div>
    </PostContextProvider>
  )
}
