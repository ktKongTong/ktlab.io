'use client'
import React, {HTMLProps, useOptimistic, useTransition} from "react";
import {cn} from "@/lib/utils";
import {useContentInteractionData} from "@/hooks/query/use-interaction-data";
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
  const {reactions, addReactionAsync, addReaction:_addReaction} = useContentInteractionData(contentId)
  const [open, setOpen] = React.useState(false);

  const addReaction = (name: string)=> {
    _addReaction(name);
    setOpen(false)
  }

  return <>
  <div className={cn('flex items-center gap-2 flex-wrap', className)} {...rest}>
    {
      Object.entries(reactions).map(([name, count]) => <MemorizedReaction key={name} count={count} onAdd={async ()=>addReaction(name)}>{reactionDict[name]}</MemorizedReaction>)
    }
    <Popover open={open} onOpenChange={(s)=>setOpen(s)}>
      <PopoverTrigger><SmilePlus className={'w-6 h-6 '} /></PopoverTrigger>
      <PopoverContent className={'max-w-48 overflow-hidden'} >
        <ul className={'grid gap-2 grid-cols-4'}>
          {
            allReactions.map(({name, node}) => <li
              key={name}
              onClick={()=> addReaction(name)}
              className={'p-1 cursor-pointer border-dashed border-border rounded-xl hover:border-primary'}
            >{node}</li>)
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
  onAdd: ()=> Promise<any>
  count: number
} & HTMLProps<HTMLSpanElement>) {
  // const [optimisticCount, addOptimistic] = useOptimistic(count, (state) => state + 1);

  // const [isPending, startTransition] = useTransition()
  function onClick () {
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
