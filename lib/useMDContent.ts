import matter from 'gray-matter';
import {exampleMarkdown} from "@/mock/content";
interface MDContent {
  title: string;
  date: number;
  viewCount: number;
  tags: string[];
  reactionCount: number;
  content: string;
  loaded: boolean;
}

export const useMDContent =  async (id: string):Promise<MDContent> => {
  const data = matter(exampleMarkdown)

  return {
    title: data.data?.title??"",
    date: 1,
    viewCount: 1,
    tags: data.data.tags ?? [],
    reactionCount: 0,
    content: exampleMarkdown,
    loaded: true
  }
}