
import {MarkdownRender} from "@/components/markdown/xlog/render";
export default function Markdown(
{
  content
}: {
  content: string
}) {
  return (<MarkdownRender content={content} />)
}