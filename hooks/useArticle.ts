

export const useArticle = (article:any) => {
  return {
    date: article.date,
    id: article.id,
    link: article.href,
    title: article.title,
    description: article.description,
    tags: article.tags,
    markdownContent: (article as any).body.raw
  }
}