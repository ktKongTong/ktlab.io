'use client'
import {useFragments} from "@/app/(public)/fragment/use-fragments";
import {FragmentItem} from "@/app/(public)/fragment/fragment";
import {cn, formatRelativeTime} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React, {useEffect, useRef} from "react";

import { useInView } from 'react-intersection-observer';
export const FragmentList = () => {

  const { ref, inView } = useInView();
  const {fragments, hasNextPage, fetchNextPage, isFetchingNextPage } = useFragments()


  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return <>
    <h2 className={'text-3xl font-semibold font-sans'}>Timeline</h2>
    <ul className={'gap-2 relative'}>
      {
        fragments.map(it => (
          <li key={it.id} className={
            cn(
              'm-4',
              'after:bg-background  after:h-2 after:w-2 after:-left-4 after:top-0 relative after:absolute after:rounded-full after:content-[\'\'] after:-translate-y-1/2',
              'before:bg-zinc-200 before:w-0.5 before:h-full before:rounded-t before:absolute before:-left-[13px] before:content-[\'\']',
            )

          }>

            <div className={'font-mono flex items-end gap-1'}>
              <div>
                <Avatar className={'w-10 h-10 shadow rounded-full mx-2 drop-shadow-md select-none '}>
                  <AvatarImage src={'/avatar.jpg'}/>
                  <AvatarFallback>{'KT'}</AvatarFallback>
                </Avatar>

              </div>
              <div className={'flex flex-col'}>
                <span className={'text-sm'}>KT</span>
                <span className={'text-muted-foreground text-xs'}>{formatRelativeTime(it.createdAt)}</span>
              </div>
            </div>
            <FragmentItem
              id={it.id}
              reactions={it.reactions}
              className={'rounded-md'}
              content={it.content} createdAt={it.createdAt} lastModifiedAt={it.lastModifiedAt}/>
          </li>
        ))
      }
    </ul>

    <div ref={ref}>
      {isFetchingNextPage && 'Loading...'}
    </div>
  </>
}