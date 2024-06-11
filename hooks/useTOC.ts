
import type { Result as TocResult } from "mdast-util-toc"
import { create } from 'zustand'

type TOC = {
  toc?: TocResult,
  catalogs?: any[]

}

type Action = {
  updateToc: (toc?: TocResult) => void
  updateCatalogs: (catalogs?: any[]) => void
}

const useTOC = create<TOC & Action>((set) => ({
  toc: undefined,
  catalogs: undefined,
  updateToc: (toc?: TocResult) => {
    set((state)=> ({...state, toc: toc}))
  },
  updateCatalogs: (catalogs?: any[]) => {
    set((state)=> ({...state, catalogs: catalogs}))
  }
}))
export default useTOC