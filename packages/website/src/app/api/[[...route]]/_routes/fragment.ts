import {Hono} from "hono";
import {getDB} from "@/app/api/[[...route]]/_middleware";
import {parseIntOrDefault} from "@/app/api/[[...route]]/_utils";
import kv, {kvKey} from "@/lib/kv";
import { bearerAuth } from 'hono/bearer-auth'
import {zodContentDBOToVO} from "@repo/shared";
import {defaultReaction} from "@/config/reaction";

const app = new Hono()
app.get('/api/fragment', async (c)=> {
  const p = c.req.query('page') ?? ''
  const ps = c.req.query('pagesize') ?? ''
  const page = parseIntOrDefault(p, 1)
  const pageSize = parseIntOrDefault(ps, 20)
  const contents = await getDB(c).queryContent(page, pageSize)
  const contendsId = contents.data.map(it => it.id)
  const reactionKeys = contendsId.map(it => kvKey.postReaction(it))
  if(contents.data.length > 0) {
    const values = await kv.mget(reactionKeys)
    const res = zodContentDBOToVO.parse(contents.data)
      .map((it, idx) => ({...it, reactions: values[idx] ?? defaultReaction}))
    return c.json({
      ...contents,
      data: res,
    })
  }
  return c.json({
    ...contents,
  })
})

const token = process.env.SITE_ADMIN_TOKEN ?? 're_121314';
// add post content from other site
app.post('/api/fragment',
  bearerAuth({ token }),
  async (c)=> {
  const body =await c.req.json()
  const content = body.content as string
  const res = await getDB(c).insertContent({ content})
  return c.json(res)
})

export { app as contentRoute}
