import {Env, Hono} from "hono";

import {parseIntOrDefault,R} from "../_utils";
import { zValidator } from '@hono/zod-validator'
import {getDB} from "@/app/api/[[...route]]/_middleware/db";
import {commentInsertVOSchema} from "@/interfaces";
import {z} from "zod";

const clerkUserInfoSchema = z.object({
  imageUrl: z.string().url(),
  email: z.string().email(),
  name: z.string()
})

declare module 'hono' {
  interface ContextVariableMap {
    userId: string|undefined
    userInfo: z.infer<typeof clerkUserInfoSchema>
  }
}

const app = new Hono()


app.get('/api/document/:id/comment', async (c) => {
  const {id} = c.req.param()
  const {  page, size } = c.req.query()
  let pageParam = parseIntOrDefault(page,1)
  let sizeParam = parseIntOrDefault(size,100)
  return R.success(c,await getDB(c).queryCommentByDocId(id, pageParam, sizeParam))
})

app.put('/api/document/:id/comment',
  zValidator('json', commentInsertVOSchema),
  async (c) => {
    const insertVO = c.req.valid('json')
    let userId = c.get('userId')
    let userInfo = c.get('userInfo')
    if(!userId || !userInfo) {
      return R.unauthorizedError(c,"cannot get userId or userInfo")
    }
    const res = await getDB(c).insertComment({
      ...insertVO,
      userInfo: userInfo,
      authorId: userId
    })
    return R.success(c,res)
  })

// history version
app.get('/api/comment/:id/history', async (c) => {
  const {id} = c.req.param()
  const res = await getDB(c).queryHistoryByCommentId(id)
  return R.success(c, res)
})

export { app as commentRoute }