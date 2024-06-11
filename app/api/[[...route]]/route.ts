import {Hono} from 'hono'
import {handle} from 'hono/vercel'
import {allPosts,allKnowledgebases} from "contentlayer/generated";
import activities from "@/mock/activity";
import {convertCatalogToTree} from "@/app/api/[[...route]]/utils";

export const runtime = 'edge';

const app = new Hono().basePath('/api')


app.get('/knowledgebase/catalog', async (c)=> {
  const res = allKnowledgebases.map(it=> ({
    id: it.pathId,
    title: it.title,
    href: it.url,
    description: it.description,
    tags: it.tags,
    level: 1,
    pathId: it.pathId,
    parentId: it.parentPathId,
  }))
  const tree = convertCatalogToTree(res)
  return c.json({
    status: 'ok',
    success: true,
    data: tree
  })
})

app.get('/knowledge-base/*', async (c)=> {
  let path = c.req.path.split('/knowledge-base')?.[1]
  if(!path?.endsWith('/')) {
    path = path + '/'
  }
  const post = allKnowledgebases.find(it=> it.pathId === path || it.pathId === path + 'index/')
  if(!post) {
    return c.json({
      status: '404 NotFound',
      success: false,
      data: null
    })
  }
  return c.json({
    status: 'ok',
    success: true,
    data: post
  })
})

app.get('/blog', async (c)=> {
  const {topic} = c.req.query()
  let posts = allPosts
  if(topic) {
    posts = allPosts.filter(it=>it.tags.includes(topic))
  }
  const res = posts.map(it=> ({
    id: it.id,
    title: it.title,
    link: it.url,
    description: it.description,
    tags: it.tags,
    hit: 100,
    like: 0,
    dislike: 0,
    comments: 0,
  }))
  return c.json({
    status: 'ok',
    success: true,
    data: res
  })
})


app.get('/blog/:id', async (c)=> {
  const {id} = c.req.param()
  // currently it's
  const post = allPosts.find(it=> it.id === id)
  if(!post) {
    return c.json({
      status: '404 NotFound',
      success: false,
      data: null
    })
  }
  return c.json({
    status: 'ok',
    success: true,
    data: post
  })
})


app.get('/activity', async (c)=> {
  return c.json({
    status: 'ok',
    success: true,
    data: activities
  })
})

export const GET = handle(app)
export const POST = handle(app)