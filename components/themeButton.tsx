import { ColorScheme } from "#components"

export default defineComponent({
  name: 'ThemeButton',
  setup(props, { slots, emit, expose }) {
    const color = useColorMode()
    const icon = computed(() => {
      if (color.preference === 'system') {
        return 'i-material-symbols:computer-outline'
      }
      return `i-carbon-${color.value !== 'dark' ? 'sun' : 'moon'}`
    })
    const preference = computed(() => {
      // return [ 'dark', 'light']
      return ['system', 'dark', 'light']
    })
      const onTheme: any = () => {
        color.preference  = preference.value[(preference.value.indexOf(color.preference) + 1) % preference.value.length]
      }
      return() =>(
        <ColorScheme placeholder="" tag="span">        
        <div
          class={`ml-1 mr-1 h-4 w-4  p-1 sm:ml-4 ${icon.value}`}
          onClick={onTheme}
            />
        </ColorScheme>
      )
  }
})