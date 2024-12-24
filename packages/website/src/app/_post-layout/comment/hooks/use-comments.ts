import {create} from "zustand";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useUser} from "@clerk/nextjs";
import { CommentVO } from "@/interfaces";
import {api} from "@/lib/api";
import {useClientCommentID} from "./use-client-comment-id";
import {useToast} from "@/hooks/use-toast";

type ServerSideComment = CommentVO
type ClientSideComment = {
  documentId: string,
  authorId: string,
  body: any,
  userInfo: any,
  version: 1,
  parentId: string | undefined,
  createdAt: number
}

type ServerComment = {
  id: string
  status: 'server'
  comment: ServerSideComment
}

type ClientComment = {
  id: string
  status: 'sending' | 'failed' | 'success'
  comment: ClientSideComment
}

export type Comment = ServerComment | ClientComment


type CommentStore = {
  comments: Record<string, Comment[]>
  commentsUpdateAt: Record<string, number>
  sentClientCommentIdToServerIdMap: Record<string, string>
  // client-data
  sendingOrFailedComments: Record<string, Comment[]>
}

type CommentAction = {
  // pagination?
  syncQueryData:(documentId: string, comments: CommentVO[], dataUpdatedAt: number) => void
  successSend: (sendingComment: Comment, serverComment: Comment) => void
  failSend: (sendingComment: Comment) => void
  sendDraftComment: (documentId: string, draft: ClientComment) => void
}

export const useCommentStore = create<CommentStore &CommentAction>((set,get) => ({

  comments: {},
  sendingOrFailedComments: {},
  sentClientCommentIdToServerIdMap: {},
  commentsUpdateAt: {},
  sendDraftComment: (documentId, draft: ClientComment) => {
    const parentId = draft.comment.parentId
    const _comment = {
      id: draft.id,
      comment: {
        documentId: documentId,
        authorId: draft.comment.authorId,
        body: draft.comment.body,
        userInfo: draft.comment.userInfo,
        parentId: parentId,
        version: draft.comment.version,
        createdAt: draft.comment.createdAt,
      },
      status: 'sending' as const,
    }
    const prev = get()
    const prevComments = prev.sendingOrFailedComments[documentId] || []
    set({
      ...prev,
      sendingOrFailedComments: {
        ...prev.sendingOrFailedComments,
        [documentId]: [...prevComments, _comment]
      }
    })
  },
  // 暂时不考虑分页
  syncQueryData: (documentId: string, comments: CommentVO[], dataUpdatedAt) => {
    const _comments = comments.map(c => ({
      id: c.id,
      status: 'server' as const,
      comment: c
    }))
    const prev = get()
    set({
      ...prev,
      commentsUpdateAt: {
        ...prev.commentsUpdateAt,
        [documentId]: dataUpdatedAt
      },
      comments: {
        ...prev.comments,
        [documentId]: _comments
      }
    })
  },
  successSend: (sendingComment, serverComment) => {
    const documentId = sendingComment.comment.documentId
    const prev = get()
    const result = prev.sendingOrFailedComments[documentId].filter(c => c.id !== sendingComment.id)
    set({
      ...prev,
      sentClientCommentIdToServerIdMap: {
        ...prev.sentClientCommentIdToServerIdMap,
        [serverComment.id]: sendingComment.id,
      },
      comments: {
       ...prev.comments,
        [documentId]: [serverComment, ...prev.comments[documentId]]
      },
      sendingOrFailedComments: {
        ...prev.sendingOrFailedComments,
        [documentId]: [...result]
      }
    })
  },
  failSend: (sendingComment) => {
    const documentId = sendingComment.comment.documentId
    const prev = get()
    const result = prev.sendingOrFailedComments[documentId].find(c => c.id === sendingComment.id)
    if (result) {
      result.status = 'failed'
    }
    set({
      ...prev,
      sendingOrFailedComments: {
        ...prev.sendingOrFailedComments,
        [documentId]: [...prev.sendingOrFailedComments[documentId]]
      }
    })
  }
}))



export const useComments = (contentId: string) => {
  const queryClient = useQueryClient()
  const commentUpdateAt = useCommentStore(state => state.commentsUpdateAt[contentId])
  const syncQueryData = useCommentStore(state => state.syncQueryData)
  const commentSuccessSendHook = useCommentStore(state => state.successSend)
  const commentFailedSendHook = useCommentStore(state => state.failSend)
  const  { status, data:comments, error,isLoading, dataUpdatedAt } = useQuery({
    queryKey: ['comments', contentId],
    queryFn: async () => api.getComments(contentId).then(res=>res.data),
  })
  if(comments && (!commentUpdateAt || commentUpdateAt != dataUpdatedAt)) {
    syncQueryData(contentId, comments ?? [], dataUpdatedAt)
  }

  const {mutate:addComment, mutateAsync: addCommentAsync} = useMutation({
    mutationFn: async (comment: ClientComment)=> {
      return api.addComment(contentId, comment.comment.body.text, comment.comment.parentId)
    },
    onSuccess: (data, variables) => {
      const serverComment = { id: data.id, status: 'server' as const, comment: data }
      commentSuccessSendHook(variables, serverComment)
    },
    onError: (error,variables) => {
      commentFailedSendHook(variables)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments', contentId] })
    }
  })

  return {
    isLoadingMore:isLoading,
    addComment,
    addCommentAsync,
    comments
  }
}



export const useComment = (id: string) => {
  const { isLoadingMore:isLoading, addComment } = useComments(id)
  const sendDraftComment = useCommentStore(state => state.sendDraftComment)
  const _comments = useCommentStore(state => state.comments)
  const sendingComments = useCommentStore(state => state.sendingOrFailedComments)
  const comments = [...(_comments[id] ?? []), ...(sendingComments[id] ?? [])]
  comments.sort((a,b) => b.comment.createdAt - a.comment.createdAt)

  const {draftId, renewDraftId} = useClientCommentID()

  const sentClientCommentIdToServerIdMap = useCommentStore(state => state.sentClientCommentIdToServerIdMap)
  const { isSignedIn, user, isLoaded } = useUser();
  const {toast} = useToast()
  const sendComment = ({
    commentContent,
    parentId
   }:{
      commentContent: string,
      parentId?: string
    }) => {

    if(!isSignedIn) {
      toast({
        title: "please login first",
        description: "need login to comment"
      })
      return
    }

    const draft = {
      id: draftId,
      status: 'sending' as const,
      comment: {
        documentId: id,
        authorId: user?.id ?? '',
        body: {
          text: commentContent
        },
        userInfo: {
          name: user?.fullName,
          imageUrl: user?.imageUrl
        },
        version: 1 as const,
        parentId: parentId,
        createdAt: Math.floor(Date.now()/1000),
      }
    }
    sendDraftComment(id, draft)
    renewDraftId()
    addComment(draft)
  }
  const getClientIdByServerId = (serverId:string) => {
    return sentClientCommentIdToServerIdMap[serverId] ?? serverId
  }
  return {
    comments,
    sendComment,
    getClientIdByServerId,
    isLoading,
  }
}



// use-comment-editor

type CommentEditorStore = {
  editingComment: string
  // draftComment: Record<string, ClientComment>
} & {
  updateDraftComment: (documentId:string, comment:ClientComment) => void
  setEditingComment: (comment: string) => void
  getEditingComment: () => string
}

const useCommentEditorStore = create<CommentEditorStore>((set,get) => ({
  editingComment: "",
  setEditingComment: ( comment: string) => {
    set({editingComment: comment})
  },
  getEditingComment: () => get().editingComment,
  updateDraftComment: (documentId:string, comment:ClientComment) => {
  },
}))


export const useCommentEditor = (id: string) => {
  const editingComment = useCommentEditorStore(state => state.editingComment)
  const getEditingComment = useCommentEditorStore(state => state.getEditingComment)
  const setEditingComment = useCommentEditorStore(state => state.setEditingComment)
  return {
    editingComment,
    getEditingComment,
    setEditingComment,
  }
}