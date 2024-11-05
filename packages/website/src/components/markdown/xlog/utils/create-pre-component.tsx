import {ClassAttributes, createElement, FC, HTMLAttributes} from "react";
import type {ExtraProps} from "hast-util-to-jsx-runtime";
import dynamic from "next/dynamic";

const ShikiRemark = dynamic(() => import("../components/shiki"))

type PreComponentProps = ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement> & ExtraProps
type PreComponent = FC<PreComponentProps>

const memorizedPreComponentMap = {} as Record<string, PreComponent>

const hashCodeThemeKey = (codeTheme?: Record<string, any>): string => {
  if (!codeTheme) return "default"
  return Object.values(codeTheme).join(",")
}

export const createPreComponent = (codeTheme: Record<string, any> | undefined) => {
  let Pre = memorizedPreComponentMap[hashCodeThemeKey(codeTheme)]
  if (!Pre) {
    Pre = function Pre(props: PreComponentProps) {
      return createElement(ShikiRemark, { ...props, codeTheme }, props.children)
    }
    memorizedPreComponentMap[hashCodeThemeKey(codeTheme)] = Pre
  }
  return Pre
}
