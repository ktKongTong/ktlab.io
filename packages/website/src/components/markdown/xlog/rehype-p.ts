import type { Root } from "hast"
import { Plugin } from "unified"
import { visit } from "unist-util-visit"

export const rehypeRemoveParagraph: Plugin<Array<void>, Root> = () => {
  return (tree: Root) => {
    visit(tree, (node, i, parent) => {
      if (node.type === "element") {
        if (node.tagName === "p") {
          // @ts-ignore
          if(node.children.find((it) => it.type === 'comment' && it?.tagName === 'img'  )) {
            node.tagName = "div"
          }
        }
      }
    })
  }
}
