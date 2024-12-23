'use client'


import type { Result as TocResult } from "mdast-util-toc"
import useToc from "@/hooks/use-toc";
import {HTMLProps, useEffect} from "react";
import TocView from "@/app/_post-layout/toc";
import { usePostId } from "./use-post";

interface TocLoaderProps {
  toc: TocResult,
  id: string,
}

export default function TocLoader({id, toc, ...rest}: TocLoaderProps & HTMLProps<HTMLDivElement>) {
  const { updateToc } = useToc()
  useEffect(() => {
    updateToc(toc)
  },[toc])

  const {setId} = usePostId()
  useEffect(() => {setId(id)}, [id])
  return (
    <>
      <TocView {...rest}/>
    </>
  )
}