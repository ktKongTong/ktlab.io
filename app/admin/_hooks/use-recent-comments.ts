import {useQuery} from "@tanstack/react-query";
import {CommentWithContentInfoDtoSchema, CommentWithDocumentDto} from "@/interfaces/dbo";

export const useRecentComments = (initialComments:CommentWithDocumentDto[]) => {
  const  { status, data, error } = useQuery<CommentWithDocumentDto[]>({
    queryKey: ['content', 'admin'],
    queryFn: async () => {
      // const res = await fetch(`/api/comments/recent`);
      return []
    },
    initialData: initialComments,
  })
  return data;
}