'use client'
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {PropsWithChildren} from "react";
import {toast} from "@/hooks/use-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchInterval: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      toast({
        title: 'Something went error',
        description: error.message,
        variant: 'destructive'
      })
    },
  }),
})
export const ReactQueryProvider = ({ children }: PropsWithChildren) => {

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}