import {Env, Hono} from "hono";

import {parseIntOrDefault} from "../_utils";
import {getDB} from "@/app/api/[[...route]]/_middleware/db";
import {commentInsertVOSchema, commentVOSchema, documents, zodCommentDBOToVO} from "@/interfaces";
import {z} from "zod";
import {UnauthorizedError} from "@/app/api/[[...route]]/_error";
import {zValidator} from "../_utils/validator-wrapper";
import {getQueue} from "@/app/api/[[...route]]/_middleware";
import {Constants} from "@/lib/constants";
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
  const { page, size } = c.req.query()
  let pageParam = parseIntOrDefault(page,1)
  let sizeParam = parseIntOrDefault(size,100)

  const pagedComments = await getDB(c).queryCommentByDocId(id, pageParam, sizeParam)

  return c.json({
    total: pagedComments.total,
    page: pagedComments.page,
    pageSize: pagedComments.pageSize,
    data: zodCommentDBOToVO.parse(pagedComments.data)
  })
})

app.put('/api/document/:id/comment',
  zValidator('json', commentInsertVOSchema),
  async (c) => {
    const insertVO = c.req.valid('json')
    let userId = c.get('userId')
    let userInfo = c.get('userInfo')
    if(!userId || !userInfo) {
      throw new UnauthorizedError("cannot get userId or userInfo")
    }
    const db = getDB(c)
    const res = await db.insertComment({
      ...insertVO,
      userInfo: userInfo,
      authorId: userId
    })
    if(res) {
      const queue = getQueue(c)
      if(queue) {
        await queue.publishJSON({
          url: `${Constants().BASE_URL}/api/queue/new-comment`,
          body: res
        })
      }
    }
    return c.json(res)
  })

// history version
app.get('/api/comment/:id/history', async (c) => {
  const {id} = c.req.param()
  const res = await getDB(c).queryHistoryByCommentId(id)
  return c.json(res)
})

export { app as commentRoute }