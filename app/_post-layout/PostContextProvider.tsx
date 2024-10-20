'use client'
import {ReactNode} from "react";
import { PostContext } from "./use-post";

export function PostContextProvider({contentId, children }: {contentId:string, children: ReactNode }) {
  return (

    <PostContext.Provider value={{contentId: contentId, loading: true}}>
      {children}
    </PostContext.Provider>
  )
}