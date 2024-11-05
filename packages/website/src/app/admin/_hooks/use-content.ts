import {useQuery} from "@tanstack/react-query";

export const useContent = (initialContent:any[]) => {
  const  { status, data, error } = useQuery<any[]>({
    queryKey: ['content', 'admin'],
    queryFn: async () => {
      return []
    },
    initialData: initialContent,
  })
  return data;
}