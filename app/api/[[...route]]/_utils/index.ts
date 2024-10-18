
export const parseIntOrDefault = (value:string, fallback:number = 0) => {
  let res = parseInt(value)
  return Number.isNaN(res) ? fallback : res
}


export const kvKey = {
  postMeta: (id:string)=> `ktlab.io:document:meta:${id}`,
  postContent: (id:string)=> `ktlab.io:document:content:${id}`,
  postReaction: (id:string)=> `ktlab.io:document:reaction:${id}`,
}

export * from './response'