'use client'
import {ClientOnly} from "@/components/client-only";
import CommentEditor from "@/components/comment/comment-editor";
import Comments from "@/components/comment/comments";
import {HTMLProps, useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface PostFooterProps {
  documentId: string
}
export default function Footer({
  documentId,
  ...rest
}:PostFooterProps & HTMLProps<HTMLDivElement>) {

  const [open, setOpen] = useState(false);

  return (
    <>
      {
          <div {...rest} className={cn('flex flex-col items-center justify-center', rest.className)}>
            <div className={'w-full grow flex flex-col items-end'}>
              <Button variant={'ghost'} onClick={() => setOpen(s=>!s)} className={'ml-auto mr-2 self-end items-end'}>
                create a comment
              </Button>
              <div className={cn('hidden lg:block w-full grow', open ? 'lg:block' : 'lg:hidden')}>
                <CommentEditor documentId={documentId}/>
              </div>
            </div>
            <Label className={' text-lg items-start self-start'}>Comments</Label>
            <Comments documentId={documentId} className={'w-full grow self-start py-2'}/>
          </div>
      }
    </>
  )
}