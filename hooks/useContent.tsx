import {create} from "zustand";
import type {Result as TocResult} from "mdast-util-toc";

type Shown = {
  showToc: boolean
  showCatalog: boolean
}

type Action = {
  setShowToc: () => void
}
const useTOC = create<Shown & Action>((set) => ({
  showToc: false,
  showCatalog: false,
  setShowToc: () => {
    // set((state)=> ({toc: toc}))
  },
}))