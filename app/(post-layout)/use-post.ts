import { createContext, useContext } from "react";

interface PostContext {
  contentId: string;
}

export const PostContext = createContext<PostContext>({contentId: ''})

export const useCurrentPosts = () => {
  return useContext(PostContext);
}