export * from './nav-item'

type PathType = 'knowledge-base' | 'blog'

export const pathPrefix: Record<PathType, string> = {
  'knowledge-base': '知识库',
  'blog': 'blog'
}