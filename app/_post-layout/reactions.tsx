import React, {HTMLProps, useOptimistic, useTransition} from "react";
import {cn} from "@/lib/utils";
import {useContentInteractionData} from "@/hooks/query/use-interaction-data";
import {useComments} from "@/hooks/query/use-comments";
import {allReactions, reactionDict} from "@/config/reaction";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { SmilePlus } from "lucide-react";

export default function Reactions(
  {
    contentId,
    className,
    ...rest
  }:{
    contentId: string
  } & HTMLProps<HTMLDivElement>
) {
  const {reactions} = useContentInteractionData(contentId)
  const {addReactionAsync} = useComments(contentId)
  const [open, setOpen] = React.useState(false);
  return <>
  <div className={cn('flex items-center gap-2 flex-wrap', className)} {...rest}>
    {
      reactions.map(({name, count}) => <MemorizedReaction key={name} count={count} onAdd={()=>addReactionAsync(name)}>{reactionDict[name]}</MemorizedReaction>)
    }
    <Popover>
      <PopoverTrigger><SmilePlus className={'w-4 h-4'} /></PopoverTrigger>
      <PopoverContent className={'max-w-40 overflow-hidden'} >
        <ul className={'grid gap-2 grid-cols-5'}>
          {
            allReactions.map(({name, node}) => <div key={name} onClick={()=>addReactionAsync(name)} className={'p-1 cursor-pointer border-dashed rounded-xl'}>{node}</div>)
          }
        </ul>
      </PopoverContent>
    </Popover>
  </div>
  </>
}

function Reaction(
{
  children,
  count,
  onAdd,
  className,
  ...rest
}:{
  children: React.ReactNode,
  onAdd: ()=> Promise<void>
  count: number
} & HTMLProps<HTMLSpanElement>) {
  const [optimisticCount, addOptimistic] = useOptimistic(count, (state) => state + 1);

  const [isPending, startTransition] = useTransition()
  function onClick () {
    if(!isPending) {
      startTransition(async ()=> {
        addOptimistic(count);
        await onAdd()
      })
    }
  }
  return <span
    className={cn('inline-flex space-x-1 items-center rounded-xl px-2 py-0.5 border-dashed border cursor-pointer', isPending && 'animate-pulse', className)} onClick={onClick} {...rest}>
    <span className={' inline-flex'}>{children}</span>
    <span className={'text-sm'}>{optimisticCount}</span>
  </span>
}


const MemorizedReaction = React.memo(Reaction, (a,b) => {
  return a.count == b.count && a.key == b.key;
})
