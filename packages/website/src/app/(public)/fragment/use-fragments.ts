import { api } from "@/lib/api";
import {useInfiniteQuery} from "@tanstack/react-query";

export const useFragments = () => {

  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey: ['fragments'],
    queryFn: ({ pageParam = 1 }) => {
      const page = pageParam as number | undefined
      return api.getFragmentContent(page ?? 1)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if(lastPage.total > lastPage.page) return lastPage.page + 1
      return undefined
    },
    getPreviousPageParam: (firstPage, allPages) => {

      if(firstPage.page > 1) return firstPage.page - 1
      return undefined
    },
  })
  const data = result.data?.pages.flatMap(it => it.data) ?? []

  return {
    fragments: data,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasPreviousPage,
    hasNextPage
  }
}