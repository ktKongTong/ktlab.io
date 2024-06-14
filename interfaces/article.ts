
export interface Article {
  id: string,
  slug: string,
  title: string
  excerpt?: string
  tags: string[]
  image?: string
  createdAt?: string
  lastModifiedAt?: string
  content: string,
  wordCount: number,
  click: number
  like: number,
  dislike: number
}