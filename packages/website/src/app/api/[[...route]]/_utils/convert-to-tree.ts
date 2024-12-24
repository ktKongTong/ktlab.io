import {DocumentVO} from "@/interfaces";
import {CatalogItem} from "@/interfaces/catalog-item";
import {pathPrefix} from "@/config";

export default function convertToTree(docs: DocumentVO[],rootId:string|null):CatalogItem[] {
  const rootDoc = docs.find(doc=> doc.id === rootId);
  if (!rootDoc) {
    return [];
  }
  const root:CatalogItem = {
    id: rootDoc.id,
    title: rootDoc.title,
    createdAt: rootDoc.createdAt,
    lastModifiedAt: rootDoc.lastModifiedAt,
    tags: rootDoc.tags,
    children: []
  }

  const queue:CatalogItem[] = [root]
  while (queue.length > 0) {
    const cur = queue.shift()!
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
        href: `/knowledge${it.relativePath.replace(pathPrefix.knowledgebases.basePath, '')}`,
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
        href: it.relativePath.replace(pathPrefix.knowledgebases.basePath, ''),
        tags: it.tags,
        children: []
      }))
    if(curIndex) {
      cur.id = curIndex.id
      cur.title = curIndex.title
      cur.createdAt = curIndex.createdAt
      cur.lastModifiedAt = curIndex.lastModifiedAt
      cur.tags = curIndex.tags
      cur.href =  `/knowledge${curIndex.relativePath.replace(pathPrefix.knowledgebases.basePath, '')}`
    }else {
      cur.href = undefined
    }
    queue.push(...curChFolders)
    cur.children = curChDocs.concat(curChFolders)
  }
  return root.children
}