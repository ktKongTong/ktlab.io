// import remarkFootnotes from 'remark-footnotes'
// import remarkPrism from 'remark-prism'
// import remarkExternalLinks from 'remark-external-links'
// import remarkObsidian from 'remark-obsidian'
// import remarkObsidianLinks from './lib/remarkObsidianLinks'
import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(()=> ({
  name: 'post',
  filePathPattern: 'blog/**/*.md*',
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The metadata description of the post',
      required: false,
    },
    tags: {
      type: 'list',
      description: 'The tags of the post',
      required: false,
      of: {
        type: 'string',
      },
      default: [],
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.sourceFileName.slice(0, post._raw.sourceFileName.lastIndexOf( '.'))}`,
    },
    id: {
      type: 'string',
      resolve: (post) => `${post._raw.sourceFileName.slice(0, post._raw.sourceFileName.lastIndexOf( '.'))}`,
    },
  },

}))

const KnowledgeBasePath = "知识库"
export const KnowledgeBase = defineDocumentType(()=> ({
  name: 'knowledgebase',
  filePathPattern: `${KnowledgeBasePath}/**/*.md*`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The metadata description of the post',
      required: false,
    },
    tags: {
      type: 'list',
      description: 'The tags of the post',
      required: false,
      of: {
        type: 'string',
      },
      default: [],
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => {
        const pathId = `${post._raw.flattenedPath.replace(KnowledgeBasePath,'')}`
        return `/knowledge-base${pathId}`
      },
    },
    pathId: {
      type: 'string',
      resolve: (post) => {
        const pathName = `${post._raw.sourceFileDir.replace(KnowledgeBasePath,'')}`
        const fn = post._raw.sourceFileName.split(".")
        fn.pop()
        const fileName = fn.join(".")
        return `${pathName}/${fileName}/`
      },
    },
    parentPathId: {
      type: 'string',
      resolve: (post) => {
        return `${post._raw.sourceFileDir.replace(KnowledgeBasePath,'')}/`
      }
    }
  },

}))



export default makeSource({
  contentDirPath: 'vault',
  documentTypes: [
    Post,
    KnowledgeBase
    // Book,
    // NowUpdate,
    // Page,
    // Project,
  ],
  markdown: {
    remarkPlugins: [
      // remarkFootnotes,
      // [remarkPrism, { transformInlineCode: true }],
      // remarkExternalLinks
    ],
  },
})