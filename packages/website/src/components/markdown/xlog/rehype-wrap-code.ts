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
            u("element", {
              tagName: "button",
              properties: {
                type: "button",
                className: "md-copy-button",
              },
              children: [
                u("element", {
                  tagName: "lucide",
                  properties: {name: "copy"},
                  children: [],
                }),
                u("element", {
                  tagName: "span",
                  properties: {},
                  children: [u("text", "Copy")],
                }),
              ],
            }),
            node,
          ],
        })
        parent.children[index] = wrapper
      }
    })
  }
}
