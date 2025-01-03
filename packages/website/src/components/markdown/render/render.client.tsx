'use client'
import {renderPageContent} from "@/components/markdown/xlog/index";
import useToc from "@/hooks/use-toc";
import {useEffect, useMemo} from "react";
export const MarkdownRender = ({content}:{content: string})=> {
  // const inParsedContent = renderPageContent({content})
  const inParsedContent = useMemo(()=>renderPageContent({content}), [content])
  const  toc = useMemo(()=>inParsedContent?.toToc(),[inParsedContent])
  const {updateToc} = useToc()
  useEffect(()=> {
    updateToc(toc)
    return ()=> {
      updateToc(undefined)
    }
  }, [toc, updateToc])
  return (
    <>
      <div className="md-content prose">
        {inParsedContent?.toElement()}
      </div>
    </>
  )
}
