import {useQuery} from "@tanstack/react-query";

export const useContent = (initialContent:any[]) => {
  const  { status, data, error } = useQuery<any[]>({
    queryKey: ['comments', 'admin'],
    queryFn: async () => {
      return []
    },
    initialData: initialContent,
  })
  return data;
}