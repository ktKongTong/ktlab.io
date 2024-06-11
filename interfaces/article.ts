interface Article {
  id: string
  title: string
  link: string
  description: string
  tags: string[]
  markdownContent: string
  image?: string
  date?: Date
  hit?: number
  like?: number,
  dislike?: number,
  comments?: number,
}