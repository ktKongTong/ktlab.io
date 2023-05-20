import { fileURLToPath } from "url";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ['echarts', 'vue-echarts']
  },
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
      htmlAttrs: {
        lang: 'zh'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'ktlab',
      meta: [
        { hid: 'description', name: 'description', content: 'ktlab' },
        { name: 'author', content: 'kt' },
        { name: 'keywords', content: 'ktlab,kongtong,blog' },
        { name: 'og:title', property: 'og:title', content: 'ktlab' },
        { name: 'og:description', property: 'og:description', content: 'ktlab, a presonal space for fun' },
        { name: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image', property: 'og:image', content: 'https://ktlab.io/home_thumb.png' },
      ]
    },
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
