'use client'
import {useCurrentPostId} from "@/app/_post-layout/use-post";
import {Skeleton} from "@/components/ui/skeleton";
import {useContentInteractionData} from "@/hooks/query/use-interaction-data";
import {motion, AnimatePresence} from "motion/react";

export function View() {
  const {contentId} = useCurrentPostId()
  const { view, isLoading } = useContentInteractionData(contentId)
  return <AnimatePresence>
    {
      isLoading && <motion.span
            key={'view-count-skeleton'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        ><Skeleton className={'w-8 h-4'}/></motion.span>
    }
    {
      !isLoading && <motion.span
            key={'view-count'}
            initial={{ opacity: 0, y: 10 }}
            animate={{opacity: 1, y: 0 }}
        >
        {view}
        </motion.span>
    }
  </AnimatePresence>
}