import Link from "@/components/link";
import {HTMLProps} from "react";

export type BlogActivityProps = {
  eventType: 'like' | 'comment' | 'publish' | 'update' | 'dislike'
  articleName: string,
  articleId: string,
  likeCnt?: number,
  timestamp?: number,
  commentId?: string,
  commentContent?: string,
  author?: string,
  authorAvatar?: string,
} & HTMLProps<HTMLDivElement>
export default function BlogActivity(props: BlogActivityProps) {
  switch (props.eventType) {
    case 'like':
      return (
        <div> 有{ props.likeCnt ? ` ${props.likeCnt} ` : '' }人点赞了 <Link href={props.articleId} className={'text-md font-bold'}>{props.articleName}</Link></div>
      )
    case 'comment':
      return (
        <div>
          <div>{props.likeCnt ?? 1}在 「<Link href={props.articleId} className={'text-md font-bold'}>{props.articleName}</Link>」评论：</div>
          <div className={'p-2 text-sm bg-zinc-300/70 rounded-lg'}>
            {props.commentContent}
          </div>
        </div>
      )
  }
  return (
    <div>

    </div>
  )
}
