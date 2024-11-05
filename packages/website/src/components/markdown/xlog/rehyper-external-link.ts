import type { Root } from "hast"
import { Plugin } from "unified"
import { visit } from "unist-util-visit"
import {pathPrefix} from "@/config";

const isExternLink = (url: string) => /^https?:\/\//.test(url)

export const rehypeExternalLink: Plugin<Array<void>, Root> = () => {
  return (tree: Root) => {
    visit(tree, { type: "element", tagName: "a" }, (node) => {
      if (!node.properties) return
      let url = node.properties.href
      // resolve url
      // some-path
      // ./some-path
      // ../some-path
      // /知识库/xxx.md
      if (!url || typeof url !== "string") {
        return
      }
      const decodedUrl = decodeURIComponent(url)
      if(decodedUrl.startsWith(`/${pathPrefix['knowledge-base']}`)) {
        node.properties.href = `/knowledge${url}`
      }else if (decodedUrl.startsWith(`/${pathPrefix['blog']}`)) {
        node.properties.href = url
      }else {
        node.properties.href = url
      }

      if (isExternLink(url)) {
        node.properties.target = "_blank"
        node.properties.rel = "noopener noreferrer"
      }
    })
  }
}
