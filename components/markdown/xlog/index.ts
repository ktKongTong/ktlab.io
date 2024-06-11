import type { Root as HashRoot } from "hast"
import { toHtml } from "hast-util-to-html"
import { toJsxRuntime, type ExtraProps } from "hast-util-to-jsx-runtime"
import jsYaml from "js-yaml"
import type { Root as MdashRoot } from "mdast"
import { toc } from "mdast-util-toc"
import dynamic from "next/dynamic"
import {
  createElement,
  type ClassAttributes,
  type FC,
  type HTMLAttributes,
} from "react"
import { toast } from "react-hot-toast"
import { Fragment, jsx, jsxs } from "react/jsx-runtime"
import rehypeInferDescriptionMeta from "rehype-infer-description-meta"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import rehypeSlug from "rehype-slug"
import remarkBreaks from "remark-breaks"
import remarkDirective from "remark-directive"
import remarkDirectiveRehype from "remark-directive-rehype"
import emoji from "remark-emoji"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkGithubAlerts from "remark-github-alerts"
import remarkMath from "remark-math"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import type { BundledTheme } from "shiki/themes"
import { unified } from "unified"
import { visit } from "unist-util-visit"
import { VFile } from "vfile"

// @ts-expect-error
import remarkCalloutDirectives from "@microflash/remark-callout-directives"

import { createMarkdownHeaderComponent } from "./markdown-render"

import { transformers } from "./embed-transformers"
import { rehypeEmbed } from "./rehype-embed"
import { rehypeSrcUrl } from "./rehype-url"
import { rehypeMermaid } from "./rehype-mermaid"
import { rehypeRemoveH1 } from "./rehype-remove-h1"
import { rehypeTable } from "./rehype-table"
import { rehypeWrapCode } from "./rehype-wrap-code"
import { rehypeExternalLink } from "./rehyper-external-link"
import { remarkPangu } from "./remark-pangu"
import { remarkYoutube } from "./remark-youtube"
import sanitizeScheme from "./sanitize-schema"
import {isServerSide} from "@/lib/utils";

const Mermaid = dynamic(() => import("./components/Mermaid"))
const Icon = dynamic(() => import("./components/Icon"))
const GithubRepo = dynamic(() => import("@/components/GithubRepo"))
const ShikiRemark = dynamic(() => import("./components/shiki"))

const HeadRenderMap = {
  h1: createMarkdownHeaderComponent("h1"),
  h2: createMarkdownHeaderComponent("h2"),
  h3: createMarkdownHeaderComponent("h3"),
  h4: createMarkdownHeaderComponent("h4"),
  h5: createMarkdownHeaderComponent("h5"),
}

const memoedPreComponentMap = {} as Record<string, any>
const hashCodeThemeKey = (codeTheme?: Record<string, any>): string => {
  if (!codeTheme) return "default"
  return Object.values(codeTheme).join(",")
}

export const renderPageContent = ({
  content,
  strictMode,
  codeTheme,
}: {
  content: string
  strictMode?: boolean
  codeTheme?: {
    light?: BundledTheme
    dark?: BundledTheme
  }
}) => {
  let hastTree: HashRoot | undefined = undefined
  let mdastTree: MdashRoot | undefined = undefined

  const file = new VFile(content)

  try {
    const pipeline = unified()
      .use(remarkParse)
      .use(remarkGithubAlerts) // make sure this is before remarkBreaks
      .use(remarkBreaks)
      .use(remarkFrontmatter, ["yaml"])
      .use(remarkGfm, {
        singleTilde: false,
      })
      .use(remarkDirective)
      .use(remarkDirectiveRehype)
      .use(remarkCalloutDirectives)
      .use(remarkYoutube)
      .use(remarkMath, {
        singleDollarTextMath: false,
      })
      .use(remarkPangu)
      .use(emoji)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSlug)
      .use(rehypeSanitize, strictMode ? undefined : sanitizeScheme)
      .use(rehypeSrcUrl)
      .use(rehypeTable)
      .use(rehypeExternalLink)
      .use(rehypeMermaid)
      .use(rehypeWrapCode)
      .use(rehypeInferDescriptionMeta)
      .use(rehypeEmbed, {transformers})
      .use(rehypeRemoveH1)

    pipeline
      .use(rehypeKatex, {
        strict: false,
      })

    // markdown abstract syntax tree
    mdastTree = pipeline.parse(file)
    // hypertext abstract syntax tree
    hastTree = pipeline.runSync(mdastTree, file)
  } catch (e) {
    const error = e as Error
    console.error(e)
    if (!isServerSide()) {
      toast.error(error?.message)
    }
  }
  let Pre: FC<
    ClassAttributes<HTMLPreElement> &
      HTMLAttributes<HTMLPreElement> &
      ExtraProps
  > = memoedPreComponentMap[hashCodeThemeKey(codeTheme)]
  if (!Pre) {
    Pre = function Pre(props: any) {
      return createElement(ShikiRemark, { ...props, codeTheme }, props.children)
    }
    memoedPreComponentMap[hashCodeThemeKey(codeTheme)] = Pre
  }
  return {
    tree: hastTree,

    toToc: () => mdastTree &&
      toc(mdastTree, {
        tight: true,
        ordered: true,
      }),
    toHTML: () => hastTree && toHtml(hastTree),
    toElement: () =>
      hastTree &&
      toJsxRuntime(hastTree, {
        Fragment,
        components: {
          mermaid: Mermaid,
          lucide: Icon,
          "github-repo": GithubRepo,
          // @ts-expect-error
          h1: HeadRenderMap.h1,
          // @ts-expect-error
          h2: HeadRenderMap.h2,
          // @ts-expect-error
          h3: HeadRenderMap.h3,
          // @ts-expect-error
          h4: HeadRenderMap.h4,
          // @ts-expect-error
          h5: HeadRenderMap.h5,
          // @ts-expect-error
          pre: Pre,
        },
        ignoreInvalidStyle: true,
        // @ts-expect-error: untyped.
        jsx,
        // @ts-expect-error: untyped.
        jsxs,
        passNode: true,
      }),

    toMetadata: () => {
      let metadata = {
        frontMatter: undefined,
        images: [],
        audio: undefined,
        excerpt: undefined,
      } as {
        frontMatter?: Record<string, any>
        images: string[]
        audio?: string
        excerpt?: string
      }

      metadata.excerpt = file.data.meta?.description || undefined

      if (mdastTree) {
        visit(mdastTree, (node, index, parent) => {
          if (node.type === "yaml") {
            metadata.frontMatter = jsYaml.load(node.value) as Record<
              string,
              any
            >
          }
        })
      }
      if (hastTree) {
        visit(hastTree, (node, index, parent) => {
          if (node.type === "element") {
            if (
              node.tagName === "img" &&
              typeof node.properties.src === "string"
            ) {
              metadata.images.push(node.properties.src)
            }
            if (node.tagName === "audio") {
              if (typeof node.properties.cover === "string") {
                metadata.images.push(node.properties.cover)
              }
              if (!metadata.audio && typeof node.properties.src === "string") {
                metadata.audio = node.properties.src
              }
            }
          }
        })
      }

      return metadata
    },
  }
}

