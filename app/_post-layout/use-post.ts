import { createContext, useContext } from "react";

interface PostContext {
  contentId: string;
  loading: boolean;
}

export const PostContext = createContext<PostContext>({contentId: '', loading: false});

export const useCurrentPosts = () => {
  return useContext(PostContext);
}