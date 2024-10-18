import {DocumentSelect} from "@/lib/db/schema";

export default function convertToTree(docs: DocumentSelect[],rootId:string|null) {
  let root:any = docs.find(doc=> doc.id === rootId);
  root = {
    id: root.id,
    title: root.title,
    createdAt: root.createdAt,
    lastModifiedAt: root.lastModifiedAt,
    tags: root.tags,
    children: [] as any[]
  }
  // let tmp = docs
  const queue = [root] as any[]
  while (queue.length > 0) {
    let cur = queue.shift()
    const curIndex = docs
      .find((item) => item.parentId === cur.id
        && item.type === 'file'
        && item.relativePath === cur.href + "/index.md"
      )

    const curChDocs = docs
      .filter((item) => item.parentId === cur.id && item.type === 'file' &&  item.relativePath !== cur.href + "/index.md")
      .map(it=> ({
        id: it.id,
        title: it.title,
        createdAt: it.createdAt,
        href: `/knowledge/${it.relativePath}`,
        lastModifiedAt: it.lastModifiedAt,
        wordCount: 0,
        tags: it.tags,
        children: []
      }))
    const curChFolders = docs
      .filter((item) => item.parentId === cur.id && item.type === 'folder')
      .map(it=> ({
        id: it.id,
        title: it.title,
        createdAt: it.createdAt,
        lastModifiedAt: it.lastModifiedAt,
        href: it.relativePath,
        tags: it.tags,
        children: []
      }))
    if(curIndex) {
      cur.id = curIndex.id
      cur.title = curIndex.title
      cur.createdAt = curIndex.createdAt
      cur.lastModifiedAt = curIndex.lastModifiedAt
      cur.tags = curIndex.tags
      cur.href =  `/knowledge/${curIndex.relativePath}`
      cur.wordCount = 0
    }else {
      cur.href = undefined
    }
    queue.push(...curChFolders)
    cur.children = curChDocs.concat(curChFolders as any)
  }
  return root.children
}