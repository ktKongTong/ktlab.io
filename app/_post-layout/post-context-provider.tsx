'use client'
import {ReactNode} from "react";
import { PostContext } from "./use-post";
import {useReportViewEvent} from "@/hooks/query/use-interaction-data";

export function PostContextProvider({contentId, children }: {contentId:string, children: ReactNode }) {
  useReportViewEvent(contentId)
  return (
    <PostContext.Provider value={{ contentId: contentId }}>
      {children}
    </PostContext.Provider>
  )
}