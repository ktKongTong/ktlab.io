import {create} from "zustand";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {useUser} from "@clerk/nextjs";

type Comments = {
  documentId?: string,
  comments: any[],
  reactions: Record<string, number>
}

type Action = {
  updateDocumentId: (documentId?: string) => void
  updateComments: (comments?: any[]) => void
  updateReactions: (reactions: Record<string, number>) => void
}

const useCommentStore = create<Comments & Action>((set) => ({
  documentId: undefined,
  comments: [],
  reactions: {},
  updateDocumentId: (id) => set((state) => ({ ...state, documentId: id })),
  updateComments: (comments) => set((state)=>({ ...state,comments: comments })),
  addComment: (comment: Comment) => set((state) => ({ comments: [...state.comments,comment] })),
  updateReactions:(reactions) => set((state)=>({ ...state,reactions: reactions })),
}));

export const useComments = (contentId: string) => {
  const queryClient = useQueryClient()
  const documentId= useCommentStore(state => state.documentId)
  const updateDocumentId = useCommentStore(state => state.updateDocumentId)
  if(documentId != contentId){
    updateDocumentId(contentId)
  }
  const updateComments = useCommentStore(state => state.updateComments)
  const comments = useCommentStore(state => state.comments)
  const reactions = useCommentStore(state => state.reactions)
  const updateReactions = useCommentStore(state => state.updateReactions)
  // Queries
  const  { status, data, error } = useQuery({
    queryKey: ['comments', contentId],
    queryFn: async () => {
      const res = await fetch(`/api/document/${contentId}/comment`);
      return await res.json();
    }
  })

  useEffect(()=> {
    if(data) {
      updateComments(data.data)
    }
  },[updateComments,data])
  const { isSignedIn, user, isLoaded } = useUser();
  const {mutate:addComment, mutateAsync: addCommentAsync} = useMutation({
    mutationFn: async ({comment, parentId}:{comment: string, parentId?:string})=> {
      if(!isSignedIn) {
        throw Error("you are not sign in");
      }
      return fetch(`/api/document/${documentId}/comment`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: documentId,
          body: {
            text: comment,
          },
          parentId: parentId,
        }),
      }).then(res=>res.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', documentId] })
    },
  })

  const {mutate:addReaction, mutateAsync: addReactionAsync} = useMutation({
    mutationFn: async (type:string)=> {
      // let reaction = reactions
      // if(reaction[type]) {
      //   reaction[type] = reaction[type] + 1;
      // }else {
      //   reaction[type] = 1
      // }
      // updateReactions({ ...reaction })
      return fetch(`/api/document/${documentId}/reactions?type=${type}`, {
        method: 'PATCH'
      }).then(res=>res.json())
    },
    onMutate: async (type)=> {
      await queryClient.cancelQueries({ queryKey: ['content-meta', contentId] })
      // const previousData = queryClient.getQueryData(['content-meta', contentId])
      // queryClient.setQueryData(['content-meta', contentId], (old:any) => ({...old, data: {...old.data, reactions: {...reactions, [type]: (reactions[type]??0) + 1}}}))
      // return { previousData }
    },
    onError: (err, type, context) => {
      // queryClient.setQueryData(['interaction-data', contentId], context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['content-meta', contentId] })
    },
  })

  return {
    isLoadingMore:status === 'pending',
    addComment,
    addCommentAsync,
    addReaction,
    addReactionAsync,
    reactions,
    comments,
    updateDocumentId
  }
}