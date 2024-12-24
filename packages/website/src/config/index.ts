export * from './nav-item'
export * from './projects'
type PathType = 'knowledgebases' | 'blog'


export const pathPrefix = {
  'knowledgebases': {
    basePath: '知识库',
    children: [
      {
        name: 'CS & SE',
        path: '知识库/CS&SE',
        description: `该知识库主要是关于 CS & SE 的，内容正在迁移中`,
        href: '/knowledge/CS&SE',
        default: true,
      },
      {
        name: '通识',
        path: '知识库/General',
        href: '/knowledge/General',
        description: `该知识库主要是关于一些通识内容。`,
      },
    ]
  },
  'blog': 'blog'
} as const

