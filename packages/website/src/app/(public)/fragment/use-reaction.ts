import {InfiniteData, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {api} from "@/lib/api";
import {AvailableReactionType, defaultReaction} from "@/config/reaction";
import {ContentReaction, ContentVO, Paging} from "@repo/shared";

export const useReactions = (id: string) => {
  const queryClient = useQueryClient()
    const {mutate:addReaction, mutateAsync: addReactionAsync} = useMutation({
      mutationFn: async (type:AvailableReactionType)=> api.patchReaction(id, type),
      onMutate: async (type)=> {
        queryClient.setQueryData<InfiniteData<Paging<ContentVO>>>(['fragments'], (data) => {
          const d= data?.pages.map(it => it.data.find(it => it.id === id))
          const da = d?.find(it => it)
          if(da) {
            da.reactions = {
              ...da?.reactions,
              [type]: (da?.reactions?.[type] ?? 0) + 1
            }
          }

          return data
        })
      },
      onSettled: async () => {
      },
    })

    return {
      addReaction,
    }
}


export const getReactionEntries = (reactions: Record<string, number> | null|undefined) => {
  let _reactions = reactions ?? {}
  Object.entries(defaultReaction).forEach(([key, value]) => {
    if(!_reactions[key]) {
      _reactions[key] = value
    }
  })
  const reactionEntries = Object.entries(_reactions)
    .toSorted((a, b) => a[0].localeCompare(b[0]))
  return reactionEntries
}