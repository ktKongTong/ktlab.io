'use client'
import {HTMLProps, useEffect, useMemo, useState} from "react";
import {useWindowScroll, useThrottle} from "@uidotdev/usehooks";
import {cn} from "@/lib/utils";

export default function ScrollToTop(
{
  children,
  className,
  ...rest
}:HTMLProps<HTMLDivElement>
) {
  const [{ x, y }, scrollTo] = useWindowScroll()
  const throttledY = useThrottle(y, 200)
  const opacity = useMemo(()=> {
    if(!throttledY || throttledY < 200) {
      return 0
    }
    if(throttledY > 500) {
      return 1
    }
    return throttledY/500
  }, [throttledY])
  let restStyles = {}
  if(opacity < 0.3) {
    restStyles = {
      display: 'none',
    }
  }
  return (
    <div
      {...rest}
      onClick={()=>scrollTo({ left: 0, top: 0, behavior: "smooth" })}
      className={cn('cursor-pointer',className)}
      style={{
        opacity: opacity,
        ...restStyles
      }}
    >
      {children}
    </div>
  )
}