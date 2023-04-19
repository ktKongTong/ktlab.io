import { fileURLToPath } from "url";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxt/image-edge',
  ],
})
