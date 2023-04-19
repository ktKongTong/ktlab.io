// For Nuxt 3
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas as fasSolid } from '@fortawesome/free-solid-svg-icons'
import { far as fasRegular } from '@fortawesome/free-regular-svg-icons'
import { fab as fasBrand } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fasBrand)
library.add(fasRegular)
library.add(fasSolid)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})