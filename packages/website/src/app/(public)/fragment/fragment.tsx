'use client'
import React, {HTMLProps, Suspense, lazy, useMemo} from "react";
import {cn} from "@/lib/utils";
import {Markdown} from "@/components/markdown";
import {ReactionWithProps} from "@/app/_post-layout/reaction.client";
import {getReactionEntries, useReactions} from "./use-reaction";
import {MessageCircleMore} from "lucide-react";
import CommentDialog from "@/app/_post-layout/comment/comment-dialog";

type  FragmentProps = {
  id: string,
  content: string,
  createdAt: number,
  lastModifiedAt: number,
  reactions: Record<string, number> | null | undefined
}

export const FragmentItem = (
{
  id,
  content,
  createdAt,
  lastModifiedAt,
  reactions,
    ...rest
}: FragmentProps & HTMLProps<HTMLDivElement>
) => {
  const reactionArr = useMemo(()=> {
    return getReactionEntries(reactions)
  },[reactions])
  const {addReaction} = useReactions(id)
  const _addReaction = (name: string) => {
    addReaction?.(name)
  }


  return <div {...rest} className={cn('p-3', rest.className)}>
      <div className={'text-md font-mono'}>
        <Markdown content={content}/>
      </div>
    <div className={'text-sm pt-3 flex items-center flex-wrap'}>
      <ReactionWithProps reactions={reactionArr} addReaction={_addReaction} afterChildren={
        <CommentDialog documentId={id}>
          <div className={'w-8 h-8 p-1 bg-white/80 dark:bg-transparent rounded-full flex items-center justify-center  '}>
            <MessageCircleMore className={'w-4 h-4 '}/>
          </div>
        </CommentDialog>
      }/>
    </div>
  </div>
}