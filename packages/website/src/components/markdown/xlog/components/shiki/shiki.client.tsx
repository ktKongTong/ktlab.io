"use client"

import { use, type FC, useState} from "react"
import type { ShikiCodeProps } from "./types"
import { useCodeTheme } from "./theme-ctx";
import {
  createCodeHighlightCorePromise
} from "@/components/markdown/xlog/components/shiki/loader";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {CopyCheckIcon, CopyIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export const ShikiRenderInternal: FC<ShikiCodeProps> = ({
   code,
   language,
   codeTheme,
}) => {
  let lang = language
  use(createCodeHighlightCorePromise)
  const { loading, currentTheme, availableTheme, updateCurrentTheme, renderedHtml, tryLoadAndSetTheme,currentThemeInfo } = useCodeTheme(lang, code, codeTheme)

  const {copied, copy} = useCopy(code)
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
      <div className={'whitespace-nowrap'}>{lang}</div>
      <Select value={currentTheme.name} defaultValue={currentTheme.name} onValueChange={(v) => {tryLoadAndSetTheme(v)}}>
        <SelectTrigger
          className={'bg-transparent border w-auto px-1 h-6 focus:ring-0 shadow-0 ml-auto self-center'}
          style={{
            padding: '2px 6px',
            borderColor: currentThemeInfo?.fg + '4F',
          }}
        >{currentTheme.name}</SelectTrigger>
        <SelectContent
          className={'shadow-0 '}
          style={{
            borderColor: currentThemeInfo?.fg + '4F',
          background: currentThemeInfo?.bg,
          color: currentThemeInfo?.fg,
        }}>
          {
            availableTheme.map((it) => <SelectItem className={'border-none hover:bg-opacity-55 '} style={{
              borderColor: currentThemeInfo?.fg + '4F',
              background: currentThemeInfo?.bg,
              color: currentThemeInfo?.fg,
            }} key={it.name} value={it.name}>{it.name}</SelectItem>)
          }
        </SelectContent>
      </Select>
        <Button className={'focus:ring-0 w-6 h-6 p-0 m-1 hover:bg-transparent '} variant={'ghost'} size={'icon'} onClick={()=> {copy()}} style={{
          color: currentThemeInfo?.fg,
        }}>
          <span className={'w-4 h-4 p-0 inline-flex items-center'} style={{
            color: currentThemeInfo?.fg,
            width: 24,
            height: 24
          }}>
          {
            copied ? <CopyCheckIcon  className={'w-4 h-4'}/>: <CopyIcon className={'w-4 h-4'}/>
          }
          </span>
        </Button>
    </div>
    {
      !renderedHtml ? (<pre className={"whitespace-pre-wrap"}>
        <code>{code}</code>
      </pre>) :
        (<div
          className={' *:m-2 *:whitespace overflow-x-auto max-w-none w-full relative'}
          dangerouslySetInnerHTML={{__html: renderedHtml}}/>)
    }
  </div>
}


const useCopy = (text: string, timeout: number = 2000) => {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => {setCopied(false)}, timeout)
  }
  return {
    copy,
    copied
  }
}