'use client'
import {useComment} from "./hooks/use-comments";
import {HTMLProps} from "react";
import {LayoutGroup, motion} from "motion/react";
import {CommentItem} from "@/app/_post-layout/comment/comment-item";

export default function Comments({
  contentId,
  className,
  ...rest
}:{
  contentId:string,
}& HTMLProps<HTMLDivElement>) {
  const { isLoading:isLoadingMore, comments, getClientIdByServerId } = useComment(contentId)

  return (
    <div className={className} {...rest}>
      {
        !isLoadingMore && <motion.ul transition={{
          staggerChildren: 0.1,
        }} className={'space-y-2'}>
        <LayoutGroup>
          {
            comments?.map((comment) => (
              <motion.li
                layout={'position'}
                initial={{x:20, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x:20, opacity: 0}}
                key={getClientIdByServerId(comment.id)}
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

