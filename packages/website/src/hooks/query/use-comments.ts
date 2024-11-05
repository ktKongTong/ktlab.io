import {create} from "zustand";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useUser} from "@clerk/nextjs";
import { CommentVO } from "@/interfaces";

// type CommentItem = CommentVO & {
//   sending?: boolean
// }

// interface Comments {
//   contentId: string,
//   comments: CommentItem[],
// // paging
// }
// id to comments
// type CommentStore = Record<string, Comments>
//
// type Action = {
//   updateDocumentId: (documentId?: string) => void
//   updateComments: (comments?: any[]) => void
//   updateReactions: (reactions: Record<string, number>) => void
// }
//
// const useCommentStore = create<Comments & Action>((set) => ({
//   comments: [] as CommentItem[],
//   contentId: '',
//   updateDocumentId: (id) => set((state) => ({ ...state, documentId: id })),
//   updateComments: (comments) => set((state)=>({ ...state,comments: comments })),
//   updateReactions:(reactions) => set((state)=>({ ...state,reactions: reactions })),
//   addComment: (comment: CommentVO) => set((state) => ({ comments: [...state.comments, comment], contentId: state.contentId })),
// }));

export const useComments = (contentId: string) => {
  const queryClient = useQueryClient()
  const  { status, data:comments, error,isLoading } = useQuery<CommentVO[]>({
    queryKey: ['comments', contentId],
    queryFn: async () => {
      const res = await fetch(`/api/document/${contentId}/comment`);
      return (await res.json()).data;
    }
  })
  const { isSignedIn, user, isLoaded } = useUser();
  const {mutate:addComment, mutateAsync: addCommentAsync} = useMutation({
    mutationFn: async ({comment, parentId}:{comment: string, parentId?:string})=> {
      if(!isSignedIn) {
        throw Error("you are not sign in");
      }
      return fetch(`/api/document/${contentId}/comment`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: contentId,
          body: {
            text: comment,
          },
          parentId: parentId,
        }),
      }).then(res=>res.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', contentId] })
    },
  })

  return {
    isLoadingMore:isLoading,
    addComment,
    addCommentAsync,
    comments
  }
}