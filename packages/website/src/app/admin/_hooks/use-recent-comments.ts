import {useQuery} from "@tanstack/react-query";
import {CommentWithDocumentVO} from "@/interfaces";

export const useRecentComments = (initialComments:CommentWithDocumentVO[]) => {
  const  { status, data, error } = useQuery<CommentWithDocumentVO[]>({
    queryKey: ['command', 'admin'],
    queryFn: async () => {
      // const res = await fetch(`/api/comments/recent`);
      return []
    },
    initialData: initialComments,
  })
  return data;
}