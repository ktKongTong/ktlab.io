"use client"
import {type FC, type ReactNode, Suspense} from "react"
import type { BundledTheme } from "shiki/themes"

import { ShikiRenderInternal} from "./shiki.client"
import type {BundleLanguage, ShikiCodeProps} from "@/components/markdown/xlog/components/shiki/types";

type ShikiRemarkProps = {
  codeTheme?: {
    light?: BundledTheme
    dark?: BundledTheme
  }
  children?: ReactNode
}

export const ShikiRender: FC<ShikiCodeProps> = (props) => {
  return (
    <Suspense
      fallback={
        <pre className={'whitespace-pre-wrap'}>
          <code>{props.code}</code>
        </pre>
      }
    >
      <ShikiRenderInternal {...props} />
    </Suspense>
  )
}
const ShikiRemark = (props:ShikiRemarkProps) => {
  const code = pickMdAstCode(props)
  const language = pickCodeLanguage(props) as BundleLanguage

  return (
      <ShikiRender code={code} language={language} codeTheme={props.codeTheme} />
  // <pre>
  //   {code}
  // </pre>
)
}

const pickMdAstCode = (props: any) => {
  return props.children.type === "code"
    ? (props.children.props.children as string)
    : ""
}

const pickCodeLanguage = (props: any) => {
  const className =
    props.children.type === "code"
      ? (props.children.props.className as string)
      : ""

  if (className?.includes("language-")) {
    return className.replace("language-", "")
  }
  return ""
}

export default ShikiRemark