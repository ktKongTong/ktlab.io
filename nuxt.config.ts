import { fileURLToPath } from "url";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components:[{
    path: '~/components',
    extensions: ['vue', 'tsx']
  }],
  // content: {
  //   documentDriven:true
  // },
  alias: {
    '~/': __dirname,
    'data': fileURLToPath(new URL('./data', import.meta.url)),
    'components': fileURLToPath(new URL('./components', import.meta.url)),
    'public': fileURLToPath(new URL('./public', import.meta.url)),
  },
  app:{
    head: {
      charset: 'utf-8',
      title: 'ktlab',
    }
  },
  css: [
    '@/assets/style/main.css',
  ],
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxt/image-edge',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode'
  ],
  googleFonts: {
    subsets: ['latin', 'latin-ext'],
    families: {
      Inter: true,
      'Open+Sans': {
        wght: [400, 700]
      }
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  }

})
