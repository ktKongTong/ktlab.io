import {Hono} from "hono";
import kv, {kvKey} from "@/lib/kv";
import {getGeo} from "hono-geo-middleware";


const app = new Hono();
app.get('/api/document/:id/interaction-data',
async (c)=> {
  const {id}= c.req.param()
  const  [reactions, view, lastVisitor] = await kv.mget<[Record<string, number>, number, string]>(kvKey.postReaction(id),kvKey.postView(id),kvKey.postLastVisitor(id))
  return c.json({
    view: view ?? 0,
    lastVisitor: lastVisitor?? 'unknown',
    click: view ?? 0,
    reactions: reactions ?? {'like': 0,'dislike': 0, 'shit': 0, 'wow': 0 }
  })
})

app.get('/api/document/:id/interaction/report',
async (c)=> {
  const {id}= c.req.param()
  const geo = getGeo(c)
  kv.incr(kvKey.postView(id))
  kv.set(kvKey.postLastVisitor(id), geo.city)
  return c.json({})
})

export { app as interactionRoute}
