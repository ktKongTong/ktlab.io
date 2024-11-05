import type {Context, MiddlewareHandler} from "hono";
import {IDBProvider} from "@/lib/db/db";
import {slcDB} from "@/lib/db";

declare module 'hono' {
  interface ContextVariableMap {
    db: IDBProvider
  }
}
export const getDB = (c:Context):IDBProvider => {
  return c.get('db')
}

export const DBMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    c.set('db', slcDB)
    await next()
  }
}
