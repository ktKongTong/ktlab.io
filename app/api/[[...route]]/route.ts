import { Hono } from 'hono'
import {handle} from 'hono/vercel'
import { cors } from 'hono/cors'
import {DBMiddleware,customClerkMiddleware} from "@/app/api/[[...route]]/_middleware";
import { clerkMiddleware } from "@hono/clerk-auth";

import {reactionRoute,commentRoute, activityRoute} from "@/app/api/[[...route]]/_routes";

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

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)