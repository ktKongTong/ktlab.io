import type { Root } from "hast"
import { Plugin } from "unified"
import { visit } from "unist-util-visit"
import {Constants} from "@/lib/constants";


const toGateway = (src: string)=> {
  if (!(src.startsWith("http") || src.startsWith("https"))) {
    let base = Constants().RESOURCE_URL
    if(base.endsWith("/")) {
      base = base.substring(0, base.length - 1)
    }
    let s = src
    if(!s.startsWith("/")) {
      s= "/" + s
    }
    return base + s
  }
  return src
}

const tags = ["video", "audio", "img", "source"]

export const rehypeSrcUrl: Plugin<Array<void>, Root> = () => {
  return (tree: Root) => {
    visit(tree, (node, i, parent) => {
      if (node.type === "element") {
        if (tags.includes(node.tagName)) {
          if (typeof node.properties.src === "string") {
            node.properties.src = toGateway(node.properties.src)
          }
        }
      }
    })
  }
}
