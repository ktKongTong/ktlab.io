const ThemeButton = () => {
  const color = useColorMode()
    const onTheme: any = () => {
      color.preference = color.preference === 'light' ? 'dark' : 'light'
    }
  return (
        <button 
      aria-label="Toggle Dark Mode"
      className={`ml-1 mr-1 h-6 w-6  p-1 sm:ml-4 text-xl i-carbon-${color.preference === 'light' ? 'sun' : 'moon'}`}
      onClick={onTheme}
        />
  )
}

export default ThemeButton