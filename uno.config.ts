import { defineConfig, presetIcons, presetUno } from 'unocss'
import presetTheme from 'unocss-preset-theme'
import type { Theme } from 'unocss/preset-uno'
export default defineConfig<Theme>({
  theme: {
    colors: {
      'primary': '#f3f5f4',
      'primary-border': '#1677ff',
      'text': 'rgba(0, 0, 0, 0.88)',
      'container': '#091a28',
      'background': '#f3f5f4',
      'border': '#d9d9d9',
    },
  },
  presets: [
    presetUno({}),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
    presetTheme<Theme>({
      theme: {
        dark: {
          colors: {
            'background': '#091a28',
            'primary': '#1668dc',
            'primary-border': '#1668dc',
            'border': '#424242',
            'container': '#141414',
            'text': 'rgba(255, 255, 255, 0.85)',
          },
        },
        compact: {
          spacing: {
            xss: '2px',
            xs: '4px',
            sm: '6px',
            base: '8px',
            lg: '12px',
            xl: '16px',
          },
        },
      },
    }),
  ],
})