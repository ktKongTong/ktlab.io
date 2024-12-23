import {HTMLProps} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn, formatRelativeTime, relativeTime} from "@/lib/utils";
import {Markdown} from "@/components/markdown";
import {Comment} from "./hooks/use-comments";
import { LoaderCircle } from "lucide-react";

export type CommentProps = Comment

export function CommentItem (
{
  id,
  comment,
  status,
  className,
  ...rest
}:CommentProps

    & HTMLProps<HTMLDivElement>) {
  return (
    <div className={'flex select-none'}>

      <div className={'text-sm font-medium'}>
        {comment.parentId && <div></div>}
        <div className={'flex items-center gap-1'}>
          <Avatar className={'w-8 h-8 rounded-full mx-1 drop-shadow-md translate-y-0'}>
            <AvatarImage src={comment.userInfo?.imageUrl}/>
            <AvatarFallback>{comment.userInfo?.name?.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className={'gap-- text-center flex flex-col items-start justify-center mb-1  '}>
            <span>{comment.userInfo?.name}</span>
            <time dateTime={comment.createdAt.toString()}
                  className={'text-xs mt-auto text-muted-foreground'}>{formatRelativeTime(comment.createdAt)}</time>
          </div>
        </div>
        <div
          className={cn('relative px-4 py-2 rounded-lg  bg-secondary text-secondary-foreground w-fit', className)} {...rest}>
          {
            // @ts-ignore
            (comment?.version ?? 1) > 1 && <div className={'absolute'}>
                  已编辑
              </div>
          }
          <Markdown content={comment.body.text}/>
          <div className={'inline-flex absolute -right-4 bottom-0'}>
            {status === 'sending' && <LoaderCircle className={'w-3 h-3 animate-spin'} />}
          </div>
        </div>
      </div>

    </div>

  )
}