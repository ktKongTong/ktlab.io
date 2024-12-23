'use client'
import React, {createContext, useContext, useEffect, useMemo, useRef, useState} from "react";
import { bundledThemes} from "shiki";
import {BundledTheme} from "shiki/themes";
import {
  getCodeToHtmlFn,
  highlighterCore,
  highlighterCoreLoaded,
  registerLangAndTheme
} from "@/components/markdown/xlog/components/shiki/loader";
import {shikiTransformers} from "@/components/markdown/xlog/components/shiki/shiki-shared";
import type {ThemeRegistrationResolved} from "shiki";

const theme = 'github-light'

interface ThemeCtxProps {
  currentTheme: ThemeItem | undefined,
  availableTheme: ThemeItem[],
  updateCurrentTheme: (theme: ThemeItem) => void
}

const ThemeCtx = createContext<ThemeCtxProps>({
  currentTheme: undefined,
  availableTheme: [],
  updateCurrentTheme: (t: ThemeItem) => {}
})

export type ThemeItem = {
  name: string
  light: BundledTheme,
  dark: BundledTheme,
}

export const getThemesFromThemeItem = (theme: ThemeItem) => {
  if(typeof theme === 'string') {
    return [theme]
  }
  return [theme.light, theme.dark]
}

const availableThemes= Object.keys(bundledThemes) as BundledTheme[]

const _availableTheme = [
  ...availableThemes
]
const availableTheme = _availableTheme.map(it => {
  if(typeof it === 'string') return {
    name: it,
    light: it,
    dark: it
  }
  return it
})



export const CodeThemeProvider = (
  {children}: {
    children: React.ReactNode
  }
) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeItem| undefined>(undefined)
  return <ThemeCtx.Provider value={{
    currentTheme,
    availableTheme: availableTheme,
    updateCurrentTheme: (theme:ThemeItem) => {setCurrentTheme(theme)}
  }}>
    {children}
  </ThemeCtx.Provider>
}

const defaultTheme = {
  name: 'github-default',
  light: "github-light-default" as const,
  dark: "github-dark-default" as const,
}

const getThemeByName = (theme: string) => {
  return availableTheme.find(it => it.name === theme) ?? defaultTheme
}

export const useCodeTheme = (lang: string | undefined, code: string, preDefinedTheme: any) => {
  const {currentTheme, updateCurrentTheme, availableTheme} = useContext(ThemeCtx)
  // theme
  let _theme = currentTheme
  if(typeof _theme === 'string') {
    _theme = {
      name: _theme,
      light: _theme,
      dark: _theme,
    }
  }
  if(!_theme) {
    _theme = preDefinedTheme ?? defaultTheme
  }
  const [cnt, setCnt] = useState(0)
  const [loading, setLoading] = useState(false)
  const loadingCount = useRef(0)
  const selectedThemeLoading = true
  const loadThemeByName = async (theme: string) => {
    if(!highlighterCoreLoaded()) {
      return
    }
    loadingCount.current = loadingCount.current + 1
    setLoading(true)
    try {
      const t = getThemeByName(theme)
      await registerLangAndTheme(lang as any, t)
      updateCurrentTheme(t)
    }catch (e) {
    }
    setCnt(cnt + 1)
    loadingCount.current = loadingCount.current - 1
    setLoading(false)
  }
  useEffect(() => {
    loadThemeByName(defaultTheme.name)
  }, []);
  const [renderedHtml, setRenderHtml] = useState<string>("")
  const [currentThemeInfo, setCurrentThemeInfo] = useState<ThemeRegistrationResolved | undefined>(undefined)
  useEffect(() => {
    try {
      const theme = _theme ?? defaultTheme
      const loaded = highlighterCore?.getLoadedThemes()
      // console.log("loaded,",loaded)
      let res = getCodeToHtmlFn()?.(code, {
        lang: lang!,
        themes: {
          light: theme.light,
          dark: theme.dark
        },
        transformers: shikiTransformers,
      })
      if(res) {
        const themeInfo = highlighterCore?.getTheme(theme.light)
        setCurrentThemeInfo(themeInfo)
        setRenderHtml(res)
      }
    }catch (e: any) {
      console.error("error", e)
    }
  }, [currentTheme, highlighterCore])

  const tryLoadAndSetTheme = (theme: string) => {
    loadThemeByName(theme)
  }
  const coreLoading = !highlighterCoreLoaded()
  return {
    selectedThemeLoading,
    currentTheme: _theme!,
    loading,
    coreLoading,
    updateCurrentTheme,
    availableTheme,
    renderedHtml,
    currentThemeInfo,
    tryLoadAndSetTheme
  }
}
