'use client'
import type { Result as TocResult } from "mdast-util-toc"
import { create } from 'zustand'
import {List, ListItem} from "mdast";
import katex from "katex";
import {toHtml} from "hast-util-to-html";
import {toHast} from "mdast-util-to-hast";
import DOMPurify from "isomorphic-dompurify";
import {useEffect} from "react";

type TOC = {
  toc?: ItemProps[],
  // TocResult['map']
  tocIds: string[],
  catalogs?: any[]
}

type Action = {
  updateToc: (toc?: TocResult) => void
  updateCatalogs: (catalogs?: any[]) => void
}

const useTocStore = create<TOC & Action>((set) => ({
  toc: undefined,
  tocIds: [],
  catalogs: undefined,
  updateToc: (toc?: TocResult) => {

    const tocResult = toc?.map
    generateContent(tocResult)
    const ids = getIds(tocResult)
    const res = tocResult?.children.map((it) => generatePropsFromListItem(it))
    set((state)=> ({...state, toc: res ?? [], tocIds: ids}))
  },
  updateCatalogs: (catalogs?: any[]) => {
    set((state)=> ({...state, catalogs: catalogs}))
  }
}))


interface ItemProps {
  title: string
  content: string
  children: (ItemProps | ItemProps[])[]
  anchorUrl: string
}
type Props = ItemProps | ItemProps[]

// @ts-ignore
const generatePropsFromListItem = (it: ListItem) => {
  let isChildren = false
  let children: any[] = []
  it?.children.forEach((it, index) => {
    // return item => return => children
    if(it.type === 'paragraph') {
      // leaf
      isChildren = true
      // @ts-ignore
      let anchor = it.children[0].url
      // @ts-ignore
      const content = it.content
      const item = {
        title: content,
        content: content,
        anchorUrl: anchor,
        children: []
      }
      children.push(item)
    } else if(it.type === 'list') {
      // const last = isChildren ? children[0] : children
      const items = it?.children?.map(child => generatePropsFromListItem(child))
      if(isChildren) {
        children[children.length - 1]?.children.push(...items)
      }else {
        children.push(...items)
      }

    }
  })
  if(children.length === 1) {
    return children[0]
  }
  return children
}

const useToc = () => {
  const toc = useTocStore(state => state.toc)
  const tocIds = useTocStore(state => state.tocIds)
  const updateToc = useTocStore(state => state.updateToc)
  return {
    toc,
    tocIds,
    updateToc
  }
}
export const useCatalog = () => {
  const catalogs = useTocStore(state => state.catalogs)
  const updateCatalogs = useTocStore(state => state.updateCatalogs)
  const resetCatalog = () => {
    updateCatalogs()
  }
  // resetId,

  const isKnowledgebasePage = catalogs != undefined
  return {
    catalogs,
    updateCatalogs,
    resetCatalog,
    isKnowledgebasePage
  }
}

export const NotKnowledgebasePage = () => {
  const {resetCatalog, catalogs} = useCatalog()
  useEffect(() => {
    resetCatalog()
  }, [])
  return null
}

const inlineElements = ["delete", "strong", "emphasis", "inlineCode"]

function getLinkNode(node: any): List["children"] {
  if (node.type === "link") return node.children
  else return getLinkNode(node.children[0])
}

function generateContent(items: TocResult["map"]) {
  items?.children?.forEach((item) => {
    item.children.forEach((child: any, i) => {
      const children = getLinkNode(child) || []
      let content = ""

      children.forEach((child: any) => {
        if (child.type === "inlineMath") {
          content += katex.renderToString(child.value, {
            output: "html",
            strict: false,
          })
        } else if (inlineElements.includes(child.type)) {
          content += toHtml(toHast(child) || [])
        } else {
          content += child.value
        }
      })
      child.content = DOMPurify.sanitize(content)
      if (child.type === "list") {
        generateContent(child)
      }
    })
  })
}

function getIds(items: TocResult["map"]) {
  return (
    items?.children?.reduce((acc: string[], item) => {
      item.children.forEach((child) => {
        if (child.type === "paragraph" && (child.children[0] as any).url) {
          acc.push((child.children[0] as any).url.slice(1))
        } else if (child.type === "list") {
          acc.push(...getIds(child))
        }
      })
      return acc
    }, []) || []
  )
}
export default useToc