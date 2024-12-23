'use client'
import {createContext, useContext, useEffect} from "react";
import {create} from "zustand";

interface PostContext {
  contentId?: string;
}

export const PostContext = createContext<PostContext>({});

export const useCurrentPostId = () => {
  return useContext(PostContext);
}




type PostStore = {
  id: string | undefined
  setId: (id: string | undefined) => void
}
export const usePostStore = create<PostStore>((set, get) => ({
  id: undefined,
  setId: (id) => {
    set((state) => ({id}))
  }
}))

export const usePostId = () => {
  const id = usePostStore(state => state.id)
  const setId = usePostStore(state => state.setId)
  const resetId = () => {
    setId(undefined)
  }
  const isPostPage = !!id
  return {
    id,
    setId,
    resetId,
    isPostPage,
  }
}

export const NotPostPage = () => {
  const {resetId}= usePostId()
  useEffect(() => {
    resetId()
  }, [])
  return null
}