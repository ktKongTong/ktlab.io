import {Hono} from "hono";
import {
  getAllDocumentWithFolders,
  getAllDocumentWithoutFolder,
  getDocumentById,
  getDocumentByPath,
  getDocumentsByTags
} from "@/lib/db";
import kv from "@/lib/kv";
import {Constants} from "@/lib/constants";
import convertToTree from "@/app/api/[[...route]]/converToTree";
import {Env as HEnv, Schema} from "hono";

export const kvKey = {
  postMeta: (id:string)=> `ktlab.io:document:meta:${id}`,
  postContent: (id:string)=> `ktlab.io:document:content:${id}`,
  postReaction: (id:string)=> `ktlab.io:document:reaction:${id}`,
}

export const Remote = (app:Hono)=>{
  app.get('/api/catalog/knowledge', async (c)=>{
    const res = await getAllDocumentWithFolders()
    const treeRes = convertToTree(res, "知识库")
    return c.json({
      status: "ok",
      success: true,
      data: treeRes
    })
  })

  app.get('/api/knowledge/*', async (c)=>{
    let p = c.req.path.split('/knowledge')?.[1]
    if(p != "/" && p?.startsWith('/')) {
      p = p.replace('/', '')
    }
    if(!p) {
      p = "index"
    }
    const res = await getDocumentByPath(p)
    if(!res) {
      return c.json({
        status: "404 NotFound",
        success: false,
        data: null
      })
    }
    const proMeta = kv.get<number[]>(kvKey.postMeta(res.id))
    let content = await kv.get<string>(kvKey.postContent(res.id))
    if(!content) {
      const resp = await fetch(`${Constants().RESOURCE_URL}/${res.relativePath}`)
      if(resp.status >= 300) {
        return c.json({
          status: "source content NotFound",
          success: false,
          data: null
        })
      }
      content = await resp.text()
      await kv.set(kvKey.postContent(res.id), content)
    }
    let meta = await proMeta
    if(!meta) {
      meta = [0,0,0,0]
    }
    meta[0] = meta[0]+1
    await kv.set(kvKey.postMeta(res.id), meta)
    const [click, like, dislike, ] = meta
    return c.json({
      status: "ok",
      success: true,
      data: {
        id: res.id,
        title: res.title,
        excerpt: res.excerpt ?? "",
        path: res.relativePath,
        createdAt: res.createdAt,
        lastModifiedAt: res.lastModifiedAt,
        parentId: res.parentId,
        wordCount: 0,
        tags: res.tags ?? [],
        content,
        click,
        like,
        dislike,
      }
    })
  })

  app.get('/api/blog', async (c)=> {
    const {topic} = c.req.query()
    let posts = []
    if(!topic) {
      posts = await getAllDocumentWithoutFolder()
    }else {
      posts = await getDocumentsByTags([topic])
    }
    const postMetaKeys = posts.map(post=> kvKey.postMeta(post.id))
    const maps = await kv.mget<[number,number,number,number][]>(postMetaKeys)
    let notInitKey:any[] = []
    for(let i = 0; i< postMetaKeys.length; i++) {
      if(!maps[i]) {
        notInitKey.push(postMetaKeys[i])
      }
    }
    if(notInitKey.length > 0) {
      let obj:Record<string, any> = {}
      for(const key of notInitKey) {
        obj[key] = [0,0,0,0]
      }
      await kv.mset(obj)
    }
    const res = posts.map((it,idx)=> ({
      id: it.id,
      title: it.title,
      link: `/blog/`+it.id,
      excerpt: it.excerpt,
      createdAt: it.createdAt,
      lastModifiedAt: it.lastModifiedAt,
      tags: it.tags,
      wordCount: 0,
      click: maps[idx]?.[0] ?? 0,
      like: maps[idx]?.[1] ?? 0,
      dislike: maps[idx]?.[2] ?? 0,
    }))
    return c.json({
      status: 'ok',
      success: true,
      data: res
    })
  })


  app.get('/api/blog/:id', async (c)=> {
    const {id} = c.req.param()
    // currently it's
    const res = await getDocumentById(id)
    if(!res) {
      return c.json({
        status: '404 NotFound',
        success: false,
        data: null
      })
    }
    const proMeta = kv.get<number[]>(kvKey.postMeta(res.id))
    let content = await kv.get<string>(kvKey.postContent(res.id))
    // join a table
    // viewCount, reactions
    // getCommentsById,WithPages
    if(!content) {
      const resp = await fetch(`${Constants().RESOURCE_URL}/${res.relativePath}`)
      if(resp.status >= 300) {
        return c.json({
          status: "source content NotFound",
          success: false,
          data: null
        })
      }
      content = await resp.text()
      await kv.set(kvKey.postContent(res.id), content)
    }
    let meta = await proMeta
    if(!meta) {
      meta = [0,0,0,0]
    }
    meta[0] = meta[0]+1
    await kv.set(kvKey.postMeta(res.id), meta)
    const [click, like, dislike, ] = meta
    return c.json({
      status: "ok",
      success: true,
      data: {
        id: res.id,
        title: res.title,
        excerpt: res.excerpt ?? "",
        path: res.relativePath,
        createdAt: res.createdAt,
        wordCount: 0,
        lastModifiedAt: res.lastModifiedAt,
        parentId: res.parentId,
        tags: res.tags ?? [],
        content,
        click,
        like,
        dislike,
      }
    })
  })

}