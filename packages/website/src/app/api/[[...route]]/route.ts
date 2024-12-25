import { Hono } from 'hono'
import {handle} from 'hono/vercel'
import { cors } from 'hono/cors'
import {DBMiddleware, customClerkMiddleware, QueueMiddleware} from "@/app/api/[[...route]]/_middleware";
import { clerkMiddleware } from "@hono/clerk-auth";

import {
  reactionRoute,
  commentRoute,
  activityRoute,
  interactionRoute,
  contentRoute, commentQueueHandlerRoute
} from "@/app/api/[[...route]]/_routes";
import {revalidateRoute} from "@/app/api/[[...route]]/_routes/revalidate-cache";
import {every, except} from 'hono/combine'
import { GeoMiddleware } from "hono-geo-middleware";
import {logger} from "@/lib/logger";
import {BizError} from "@/app/api/[[...route]]/_error";
import {ZodError} from "zod";
const privilegedMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

export const runtime = 'nodejs';

const app = new Hono()

app
// .use('*',cors({origin:'*'}))
.use(DBMiddleware())
.use(GeoMiddleware())
.use(QueueMiddleware())
.on(privilegedMethods, '/*', async (c, next) => {
  const middleware = except([
    '/api/isr/*',
    '/api/queue/*',
    '/api/fragment',
    ],
    every(
      clerkMiddleware({
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        secretKey: process.env.CLERK_SECRET_KEY,
      }),
      customClerkMiddleware()
    )
  )
  return middleware(c, next)
})


app.onError((err, c) => {
  logger.error(err)
  if(err instanceof BizError) {
    return c.json({error: err.message}, err.code as any)
  }
  if(err instanceof ZodError) {
    return c.json({error: 'schema validate failed'}, 400)
  }
  return c.json({error: "Unknown Error"}, 500)
})

app.route('/', contentRoute)
app.route('/', commentRoute)
app.route('/', reactionRoute)
app.route('/', activityRoute)
app.route('/', revalidateRoute)
app.route('/', interactionRoute)
app.route('/', commentQueueHandlerRoute)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)