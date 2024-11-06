import {Hono} from "hono";
import {R} from "@/app/api/[[...route]]/_utils";
import {revalidatePath, revalidateTag} from "next/cache";
import {zValidator} from "@hono/zod-validator";
import {revalidateCacheDTO} from "@repo/shared";
import { bearerAuth } from 'hono/bearer-auth'

const app = new Hono();

// regenerate
const token = process.env.ADMIN_TOKEN ?? 're_121314';
app.use('*', bearerAuth({ token }))

app.put('/api/isr/revalidate',
  zValidator('json', revalidateCacheDTO),
  async (c)=> {
  const {paths, tags} = c.req.valid('json')
  paths.map(it=>revalidatePath(it))
  tags.map(it => revalidateTag(it))
  return R.success(c)
})

export { app as revalidateRoute }