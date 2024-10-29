'use client'
import {useComments} from "@/hooks/query/use-comments";
import {HTMLProps} from "react";
import {cn, formatTime, relativeTime} from "@/lib/utils";
import {RawMarkdownRender} from "@/components/markdown/xlog/render";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LayoutGroup, motion} from "framer-motion";
import {Skeleton} from "@/components/ui/skeleton";

export default function Comments({
  contentId,
  className,
  ...rest
}:{
  contentId:string,
}& HTMLProps<HTMLDivElement>) {
  const { isLoadingMore, comments } = useComments(contentId)
  return (
    <div className={className} {...rest}>
      {
        isLoadingMore && <Skeleton className={'w-full max-h-80'}/>
      }
      {
        !isLoadingMore && <motion.ul transition={{
          staggerChildren: 0.1,
        }} className={'space-y-2'}>
        <LayoutGroup>
          {
            comments?.map((comment, idx) => (
              <motion.li
                layout={'position'}
                initial={{x:40, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x:40, opacity: 0}}
                key={comment.id}
              >
                <CommentItem {...comment} />
              </motion.li>
            ))
          }
        </LayoutGroup>
        </motion.ul>
      }
    </div>
  )
}

interface CommentProps {
  id: string,
  version: number,
  body: {
    text: string,
  },
  documentId: string,
  state: string,
  authorId: string,
  userInfo: {
    imageUrl: string,
    email: string,
    name?: string
  },
  createAt: string,
  parentId?: string,
}

function CommentItem (
{
  id,
  version,
  body,
  documentId,
  state,
  authorId,
  userInfo,
  className,
  createAt,
  parentId,
  ...rest
}:CommentProps & HTMLProps<HTMLDivElement>) {
  return (
    <div className={'flex'}>
      <Avatar className={'w-8 h-8 rounded-full mx-2 drop-shadow-md translate-y-2'}>
        <AvatarImage src={userInfo.imageUrl}/>
        <AvatarFallback >{userInfo.name}</AvatarFallback>
      </Avatar>
      <div className={'text-sm font-medium'}>
        {parentId && <div></div>}
        <div className={'space-x-2 flex items-center justify-start mb-1  text-xs'}>
          <span>{userInfo.name}</span>
          <span>{relativeTime(createAt)}</span>
        </div>

        <div className={cn('relative px-2 py-0.5 rounded-lg bg-secondary text-secondary-foreground w-fit', className)} {...rest}>
          {
            version > 1 && <div className={'absolute'}>
              已编辑
            </div>
          }
          <RawMarkdownRender content={body.text}/>
        </div>
      </div>

    </div>

  )
}