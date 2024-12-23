'use client'
import React, { HTMLProps, useCallback, useEffect, useRef, useState} from "react";
import useToc from "@/hooks/use-toc";

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
const defaultArr:any[] = []
export default function TocView({
  ...rest
}:{
} & HTMLProps<HTMLDivElement>){
  const { toc, tocIds } = useToc()
  return (
    <div className="xlog-post-toc  left-full select-none lg:block hidden" {...rest}>
      <span className={'font-semibold text-md w-full whitespace-nowrap'}>on this page</span>
      <div
        className="text-sm leading-loose whitespace-nowrap truncate"
        style={{
          overflowY: "auto",
        }}
      >
        <TocItem items={toc ?? defaultArr} tocIds={tocIds}/>
      </div>
    </div>
  )
}

function TocItem(
  {
    tocIds,
    items
  }: {
    tocIds: string[]
    items: ItemProps[]
  }
) {
  const activeId = useActiveId(tocIds)

  return <Items items={items} activeId={activeId}/>
}



interface ItemProps {
  title: string
  content: string
  children: (ItemProps|ItemProps[])[]
  anchorUrl: string
}

interface ItemsProps {
  items: (ItemProps|ItemProps[])[]
  activeId?: string | null
  prefix?: string
}

function Items(props: ItemsProps) {
  const {items, activeId, prefix = ""} = props
  const [maxWidth, setMaxWidth] = useState(180)
  const anchorRef = useRef<HTMLLIElement>(null)
  useEffect(() => {
    const handler = () => {
      if (!anchorRef.current) return
      const $anchor = anchorRef.current
      const pos = $anchor.getBoundingClientRect()
      let maxWidth = window.innerWidth - pos.x - 20
      if (maxWidth < 0) maxWidth = 180
      setMaxWidth(maxWidth)
    }
    window.addEventListener("resize", handler)
    return () => {
      window.removeEventListener("resize", handler)
    }
  }, [])
  const Leaf = useCallback(({item, idx, activeId, maxWidth}:{item: ItemProps, idx: number, activeId?: string | null, maxWidth: number}) => {
    return <>
      <li
        style={{
          maxWidth: maxWidth + "px",
        }}
      >
        <span>
              {item.anchorUrl && (
                <span
                  data-url={item.anchorUrl}
                  onClick={() => scrollTo(item.anchorUrl)}
                  title={item.content}
                  className={
                    (`#${activeId}` === item.anchorUrl
                      ? "text-primary font-bold"
                      : "text-muted-foreground font-medium") +
                    " truncate inline-block max-w-full align-bottom hover:text-primary cursor-pointer"
                  }
                >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.content,
                        }}
                      />
                    </span>
              )}
            </span>
      </li>

      {item.children.length > 0 && (
        <Items
          items={item.children}
          activeId={activeId}
          prefix={`${prefix}.${idx + 1}`}
        />
      )}
    </>
  }, [prefix])
  return (
    <ol className={prefix ? `pl-3` : ''}>
      <li ref={anchorRef}>{/* Placeholder for top-level anchor (optional) */}</li>
      {maxWidth > 0 && items?.map((item, index) => (<>
        {
          item instanceof Array ? (
              <>
                  {item.map((child, i) => (
                    <Leaf item={child} key={index+ "." +i} idx={i} activeId={activeId} maxWidth={maxWidth}/>
                  ))}
              </>
            ) : (<Leaf item={item} key={index} idx={index}  activeId={activeId}  maxWidth={maxWidth}/>)
        }
        </>))}
</ol>
)
  ;

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

