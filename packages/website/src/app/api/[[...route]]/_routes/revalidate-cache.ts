import {Hono} from "hono";
import {revalidatePath, revalidateTag} from "next/cache";
import {zValidator} from "../_utils/validator-wrapper";
import {revalidateCacheDTO} from "@repo/shared";
import { bearerAuth } from 'hono/bearer-auth'

const app = new Hono();

// regenerate
const token = process.env.SITE_ADMIN_TOKEN ?? 're_121314';
app.use('/api/isr/revalidate', bearerAuth({ token }))

app.put('/api/isr/revalidate',
  zValidator('json', revalidateCacheDTO),
  async (c)=> {
  const {paths, tags} = c.req.valid('json')
  paths.map(it=>revalidatePath(it))
  tags.map(it => revalidateTag(it))
  return c.json({})
})

export { app as revalidateRoute }