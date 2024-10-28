
export interface SSRArticle {
  id: string,
  title: string
  excerpt?: string
  tags: string[]
  createdAt?: string
  lastModifiedAt?: string
  wordCount: number,
  slug: string,
  image?: string
  path?: string,
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