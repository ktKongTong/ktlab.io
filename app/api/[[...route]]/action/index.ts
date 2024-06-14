import {Hono} from "hono";
import {APIResponse} from "../response";
import {kvKey} from "@/app/api/[[...route]]/remote";
import kv from "@/lib/kv";


export default function actions(app:Hono) {
  app.get('/api/document/:id/reactions',
    async (c)=> {
    const {id}= c.req.param()
    const  value = await kv.get(kvKey.postReaction(id))
    return APIResponse.success(c,value)
  })

  app.patch('/api/document/:id/reactions',
    async (c)=> {
    const {id}= c.req.param()
    const {type}= c.req.query()
    let current = await kv.get<Record<string, number>>(kvKey.postReaction(id))
    if(!current) {
      current = {}
    }
    if(!current[type]) {
      current[type] = 0
    }
    let res = {
      ...current
    }
    res[type] = current[type] + 1
    const  value = await kv.set(kvKey.postReaction(id),res)
    return APIResponse.success(c,res)
  })
}