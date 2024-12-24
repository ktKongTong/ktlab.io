import {RawMarkdownRender} from "@/components/markdown/render";
import React from "react";


export const Markdown = React.memo(RawMarkdownRender, (a,b) => {
  return a.content == b.content
})