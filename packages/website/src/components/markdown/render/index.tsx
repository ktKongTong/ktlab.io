import {MarkdownRender} from "./render.client";
import {RawMarkdownRender} from "@/components/markdown/render/render";

export default function Markdown(
  {
    content
  }: {
    content: string
  }) {
  return (<MarkdownRender content={content} />)
}

export {
  RawMarkdownRender,
  MarkdownRender
}