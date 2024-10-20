
import {MarkdownRender} from "@/components/markdown/xlog/render.client";
export default function Markdown(
{
  content
}: {
  content: string
}) {
  return (<MarkdownRender content={content} />)
}