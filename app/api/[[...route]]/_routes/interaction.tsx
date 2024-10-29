import {Hono} from "hono";
import kv from "@/lib/kv";
import {kvKey, R} from "@/app/api/[[...route]]/_utils";
import {getGEO} from "@/app/api/[[...route]]/_middleware";

const interactionRoute = new Hono();

interactionRoute.get('/api/document/:id/interaction-data',
async (c)=> {
  const {id}= c.req.param()
  const  [reactions, view, lastVisitor] = await kv.mget<[Record<string, number>, number, string]>(kvKey.postReaction(id),kvKey.postView(id),kvKey.postLastVisitor(id))
  return R.success(c,{
    view: view ?? 0,
    lastVisitor: lastVisitor?? 'unknown',
    click: view ?? 0,
    reactions: reactions ?? {'like': 0,'dislike': 0, 'shit': 0, 'wow': 0 }
  })
})

interactionRoute.get('/api/document/:id/interaction/report',
async (c)=> {
  const {id}= c.req.param()
  const geo = getGEO(c)
  kv.incr(kvKey.postView(id))
  kv.set(kvKey.postLastVisitor(id), geo.city)
  return R.success(c,{})
})

export {interactionRoute}
