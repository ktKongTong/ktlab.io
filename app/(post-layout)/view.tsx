'use client'
import {useCurrentPosts } from "@/app/(post-layout)/use-post";

export function View() {
  const { contentId } = useCurrentPosts()
  return <>{contentId}</>
}