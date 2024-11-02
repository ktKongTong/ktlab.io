import {HTMLProps} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn, relativeTime} from "@/lib/utils";
import {RawMarkdownRender} from "@/components/markdown/xlog/render";
import {CommentVO} from "@/interfaces/vo";

export type CommentProps = CommentVO & {
  sending?: boolean;
}

export function CommentItem (
  {
    id,
    version,
    body,
    documentId,
    state,
    authorId,
    userInfo,
    className,
    createdAt,
    parentId,
    ...rest
  }:CommentProps & HTMLProps<HTMLDivElement>) {
  return (
    <div className={'flex'}>
      <Avatar className={'w-8 h-8 rounded-full mx-2 drop-shadow-md translate-y-2'}>
        <AvatarImage src={userInfo.imageUrl}/>
        <AvatarFallback >{userInfo.name}</AvatarFallback>
      </Avatar>
      <div className={'text-sm font-medium'}>
        {parentId && <div></div>}
        <div className={'space-x-2 flex items-center justify-start mb-1  text-xs'}>
          <span>{userInfo.name}</span>
          <span>{relativeTime(createdAt)}</span>
        </div>

        <div className={cn('relative px-2 py-0.5 rounded-lg bg-secondary text-secondary-foreground w-fit', className)} {...rest}>
          {
            version > 1 && <div className={'absolute'}>
                  已编辑
              </div>
          }
          <RawMarkdownRender content={body.text}/>
        </div>
      </div>

    </div>

  )
}