import {Env, Hono} from "hono";

import {parseIntOrDefault} from "../utils";
import {APIResponse} from "../response";
import { zValidator } from '@hono/zod-validator'
import {getDB} from "../middleware/db";
import {commentInsertVOSchema} from "@/interfaces/vo";
import {z} from "zod";

const userInfoSchema = z.object({
  imageUrl: z.string().url(),
  email: z.string().email(),
  name: z.string()
})

declare module 'hono' {
  interface ContextVariableMap {
    userId: string|undefined
    userInfo: z.infer<typeof userInfoSchema>
  }
}

export default function comment<T extends Env>(app:Hono<T>) {

  app.get('/api/document/:id/comment', async (c) => {
    const {id} = c.req.param()
    const {  page, size } = c.req.query()
    let pageParam = parseIntOrDefault(page,1)
    let sizeParam = parseIntOrDefault(page,100)
    return APIResponse.success(c,await getDB(c).queryCommentByDocId(id, pageParam, sizeParam))
  })
  app.put('/api/document/:id/comment',
    zValidator('json', commentInsertVOSchema),
    async (c) => {
      const insertVO = c.req.valid('json')
      let userId = c.get('userId')
      let userInfo = c.get('userInfo')
      if(!userId || !userInfo) {
        return APIResponse.unauthorizedError(c,"cannot get userId or userInfo")
      }
      const res = await getDB(c).insertComment({
          ...insertVO,
          userInfo: userInfo,
          authorId: userId
      })
      return APIResponse.success(c,res)
  })

// history version
  app.get('/api/comment/:id/history', async (c) => {
    const {id} = c.req.param()
    const res = await getDB(c).queryHistoryByCommentId(id)
    return APIResponse.success(c, res)
  })
  return app
}