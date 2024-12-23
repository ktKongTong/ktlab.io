import {
  BundledLanguage, bundledLanguages,
  BundledTheme, bundledThemes,
  DynamicImportLanguageRegistration,
  DynamicImportThemeRegistration,
  HighlighterCore, type StringLiteralUnion, ThemeRegistrationAny
} from "shiki";

export let highlighterCore: HighlighterCore | null = null

export const highlighterCoreLoaded = () => {
  return highlighterCore != null
}

export const getCodeToHtmlFn = () => {
  return highlighterCore?.codeToHtml
}

const createCodeHighlightCore = async () => {
  if (highlighterCore) return highlighterCore
  const [{ getHighlighterCore }, getWasm] = await Promise.all([
    import("shiki/core"),
    import("shiki/wasm").then((m) => m.default),
  ])
  const core = await getHighlighterCore({
    themes: [
      import("shiki/themes/github-light-default.mjs"),
      import("shiki/themes/github-dark-default.mjs"),
    ],
    langs: [
      // import("shiki/langs/go.mjs"),
      // import("shiki/langs/java.mjs"),
      // import("shiki/langs/js.mjs"),
      // import("shiki/langs/json.mjs"),
      // import("shiki/langs/shell.mjs"),
      // import("shiki/langs/rust.mjs"),
      // import("shiki/langs/ts.mjs"),
      // import("shiki/langs/jsx.mjs"),
      // import("shiki/langs/tsx.mjs"),
      // import("shiki/langs/python.mjs"),
      // import("shiki/langs/kotlin.mjs"),
      // import("shiki/langs/yaml.mjs"),
      // import("shiki/langs/css.mjs"),
    ],
    loadWasm: getWasm,
  })
  console.log("shiki core loaded")
  highlighterCore = core
  return highlighterCore
}

// const langLoadedOberver = new MutationObserver()

export const createCodeHighlightCorePromise = createCodeHighlightCore()

let langModule: Record<BundledLanguage, DynamicImportLanguageRegistration> | null = null
let themeModule: Record<BundledTheme, DynamicImportThemeRegistration> | null = null

const loadLangAndThemeModuleIfNeed = async () => {
  if(!(langModule && themeModule)) {
    const [{ bundledLanguages }, { bundledThemes }] = await Promise.all([import("shiki/langs"), import("shiki/themes")])
    langModule = bundledLanguages
    themeModule = bundledThemes
  }
}

const loadedThemes:string[] = []
const loadedLangs: string[] = []
async function loadLang(lang: BundledLanguage) {
  const shiki = highlighterCore
  if(loadedLangs.includes(lang)) return
  if (lang && shiki) {
    if (!shiki.getLoadedLanguages().includes(lang || "")) {
      const importFn = bundledLanguages[lang]
      if (!importFn) return
      await shiki.loadLanguage(await importFn())
    }
    loadedLangs.push(lang)
    console.log("lang loaded", lang)
  }
}

export async function loadTheme(codeTheme: ThemeRegistrationAny | StringLiteralUnion<any>) {
  const shiki = highlighterCore
  if(loadedThemes.includes(codeTheme)) return
  if (codeTheme && shiki) {
    const themes = [codeTheme.light, codeTheme.dark] as [BundledTheme, BundledTheme]
    const promiseThemes = themes.map(async (theme) => {
      if (!shiki.getLoadedThemes().includes(theme || "")) {
        const importFn = bundledThemes[theme]
        if (!importFn) return
        await shiki.loadTheme(await importFn())
      }
      loadedThemes.push(theme)
      return theme
    })
    const res = await Promise.all(promiseThemes)
  }
}


export const registerLangAndTheme = async (lang: BundledLanguage, theme:  ThemeRegistrationAny | StringLiteralUnion<any>) => {
  if (!lang) return
  if(!highlighterCore) return
  await loadLangAndThemeModuleIfNeed()
  await Promise.all([
    loadLang(lang),
    loadTheme(theme)
  ])
}

export const checkIfLangLoaded = (lang: string | undefined) => {
  return lang ? loadedLangs.includes(lang) : true
}

export const checkIfThemeLoaded = (theme?: {
  light?: string,
  dark?: string,
}) => {
  const themes = []
  if(theme?.dark) {
    themes.push(theme.dark)
  }
  if(theme?.light) {
    themes.push(theme.light)
  }
  return themes.find((it) => !loadedLangs.includes(it)) === undefined
}