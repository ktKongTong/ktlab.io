
export const parseIntOrDefault = (value:string, fallback:number = 0) => {
  let res = parseInt(value)
  return Number.isNaN(res) ? fallback : res
}


export * from './response'