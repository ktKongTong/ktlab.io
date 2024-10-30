import {create} from "zustand";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {useUser} from "@clerk/nextjs";

type Comments = {
  documentId?: string,
  comments: any[],
  reactions: Record<string, number>
}

interface Comment {
  contentId: string,
  comments: any[],
// paging
}
// id to comments
// type CommentStore = Record<string, Comments>

type Action = {
  updateDocumentId: (documentId?: string) => void
  updateComments: (comments?: any[]) => void
  updateReactions: (reactions: Record<string, number>) => void
}

const useCommentStore = create<Comments & Action>((set) => ({
  comments: [],
  documentId: undefined,
  reactions: {},
  updateDocumentId: (id) => set((state) => ({ ...state, documentId: id })),
  updateComments: (comments) => set((state)=>({ ...state,comments: comments })),
  addComment: (comment: Comment) => set((state) => ({ comments: [...state.comments,comment] })),
  updateReactions:(reactions) => set((state)=>({ ...state,reactions: reactions })),
}));

export const useComments = (contentId: string) => {
  const queryClient = useQueryClient()
  // const documentId= useCommentStore(state => state.documentId)
  // const updateDocumentId = useCommentStore(state => state.updateDocumentId)
  // if(documentId != contentId){
  //   updateDocumentId(contentId)
  // }
  const updateComments = useCommentStore(state => state.updateComments)

  const comments = useCommentStore(state => state.comments)

  const  { status, data, error } = useQuery({
    queryKey: ['comments', contentId],
    queryFn: async () => {
      const res = await fetch(`/api/document/${contentId}/comment`);
      return await res.json();
    },
  })
  useEffect(()=> {
    if(data) { updateComments(data.data) }
  },[updateComments,data])
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
    isLoadingMore:status === 'pending',
    addComment,
    addCommentAsync,
    comments
  }
}