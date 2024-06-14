'use client'
import {useComments} from "@/hooks/useComments";
import CommentDialog from "@/components/comment/CommentDialog";
import {MessageCircleMore, ThumbsDown, ThumbsUp} from "lucide-react";

export default function Reaction({id}: {id: string}) {
  const { reactions, addReaction } = useComments()
  return (
    <div className={'mt-auto flex flex-col w-fit'}>
      <CommentDialog documentId={id}>
        <MessageCircleMore className={'w-6 h-6 m-2 opacity-70 hover:opacity-100'}/>
      </CommentDialog>
      {
        <div className={'flex flex-col items-center'}>
          <ThumbsUp className={'w-6 h-6 m-2 opacity-70 hover:opacity-100'} onClick={()=>addReaction('like')}/>
          <span>{reactions['like'] ?? 0}</span>
        </div>
      }
      {
        <div className={'flex flex-col items-center'}>
          <ThumbsDown className={'w-6 h-6 m-2 opacity-70 hover:opacity-100'} onClick={()=>addReaction('dislike')}/>
          <span>{reactions['dislike'] ?? 0}</span>
        </div>
      }
    </div>
  )
}