import {Hono, Schema,Env as HEnv} from 'hono'
import {handle} from 'hono/vercel'
import activities from "@/mock/activity";
import {Remote} from "@/app/api/[[...route]]/remote";
import {clerkMiddleware, getAuth} from "@hono/clerk-auth";
import actions from "@/app/api/[[...route]]/action";
import comment from "@/app/api/[[...route]]/comment";
import {DBMiddleware} from "@/app/api/[[...route]]/middleware/db";
import { cors } from 'hono/cors'
import {customClerkMiddleware} from "@/app/api/[[...route]]/middleware/clerk";
import process from "process";
import {Activity} from "@/app/api/[[...route]]/rencent";
const privilegedMethods = ['POST', 'PUT', 'PATCH', 'DELETE']
export const runtime = 'nodejs';

// @ts-ignore
class App<E extends HEnv, S extends Schema = {}, BasePath extends string> extends Hono<E,S,BasePath> {

  apply(func: <T extends HEnv>(app: Hono<E,S,BasePath>) => void) {
    func(this)
    return this
  }

  constructor() {
    super()
    this
      .use('*',cors({origin:'*'}))
      .use(DBMiddleware())
      .on(privilegedMethods, '/*', clerkMiddleware({
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        secretKey: process.env.CLERK_SECRET_KEY,
      }))
      .on(privilegedMethods, '/*', customClerkMiddleware())
    this
      .apply(Remote)
      .apply(comment)
      .apply(actions)
      .apply(Activity)

    this.get('/api', (c) => {
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
  }
}

const app = new App()

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