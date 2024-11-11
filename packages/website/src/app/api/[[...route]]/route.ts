import { Hono } from 'hono'
import {handle} from 'hono/vercel'
import { cors } from 'hono/cors'
import {DBMiddleware, customClerkMiddleware} from "@/app/api/[[...route]]/_middleware";
import { clerkMiddleware } from "@hono/clerk-auth";

import {reactionRoute,commentRoute, activityRoute, interactionRoute} from "@/app/api/[[...route]]/_routes";
import {revalidateRoute} from "@/app/api/[[...route]]/_routes/revalidate-cache";
import {every, except} from 'hono/combine'
import { GeoMiddleware } from "hono-geo-middleware";
const privilegedMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

export const runtime = 'nodejs';

const app = new Hono()

app
.use('*',cors({origin:'*'}))
.use(DBMiddleware())
.use(GeoMiddleware())
.on(privilegedMethods, '/*', async (c, next) => {
  const middleware = except('/api/isr/*',
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


app.route('/', commentRoute)
app.route('/', reactionRoute)
app.route('/', activityRoute)
app.route('/', revalidateRoute)
app.route('/', interactionRoute)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)