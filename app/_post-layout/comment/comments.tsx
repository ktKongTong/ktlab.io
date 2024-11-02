'use client'
import {useComments} from "@/hooks/query/use-comments";
import {HTMLProps} from "react";
import {LayoutGroup, motion} from "framer-motion";
import {Skeleton} from "@/components/ui/skeleton";
import {CommentItem} from "@/app/_post-layout/comment/comment-item";

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

