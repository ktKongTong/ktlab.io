import {HTMLMotionProps, LayoutGroup, motion} from "motion/react";
import React, {HTMLProps} from "react";
import {cn} from "@/lib/utils";
import {allReactions, reactionDict} from "@/config/reaction";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {SmilePlus} from "lucide-react";

export function ReactionWithProps(
  {
    reactions,
    className,
    // make sure caller is a client component
    addReaction: _addReaction,
    afterChildren,
    ...rest
  }:{
    reactions: [string, number][],
    addReaction: (name: string) => void,
    afterChildren?: React.ReactNode,
  } & Omit<HTMLMotionProps<"ul">, "ref">
) {

  const addReaction = (name: string)=> {
    _addReaction(name);
    setOpen(false)
  }
  const [open, setOpen] = React.useState(false);

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
            <PopoverTrigger><SmilePlus className={'w-6 h-6 p-1'}/></PopoverTrigger>
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
        {
          afterChildren != undefined && <motion.li
            layout={'position'}
            initial={{x: 20, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: 20, opacity: 0}}
            className={'my-auto inline-flex'}
          >
            {
              afterChildren
            }
          </motion.li>
        }
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
    className={cn('inline-flex justify-between items-center rounded-xl px-2 py-0.5 border-dashed border border-border hover:border-primary cursor-pointer', className)} onClick={onClick} {...rest}>
    <span className={' inline-flex'}>{children}</span>
    <span className={'text-sm'}>{count}</span>
  </span>
}


const MemorizedReaction = Reaction

// React.memo(Reaction, (a,b) => {
// return a.count == b.count && a.key == b.key;
// })
