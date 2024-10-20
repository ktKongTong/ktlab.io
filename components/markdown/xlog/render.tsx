import {renderPageContent} from "@/components/markdown/xlog/index";

export const RawMarkdownRender = ({content}:{content: string})=> {
  const inParsedContent = renderPageContent({content})
  return (
    <>
      <div className="md-content prose">
        {inParsedContent?.toElement()}
      </div>
    </>
  )
}