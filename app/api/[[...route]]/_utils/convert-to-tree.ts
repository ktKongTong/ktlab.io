import {DocumentVO} from "@/interfaces/vo";
import {CatalogItem} from "@/interfaces/catalog-item";

export default function convertToTree(docs: DocumentVO[],rootId:string|null):CatalogItem[] {
  let rootDoc = docs.find(doc=> doc.id === rootId);
  if (!rootDoc) {
    return [];
  }
  let root = {
    id: rootDoc.id,
    title: rootDoc.title,
    createdAt: rootDoc.createdAt,
    lastModifiedAt: rootDoc.lastModifiedAt,
    tags: rootDoc.tags,
    children: []
  }

  const queue:CatalogItem[] = [root]
  while (queue.length > 0) {
    let cur = queue.shift()!
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
    }else {
      cur.href = undefined
    }
    queue.push(...curChFolders)
    cur.children = curChDocs.concat(curChFolders)
  }
  return root.children
}