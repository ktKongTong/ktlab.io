'use client'
import {HTMLProps} from "react";
import {useWindowScroll, useWindowSize} from "@uidotdev/usehooks";
import {cn} from "@/lib/utils";

export default function ScrollToBottom(
  {
    children,
    className,
    ...rest
  }:HTMLProps<HTMLDivElement>
) {
  const [{ x, y }, scrollTo] = useWindowScroll()
  const {height} = useWindowSize()
  return (
    <div
      {...rest}
      onClick={()=>scrollTo({ left: 0, top: height, behavior: "smooth" })}
      className={cn('cursor-pointer transition-all duration-300',className)}
    >
      {children}
    </div>
  )
}