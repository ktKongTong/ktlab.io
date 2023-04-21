const ThemeButton = () => {
  const color = useColorMode()
    const onTheme: any = () => {
      console.log("test")
      color.preference = color.preference === 'light' ? 'dark' : 'light'
    }
    const icon = ` i-carbon-${color.value === 'light' ? 'sun' : 'moon'}`
  return (
    <div 
      aria-label="Toggle Dark Mode"
      className={`ml-1 mr-1 h-4 w-4  p-1 sm:ml-4 ${icon}`}
      onClick={onTheme}
        />
  )
}

export default ThemeButton