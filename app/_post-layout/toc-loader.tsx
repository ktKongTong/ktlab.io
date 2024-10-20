'use client'


import useToc from "@/hooks/use-toc";
import {useEffect} from "react";

interface TocLoaderProps {
  toc: any
}

export default function TocLoader({toc}: TocLoaderProps) {
  const {updateToc} = useToc()
  useEffect(() => {
    updateToc(toc)
  },[toc, updateToc])
  return (
    <>
    </>
  )
}