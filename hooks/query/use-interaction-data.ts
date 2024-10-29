import {useQuery} from "@tanstack/react-query";
import {defaultReaction} from "@/config/reaction";
import {useEffect} from "react";

export const useContentInteractionData = (id: string)=> {
  const  { status, data, error, isLoading } = useQuery({
    queryKey: ['content-meta', id],
    queryFn: async () => {
      const res = await fetch(`/api/document/${id}/interaction-data`);
      return await res.json();
    }
  })
  let reactions = defaultReaction.map(it => ({name: it, count: 0}))
  if(data && data?.data?.reactions) {
    const storedReactions: Record<string, number> = data?.data?.reactions
    reactions = Object.keys(storedReactions).map(it => ({name: it, count: storedReactions[it]}))
    defaultReaction.forEach(it => {
      if(!(it in storedReactions)) {
        reactions.push({ name: it, count: 0 });
      }
    })
  }
  return {
    isLoading,
    view: data?.data?.view ?? 0,
    click: data?.data?.view ?? 0,
    lastVisitor: data?.data?.lastVisitor ?? 'Unknown',
    reactions: reactions
  }
}


export const useReportViewEvent = (id: string)=> {
  useEffect(() => {
    fetch(`/api/document/${id}/interaction/report`)
  }, [id]);

}