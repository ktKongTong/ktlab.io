'use client'
import React, {HTMLProps, useOptimistic, useTransition} from "react";
import {cn} from "@/lib/utils";
import {useContentInteractionData} from "@/hooks/query/use-interaction-data";
import {allReactions, reactionDict} from "@/config/reaction";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { SmilePlus } from "lucide-react";
import {AnimatePresence, HTMLMotionProps, LayoutGroup, motion} from "motion/react";
import {CommentItem} from "@/app/_post-layout/comment/comment-item";

export default function Reactions(
  {
    contentId,
    className,
    ...rest
  }:{
    contentId: string
  } & Omit<HTMLMotionProps<"ul">, "ref">
) {
  const {reactions, addReactionAsync, addReaction:_addReaction} = useContentInteractionData(contentId)
  const [open, setOpen] = React.useState(false);

  const addReaction = (name: string)=> {
    _addReaction(name);
    setOpen(false)
  }

  return <>
    <motion.ul
      className={cn('flex items-center gap-2 flex-wrap', className)}
      {...rest}
      transition={{
        staggerChildren: 0.1,
      }}
    >
      <LayoutGroup>
        {
              reactions
              .map(([name, count]) =>
                <motion.li
                  layout={'position'}
                  initial={{x: 20, opacity: 0}}
                  animate={{x: 0, opacity: 1}}
                  exit={{x: 20, opacity: 0}}
                  key={name}
                >
                  <Reaction
                    count={count}
                    className={'w-[50px]'}
                    onAdd={async () => addReaction(name)}>
                    {reactionDict[name]}</Reaction>
                </motion.li>
              )
        }
        <motion.li
          layout={'position'}
          initial={{x: 20, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          exit={{x: 20, opacity: 0}}
          className={'my-auto inline-flex'}
        >
          <Popover open={open} onOpenChange={(s) => setOpen(s)}>
            <PopoverTrigger><SmilePlus className={'w-6 h-6'}/></PopoverTrigger>
            <PopoverContent className={'max-w-48 overflow-hidden'}>
              <ul className={'grid gap-2 grid-cols-4'}>
                {
                  allReactions.map(({name, node}) => <li
                    key={name}
                    onClick={() => addReaction(name)}
                    className={'p-1 cursor-pointer border-dashed border-border rounded-xl hover:border-primary'}
                  >{node}</li>)
                }
              </ul>
            </PopoverContent>
          </Popover>
        </motion.li>
      </LayoutGroup>
    </motion.ul>
  </>
}

function Reaction(
  {
    children,
    count,
    onAdd,
    className,
    ...rest
  }: {
    children: React.ReactNode,
    onAdd: () => Promise<any>
    count: number
  } & HTMLProps<HTMLSpanElement>) {
  // const [optimisticCount, addOptimistic] = useOptimistic(count, (state) => state + 1);

  // const [isPending, startTransition] = useTransition()
  function onClick() {
    // if(!isPending) {
    //   startTransition(async ()=> {
    // addOptimistic(optimisticCount);
    onAdd()
    // })
    // }
  }

  return <span
    className={cn('inline-flex space-x-1 items-center rounded-xl px-2 py-0.5 border-dashed border border-border hover:border-primary cursor-pointer', className)} onClick={onClick} {...rest}>
    <span className={' inline-flex'}>{children}</span>
    <span className={'text-sm'}>{count}</span>
  </span>
}


const MemorizedReaction = Reaction

  // React.memo(Reaction, (a,b) => {
  // return a.count == b.count && a.key == b.key;
// })
