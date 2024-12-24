import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AvailableReactionType, defaultReaction} from "@/config/reaction";
import {useEffect} from "react";
import {api} from "@/lib/api";
import {ContentReaction} from "@repo/shared/vo";
import {getReactionEntries} from "@/app/(public)/fragment/use-reaction";

const initialData = { view: 0, lastVisitor: 'Unknown', reactions: defaultReaction }

export const useContentInteractionData = (_id?: string)=> {
  const queryClient = useQueryClient()
  const id = _id!
  const  { status, data, error, isLoading } = useQuery({
    queryKey: ['content-meta', id],
    queryFn: () => api.getReaction(id!),
    enabled: id !== undefined
  })
  // reaction

  const {mutate:addReaction, mutateAsync: addReactionAsync} = useMutation({
    mutationFn: async (type:AvailableReactionType)=> api.patchReaction(id, type),
    onMutate: async (type)=> {
      await queryClient.cancelQueries({ queryKey: ['content-meta', id] })
      const previousReactions = queryClient.getQueryData<ContentReaction>(['content-meta', id])
      queryClient.setQueryData(['content-meta', id], (data: ContentReaction)=>({
        ...data,
        reactions: {
          ...data.reactions,
          [type]: (data.reactions[type] ?? 0) + 1
        }
      }))
      return { previousReactions }
    },
    onError: (err, newReactions, context) => {
      queryClient.setQueryData(['content-meta', id], context?.previousReactions)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['content-meta', id] })
    },
  })

  const reactionEntries = getReactionEntries(data?.reactions)
  return {
    isLoading,
    view: data?.view ?? 0,
    click: data?.view ?? 0,
    lastVisitor: data?.lastVisitor ?? 'Unknown',
    reactions: reactionEntries,
    addReactionAsync,
    addReaction,
  }
}


export const useReportViewEvent = (id: string)=> {
  useEffect(() => { fetch(`/api/document/${id}/interaction/report`) }, [id]);

}