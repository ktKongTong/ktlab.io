
import { reactive } from 'vue'




const ThemeButton = () => {
    const theme = useState('theme',()=>{return {dark: false}})
    const onTheme: any = () => {
      console.log('theme',theme.value.dark)
        theme.value.dark = !theme.value.dark
    }
  return (
        <button 
      aria-label="Toggle Dark Mode"
      className="i-carbon-sun dark:i-carbon-moon text-xl ml-1 mr-1 h-8 w-8  p-1 sm:ml-4"
      onClick={onTheme}
        />
  )
}

export default ThemeButton