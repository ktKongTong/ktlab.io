import Header from "@/app/(post-layout)/header";
import Markdown from "@/components/markdown";
import {CircleArrowUp, MessageCircleMore, ThumbsDown, ThumbsUp} from "lucide-react";
import ClientNavLink from "@/app/(post-layout)/NavLink";
import Toc from "@/app/(post-layout)/toc";
import ScrollToTop from "@/app/(post-layout)/scrollToTop";


type  PostLayoutProps = Article & {
  withCommentArea?: boolean;
  withToc?: boolean
  withReactionArea?: boolean
  withHeader?: boolean
}

export default function PostLayout(
{
  id,
  title,
  date,
  tags,
  markdownContent,
  withCommentArea = false,
  withToc = true,
  withReactionArea = false,
  withHeader = true,
}:PostLayoutProps) {

  return  <div className={'flex space-x-2 slide-in-from-bottom-10 animate-in duration-500  transition-all mx-auto'}>
    <div className={'flex flex-col space-y-10  max-w-3xl px-4 grow mx-auto'}>
      <article className={'pb-10'}>
        {withHeader && <Header title={title} date={date} wordcount={""} tags={tags.map(tag=> ({name:tag, href:`/blog/categories/${tag}`}))} />}
        <Markdown content={markdownContent}/>
      </article>

      {
        withCommentArea && <div>comment area</div>
      }
    </div>
    <div className={'sticky top-32 hidden lg:flex flex-col max-h-[calc(100vh-96px)]   w-[180px]   p-2'}>
      {withToc && <Toc className={'min-w-[180px]'}/>}
      <ClientNavLink href={''} className={'font-medium text-sm mt-4 underline hover:underline-offset-4 underline-offset-2 transition-all hover:text-primary'}>
        CD ../
      </ClientNavLink>
      <ScrollToTop  className={'text-sm font-medium mt-4 flex items-center space-x-1'}>
        <span>scroll to top</span>
        <span><CircleArrowUp className={'h-4 w-4'}/></span>
      </ScrollToTop>
      {
        withReactionArea && <>
              <div className={'pb-20 mt-auto transition-all duration-500 '}>
                  <div className={'  mt-auto flex flex-col'}>
                      <MessageCircleMore className={'w-6 h-6 m-2 opacity-70 hover:opacity-100'}/>
                      <ThumbsUp className={'w-6 h-6 m-2 opacity-70 hover:opacity-100'}/>
                      <ThumbsDown className={'w-6 h-6 m-2 opacity-70 hover:opacity-100'}/>
                  </div>
              </div>
          </>
      }
    </div>
  </div>
}