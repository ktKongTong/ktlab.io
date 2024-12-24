import type { Root } from "hast"
import { Plugin } from "unified"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"

export const rehypeWrapCode: Plugin<Array<void>, Root> = () => {
  return (tree: Root) => {
    visit(tree, { type: "element", tagName: "pre" }, (node, index, parent) => {
      if (parent && typeof index === "number") {
        const wrapper = u("element", {
          tagName: "div",
          properties: {
            className: "md-code-wrapper",
          },
          children: [
            node,
          ],
        })
        parent.children[index] = wrapper
      }
    })
  }
}
