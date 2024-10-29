import { createContext, useContext } from "react";

interface PostContext {
  contentId: string;
}

export const PostContext = createContext<PostContext>({contentId: ''});

export const useCurrentPostId = () => {
  return useContext(PostContext);
}
