import { fileURLToPath } from "url";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components:[{
    path: '~/components',
    extensions: ['vue', 'tsx']
  }],
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
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    '@unocss/nuxt'
  ],

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
