'use client'
import {useCurrentPosts } from "@/app/_post-layout/use-post";
import {Skeleton} from "@/components/ui/skeleton";

export function View() {
  const { contentId,loading } = useCurrentPosts()
  if (loading) {
    return <Skeleton className={''}/>
  }
  return <span>{contentId}</span>
}