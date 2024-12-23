'use client'


import type { Result as TocResult } from "mdast-util-toc"
import useToc from "@/hooks/use-toc";
import {HTMLProps, useEffect} from "react";
import TocView from "@/app/_post-layout/toc";

interface TocLoaderProps {
  toc: TocResult
}

export default function TocLoader({toc, ...rest}: TocLoaderProps & HTMLProps<HTMLDivElement>) {
  const { updateToc } = useToc()
  useEffect(() => {
    updateToc(toc)
  },[toc])
  return (
    <>
      <TocView {...rest}/>
    </>
  )
}