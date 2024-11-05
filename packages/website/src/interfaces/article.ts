
export interface SSRArticle {
  id: string,
  title: string
  tags: string[]
  wordcount: number,
  slug: string,
  excerpt?: string
  image?: string
  path?: string,
  timeliness?:boolean,
  createdAt: string
  lastModifiedAt: string
}

export type SSRArticleWithContent = SSRArticle & {
  content: string
}

export interface ArticleMetadata {
  id: string,
  reactions: Record<string, number>,
  view: number,
  click: number,
  comments: number,
  lastVisited?: number,
}