export const dateFormatEn = (date: string) => {
    const dateObj = new Date(date)
    const month = dateObj.toLocaleString('en', { month: 'short' })
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${month} ${day}, ${year}`
}