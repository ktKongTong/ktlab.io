import { Hono } from 'hono'
import {handle} from 'hono/vercel'
import { cors } from 'hono/cors'
import {DBMiddleware,customClerkMiddleware} from "@/app/api/[[...route]]/_middleware";
import {clerkMiddleware, getAuth} from "@hono/clerk-auth";

import {reactionRoute,commentRoute, contentRoute, activityRoute} from "@/app/api/[[...route]]/_routes";

const privilegedMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

export const runtime = 'nodejs';

const app = new Hono()

app
.use('*',cors({origin:'*'}))
.use(DBMiddleware())
.on(privilegedMethods, '/*', clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}))
.on(privilegedMethods, '/*', customClerkMiddleware())


app.route('/', commentRoute)
app.route('/', reactionRoute)
app.route('/', activityRoute)
app.route('/', contentRoute)

app.get('/api', (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) {
    return c.json({
      message: 'You are not logged in.'
    })
  }
  return c.json({
    message: 'You are logged in!',
    userId: auth.userId
  })
})

import activities from "@/mock/activity";
app.get('/api/activity', async (c)=> {
  return c.json({
    status: 'ok',
    success: true,
    data: activities
  })
})

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)