import {bundledLanguages, StringLiteralUnion, ThemeRegistrationAny} from "shiki"

export interface ShikiCodeProps {
  codeTheme?: ThemeRegistrationAny | StringLiteralUnion<any>
  language?: BundleLanguage
  code: string
}

export type BundleLanguage = keyof typeof bundledLanguages