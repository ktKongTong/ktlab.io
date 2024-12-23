'use client'
import CommentDialog from "./comment-dialog";
import {MessageCircleMore, ThumbsDown, ThumbsUp} from "lucide-react";
import {useCurrentPostId, usePostId} from "@/app/_post-layout/use-post";
import {useContentInteractionData} from "@/hooks/query/use-interaction-data";
import {useEffect} from "react";

export default function Reaction({id}: {id: string}) {
  const { contentId } = useCurrentPostId()
  const {  addReaction } = useContentInteractionData(contentId)

  return (
    <div className={'mt-auto flex flex-col w-fit'}>
      <CommentDialog documentId={id}>
        <MessageCircleMore className={'w-6 h-6 m-2 opacity-70 hover:opacity-100'}/>
      </CommentDialog>
      {
        <div className={'flex flex-col items-center'}>
          <ThumbsUp className={'w-6 h-6 m-2 opacity-70 hover:opacity-100'} onClick={()=>addReaction('like')}/>
          {/*<span>{reactions['like'] ?? 0}</span>*/}
        </div>
      }
      {
        <div className={'flex flex-col items-center'}>
          <ThumbsDown className={'w-6 h-6 m-2 opacity-70 hover:opacity-100'} onClick={()=>addReaction('dislike')}/>
          {/*<span>{reactions['dislike'] ?? 0}</span>*/}
        </div>
      }
    </div>
  )
}