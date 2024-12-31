import {getAvailableMarkdownFiles} from "./utils";
import {LocalData, OnProgressCallback} from "./interface";
import {Settings} from "./setting";
import {App, Notice, requestUrl} from "obsidian";
import {extractMDData, generateFolderFromFiles} from "./extractor";
import {DB} from "./db";
import {DocumentInsert, DocumentSelect} from "@repo/shared/schema";


export default async function syncToDb(
  db: DB,
  settings:Settings,
  app:App,
  onProgressCallback?:OnProgressCallback
) {
  // onProgressCallback()

  const mds = getAvailableMarkdownFiles(settings, app)
  const total = mds.length;
  let count = 0

  const mdsPromise = mds.map((md) =>  async ()=>{
    const res = await extractMDData(md, app)
    count++
    onProgressCallback?.(total, count, 0, 0)
    return res
  })
  const folders = generateFolderFromFiles(mds)

  const metas:LocalData[] = await Promise.all(mdsPromise.map(it => it()))
  const data = metas.concat(folders);

  const { updated, created, deleted }= await db.syncDocs(data)
  await revalidatePublishedPath(settings, updated, created, deleted)
}


const revalidatePublishedPath =async (settings:Settings, updated:DocumentInsert[], created:DocumentInsert[], deleted:DocumentSelect[])=> {
  const tags:string[] = []
  const getRevalidatePath = (doc: (DocumentSelect|DocumentInsert)[]) => {
    const paths: string[] = []

    const updatedKnowledgePath = doc
      .filter(it => it.type == 'file')
      .filter(it => it.relativePath?.startsWith('知识库'))
      .map(it => `/knowledge/${it.relativePath}`)
    const updatedBlogPath = doc
      .filter(it => it.type == 'file')
      .filter(it => it.relativePath?.startsWith('blog'))
      .flatMap(it => {
         (it.tags ?? []).map(tags => `/blog/categories/${tags}`)
        .forEach(it => !tags.includes(it) && tags.push(it))
        return it.mdMetadata?.slug? [`/blog/${it.mdMetadata?.slug}`, `/blog/${it.id}`]: [`/blog/${it.id}`]
      })
    paths.push(...updatedBlogPath, ...updatedKnowledgePath)
    return paths
  }
  const ps = [
    ...getRevalidatePath(updated),
    ...getRevalidatePath(created),
    ...getRevalidatePath(deleted)
  ]
  try {
    // revalidate
    await requestUrl({
      url: settings.publishHost,
      method: 'PUT',
      body: JSON.stringify({
        paths: [...ps,'/blog', '/blog/categories', ...tags],
        tags: []
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${settings.token}`
      }
    })
    console.log("revalidate paths", [...ps,'/blog', '/blog/categories', ...tags])
  }catch(err) {
    console.error(`url${settings.publishHost}`)
    console.error(err)
    new Notice("cache revalidate failed")
  }
}