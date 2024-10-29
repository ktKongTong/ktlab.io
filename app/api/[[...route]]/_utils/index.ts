
export const parseIntOrDefault = (value:string, fallback:number = 0) => {
  let res = parseInt(value)
  return Number.isNaN(res) ? fallback : res
}


export const kvKey = {
  postMeta: (id:string)=> `ktlab.io:document:meta:${id}`,
  postReaction: (id:string)=> `ktlab.io:document:reaction:${id}`,
  postView: (id:string)=> `ktlab.io:document:view:${id}`,
  postLastVisitor: (id:string)=> `ktlab.io:document:last-visitor:${id}`,
  siteLastVisitor: `ktlab.io:last-visitor`,
  siteView: `ktlab.io:view`,
}

export * from './response'