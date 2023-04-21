export const useTheme = () => useState('theme',()=>{return {dark: false, compact: false}})


export const useSearch = () => useState('searchKey',()=>{return ""})