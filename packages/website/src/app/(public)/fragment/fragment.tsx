'use client'
import React, {HTMLProps, Suspense, lazy, useMemo} from "react";
import {cn} from "@/lib/utils";
import {Markdown} from "@/components/markdown";
import {defaultReaction} from "@/config/reaction";
import {ReactionWithProps} from "@/app/_post-layout/reaction.client";

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
    return  Object.entries(reactions ?? defaultReaction).map(it => it)
  },[reactions])

  return <div {...rest} className={cn('p-3', rest.className)}>
      <div className={'text-md font-mono'}>
        <Markdown content={content}/>
      </div>
    <div className={'text-sm pt-3'}>
      <ReactionWithProps reactions={reactionArr} addReaction={() => {}}/>
    </div>
  </div>
}