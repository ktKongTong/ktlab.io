'use client'
import {useWindowScroll} from '@uidotdev/usehooks'
import Link from "@/components/link";
import React, {createElement, HTMLProps, useEffect, useRef, useState} from "react";

interface TOCProps {
  id: string,
  title: string,
  level: number,
  childrens: TOCProps[]
}

import katex from "katex"
import type { Result as TocResult } from "mdast-util-toc"
import {toHtml} from "hast-util-to-html";
import {toHast} from "mdast-util-to-hast";

import DOMPurify from "isomorphic-dompurify"
import {List} from "mdast";



interface ItemsProps {
  items: TocResult["map"]
  activeId?: string | null
  prefix?: string
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

function getElement(id: string) {
  return document.querySelector(`#user-content-${id}`)
}

function useActiveId(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>()
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id.replace("user-content-", ""))
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` },
    )
    itemIds.forEach((id) => {
      const element = getElement(id)
      if (element) {
        observer.observe(element)
      }
    })
    return () => {
      itemIds.forEach((id) => {
        const element = getElement(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])
  return activeId
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

export default function Toc({
  toc,
  ...rest
}:{
  toc:TocResult
} & HTMLProps<HTMLDivElement>){
  // const {toc} = useTOC()
  if(!toc) {
    return (
      <>
      </>
    )
  }
  generateContent(toc?.map)

  return (
    <div className="xlog-post-toc absolute left-full pl-14 h-full top-0 lg:block hidden" {...rest}>
      <span>on this page</span>
      <div
        className="sticky top-14 text-sm leading-loose whitespace-nowrap max-h-[calc(100vh-theme('spacing.28'))] truncate"
        style={{
          overflowY: "auto",
        }}
      >
        <TocItem items={toc?.map}/>
      </div>
    </div>
  )
}

function TocItem(
  {
    items
  }: {
    items: TocResult["map"]
  }
) {
  const idList = getIds(items)
  const activeId = useActiveId(idList)

  return <Items items={items} activeId={activeId}/>
}

export const scrollTo = (hash: string, notUserContent?: boolean) => {
  const calculateElementTop = (el: HTMLElement) => {
    let top = 0
    while (el) {
      top += el.offsetTop
      el = el.offsetParent as HTMLElement
    }
    return top
  }

  const _hash = decodeURIComponent(hash.slice(1))
  if (!_hash) return
  if (history.state?.preventScrollToToc) {
    history.state.preventScrollToToc = false
    return
  }
  const targetElement = document.querySelector(
    notUserContent
      ? `#${decodeURIComponent(_hash)}`
      : `#user-content-${decodeURIComponent(_hash)}`,
  ) as HTMLElement
  if (!targetElement) return

  window.scrollTo({
    top: calculateElementTop(targetElement) - 100,
    behavior: "smooth",
  })
}
function Items(props: ItemsProps) {
  const {items, activeId, prefix = ""} = props
  const [maxWidth, setMaxWidth] = useState(0)
  const anchorRef = useRef<HTMLLIElement>(null)
  useEffect(() => {
    const handler = () => {
      if (!anchorRef.current) return
      const $anchor = anchorRef.current
      const pos = $anchor.getBoundingClientRect()
      const maxWidth = window.innerWidth - pos.x - 20
      setMaxWidth(maxWidth)
    }

    handler()
    window.addEventListener("resize", handler)
    return () => {
      window.removeEventListener("resize", handler)
    }
  }, [])

  return (
    <ol className={prefix ? "pl-3" : ""}>
      <li ref={anchorRef} />
      {maxWidth > 0 &&
        items?.children?.map((item, index) => (
          <li
            key={index}
            style={{
              maxWidth: maxWidth + "px",
            }}
          >
            {item.children.map((child: any, i) => {
              const content = `${child.content}`

              return (
                <span key={index + "-" + i}>
                  {child.type === "paragraph" && child.children?.[0]?.url && (
                    <span
                      data-url={child.children[0].url}
                      onClick={() => scrollTo(child.children[0].url)}
                      title={content}
                      className={
                        (`#${activeId}` === child.children[0].url
                          ? "text-primary font-bold"
                          : "text-muted-foreground font-medium") +
                        " truncate inline-block max-w-full align-bottom hover:text-primary cursor-pointer"
                      }
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: content,
                        }}
                      />
                    </span>
                  )}
                  {child.type === "list" &&
                    createElement(Items, {
                      items: child,
                      activeId,
                      prefix: `${prefix}${index + 1}.`,
                    })}
                </span>
              )
            })}
          </li>
        ))}
    </ol>
  )
}
