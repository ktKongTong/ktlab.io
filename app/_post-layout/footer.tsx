'use client'
import CommentEditor from "./comment/comment-editor";
import Comments from "./comment/comments";
import {HTMLProps, useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import { Label } from "@/components/ui/label";
import Reactions from "@/app/_post-layout/reactions";

interface PostFooterProps {
  documentId: string
}
export default function Footer({
  documentId,
  ...rest
}:PostFooterProps & HTMLProps<HTMLDivElement>) {
  return (
    <>
      {
        <div {...rest} className={cn('flex flex-col items-center justify-center', rest.className)}>
          <div className={'flex w-full items-center justify-between flex-col gap-2 md:gap-0 md:flex-row'}>
            <Label className={'text-lg items-start self-start'}>Comments</Label>
            <Reactions contentId={documentId} className={''}/>
          </div>

          <div className={'w-full grow flex flex-col items-end'}>
            <div className={cn(' w-full grow')}>
              <CommentEditor documentId={documentId}/>
            </div>
          </div>
          <Comments contentId={documentId} className={'w-full grow self-start py-2'}/>
        </div>
      }
    </>
  )
}