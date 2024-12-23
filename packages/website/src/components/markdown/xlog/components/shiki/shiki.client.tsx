"use client"

import {Suspense, use, type FC, useState, useRef} from "react"
import type { ShikiCodeProps } from "./types"
import { useCodeTheme } from "./theme-ctx";
import {
  createCodeHighlightCorePromise
} from "@/components/markdown/xlog/components/shiki/loader";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {cn} from "@/lib/utils";

export const ShikiRenderInternal: FC<ShikiCodeProps> = ({
   code,
   language,
   codeTheme,
}) => {
  let lang = language
  use(createCodeHighlightCorePromise)
  const { loading, currentTheme, availableTheme, updateCurrentTheme, renderedHtml, tryLoadAndSetTheme,currentThemeInfo } = useCodeTheme(lang, code, codeTheme)
  return <div
    className={cn(
      'rounded-lg border border-border ',
    )}
    style={{
      background: currentThemeInfo?.bg,
      color: currentThemeInfo?.fg,
    }}

  >
    <div
      className={'items-center border-b py-2 gap-2 *:px-4 flex'}
      style={{
        borderColor: currentThemeInfo?.fg + '4F',
      }}
    >
      <div>{lang}</div>
      <Select value={currentTheme.name} defaultValue={currentTheme.name} onValueChange={(v) => {tryLoadAndSetTheme(v)}}>
        <SelectTrigger
          className={'bg-transparent border-none max-w-40 h-6'}
        >{currentTheme.name}</SelectTrigger>
        <SelectContent>
          {
            availableTheme.map((it) => <SelectItem key={it.name} value={it.name}>{it.name}</SelectItem>)
          }
        </SelectContent>
      </Select>
    </div>
    {
      !renderedHtml ? (<pre className={"whitespace-pre-wrap"}>
        <code>{code}</code>
      </pre>) :
        (<div
          className={' *:px-2 *:whitespace overflow-x-auto max-w-none w-full relative'}
          dangerouslySetInnerHTML={{__html: renderedHtml}}/>)
    }
  </div>
}