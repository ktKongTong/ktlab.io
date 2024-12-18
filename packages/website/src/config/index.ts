export * from './nav-item'
export * from './projects'
type PathType = 'knowledge-base' | 'blog'

export const pathPrefix: Record<PathType, string> = {
  'knowledge-base': '知识库',
  'blog': 'blog'
}