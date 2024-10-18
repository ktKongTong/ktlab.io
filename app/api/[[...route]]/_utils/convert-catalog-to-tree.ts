import * as _ from "lodash-es";

export const convertCatalogToTree = (catalogs:any[])=> {
  const dirs = catalogs.flatMap(it=>
    {
      const res = (it.parentId.split('/') as string[])
        .reduce(
          (acc, res)=> {
            let prefix = acc[acc.length - 1] ?? ""
            return acc.concat(`${prefix}${res}`)
          }, [] as string[]
        )
      return res
    }
  )
    .map(it=> (it.startsWith('/') ? '':'/')+it)
    .map(it=> it + (it.endsWith('/') ? '':'/'))
  let allDir = _.uniq(dirs).filter(it=>it !== "/")
  const root = {
    href: '/knowledge-base',
    dir: '/',
    title: '',
    level: 0,
    catalogs: [] as any[]
  }
  let allItems = catalogs
  const visit = (item:any)=> {
    // item.href
    const index = allItems.find(it=> it.pathId.includes('/index/') && it.pathId.replace('/index','') === item.dir)
    if(!index) {
      item.href = undefined
    }else {
      item.title = index.title ?? item.title
    }
    allItems = allItems.filter(it=> !(it.pathId.includes('/index/') && it.pathId.replace('/index','') === item.dir))
    let rest = allItems.filter(it=> it.parentId === item.dir)
    const childrenDir = allDir
      .filter(it=> it.slice(0, it.slice(0, it.length - 1).lastIndexOf('/')) + "/" == item.dir)
    const children = childrenDir
      .map(it=> {
        // if has /knowledge-base/:name/index/
        // then href = /knowledge-base/:name
        // and remove it for rest
        const itWithoutLastSlash = it.endsWith('/') ? it.slice(0,it.length - 1) : it
        const itWithoutSlash = itWithoutLastSlash.startsWith('/') ? itWithoutLastSlash.slice(0,it.length - 1) : itWithoutLastSlash
        return ({
          href: `/knowledge-base${itWithoutLastSlash}`,
          dir: it,
          title: itWithoutSlash,
          level: item.level + 1,
          catalogs: [],
        })
      })
    for (const item of children) {
      visit(item)
    }

    item.catalogs = rest.map(it=> ({...it, catalogs: []})).concat(children)
    return item
  }
  visit(root)
  root.catalogs = [{
    href: `/knowledge-base`,
    dir: `/knowledge-base/index/`,
    title: `介绍`,
    level: 1,
    catalogs: [],
  },...root.catalogs]
  return root.catalogs.map(it=> ({
    href: it.href,
    level: it.level,
    title: it.title,
    catalogs: it.catalogs,
  }))
}
